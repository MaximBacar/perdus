from PIL import Image
from io import BytesIO
from datetime import datetime, timezone

from pydantic import BaseModel, Field

from src.core.services import get_db, get_gemini, get_embedder, get_bucket


class ItemDescription(BaseModel):
    title: str = Field(description="Short summary of the object, e.g. 'Blue Leather Wallet'")
    description: str = Field(description="Detailed description including color, shape, size, brand if visible, condition, and any distinguishing features")


async def add_item(image_bytes: bytes, item_id: str):
    bucket = get_bucket()
    db = get_db()
    gemini = get_gemini()
    embedder = get_embedder()

    blob = bucket.blob(f"items/{item_id}.jpg")
    blob.upload_from_string(image_bytes, content_type="image/jpeg")
    blob.make_public()
    image_url = blob.public_url

    # Generate description with Gemini
    image = Image.open(BytesIO(image_bytes))
    response = gemini.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            "Describe this object in detail. Include its color, shape, size, brand if visible, condition, and any distinguishing features.",
            image
        ],
        config={
            "response_mime_type": "application/json",
            "response_json_schema": ItemDescription.model_json_schema(),
        },
    )

    result = ItemDescription.model_validate_json(response.text)
    title = result.title
    description = result.description

    # Generate embedding
    embedding = embedder.encode(description).tolist()

    # Store in Firestore
    db.collection("items").document(item_id).set({
        "embedding": embedding,
        "title": title,
        "description": description,
        "date_added": datetime.now(timezone.utc),
        "status": "lost",
        "image_url": image_url
    })
