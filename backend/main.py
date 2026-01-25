from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.services import init_services
from src.routes import items, inquiries, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_services()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173", "https://app.perdus.tech", "https://perdus.tech", "https://www.perdus.tech"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(inquiries.router)
app.include_router(users.router)