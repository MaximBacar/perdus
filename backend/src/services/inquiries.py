from typing import Optional
from datetime import datetime, timezone
import uuid
import json

import numpy as np
from PIL import Image
from io import BytesIO

from src.core.services import get_db, get_gemini, get_embedder


def create_inquiry(uid: str) -> str:
    db = get_db()
    inquiry_id = str(uuid.uuid4())

    db.collection("users").document(uid).collection("inquiries").document(inquiry_id).set({
        "created_at": datetime.now(timezone.utc)
    })

    return inquiry_id


def cosine_similarity(a: list[float], b: list[float]) -> float:
    a_np = np.array(a)
    b_np = np.array(b)
    return float(np.dot(a_np, b_np) / (np.linalg.norm(a_np) * np.linalg.norm(b_np)))


def get_description(image_bytes: bytes):
    gemini = get_gemini()
    image = Image.open(BytesIO(image_bytes))
    response = gemini.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            "Describe this object in detail. Include its color, shape, size, brand if visible, condition, and any distinguishing features.",
            image
        ]
    )
    return response.text



def generate_narrowing_questions(item_descriptions: list[str]) -> list[str]:
    gemini = get_gemini()

    numbered = "\n".join(f"{i+1}. {desc}" for i, desc in enumerate(item_descriptions))

    response = gemini.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            f"""You are helping someone find their lost item. Below are descriptions of {len(item_descriptions)} candidate items found in a lost-and-found database.

Generate 1 to 2 short questions that would best help the owner identify which item is theirs.
The questions must be open-ended so the owner can answer from memory (e.g. "What color is it?", "What was inside?").
Do NOT reveal any specific details from the descriptions in the questions.

Return ONLY a JSON array of question strings, no other text.

Descriptions:
{numbered}"""
        ]
    )

    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    return json.loads(text)


def rate_matches(
    item_descriptions: list[dict],
    user_answers: list[dict],
) -> list[dict]:
    gemini = get_gemini()

    qa_text = "\n".join(
        f"Q: {a['question']}\nA: {a['answer']}" for a in user_answers
    )

    items_text = "\n".join(
        f"- [id: {item['item_id']}] {item['description']}"
        for item in item_descriptions
    )

    response = gemini.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            f"""You are helping someone find their lost item. They answered the following questions:

{qa_text}

Below are descriptions of candidate items. Rate each item from 0 to 100 on how likely it matches the owner based on their answers. A score of 100 means a perfect match, 0 means no match at all.

Return ONLY a JSON array of objects with "item_id" (string) and "score" (integer), sorted by score descending. No other text.

Items:
{items_text}"""
        ]
    )

    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    return json.loads(text)


async def match_inquiry(
    uid: str,
    inquiry_id: str,
    description: str,
    image_bytes: Optional[bytes] = None
):
    db = get_db()
    
    embedder = get_embedder()

    combined_description = description

    if image_bytes:
        image_description = get_description(image_bytes)
        combined_description = f"{description} {image_description}"

    # Vectorize the combined description
    inquiry_embedding = embedder.encode(combined_description).tolist()

    # Get all items from Firestore
    items_ref = db.collection("items").stream()

    similarities = []
    for item_doc in items_ref:
        item_data = item_doc.to_dict()
        item_embedding = item_data.get("embedding")
        if item_embedding:
            similarity = cosine_similarity(inquiry_embedding, item_embedding)
            print(similarity)
            similarities.append((item_doc.id, similarity))

    # Sort by similarity descending
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Extract ordered item_ids
    matched_items = [item_id for item_id, _ in similarities]

    # Get top 5 items with their descriptions
    top_5_ids = matched_items[:5]
    top_items = []
    top_descriptions = []
    for item_id in top_5_ids:
        item_doc = db.collection("items").document(item_id).get()
        if item_doc.exists:
            desc = item_doc.to_dict().get("description", "")
            top_items.append({"item_id": item_id, "description": desc})
            top_descriptions.append(desc)

    # Generate narrowing questions from top item descriptions
    narrowing_questions = []
    if len(top_items) > 1:
        narrowing_questions = generate_narrowing_questions(top_descriptions)

    # Store in inquiry document
    db.collection("users").document(uid).collection("inquiries").document(inquiry_id).set({
        "description": description,
        "embedding": inquiry_embedding,
        "matched_items": matched_items,
        "top_items": top_items,
        "narrowing_questions": narrowing_questions,
    }, merge=True)

    return matched_items
