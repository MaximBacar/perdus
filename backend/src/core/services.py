from dataclasses import dataclass

import firebase_admin
from google import genai
from firebase_admin import credentials, firestore, storage
from google.cloud.firestore import Client as FirestoreClient
from sentence_transformers import SentenceTransformer

from src.core.config import get_settings


@dataclass
class Services:
    firebase_app: firebase_admin.App
    db: FirestoreClient
    bucket: storage.bucket
    gemini: genai.Client
    embedder: SentenceTransformer


_services: Services | None = None


def init_services() -> Services:
   
    global _services

    if _services is not None:
        return _services

    settings = get_settings()

    # Firebase
    cred = credentials.Certificate(settings.firebase_creds_dict)
    firebase_app = firebase_admin.initialize_app(cred, {
        'storageBucket': settings.firebase_storage_bucket
    })
    db = firestore.client()
    bucket = storage.bucket()

    # Gemini

    gemini = genai.Client(api_key=settings.gemini_api_key)

    # vector Embedding
    embedder = SentenceTransformer("all-MiniLM-L6-v2")

    _services = Services(
        firebase_app=firebase_app,
        db=db,
        bucket=bucket,
        gemini=gemini,
        embedder=embedder,
    )

    return _services


def get_services() -> Services:
    if _services is None:
        raise RuntimeError("Services not initialized. Call init_services() first.")
    return _services


def get_db() -> FirestoreClient:
    return get_services().db


def get_gemini() -> genai.Client:
    return get_services().gemini


def get_embedder() -> SentenceTransformer:
    return get_services().embedder


def get_bucket():
    return get_services().bucket
