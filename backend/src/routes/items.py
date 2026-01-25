import uuid

from fastapi import APIRouter, BackgroundTasks, UploadFile, Query

from src.core.services import get_db
from src.services.items import add_item as add_item_service

router = APIRouter(prefix="/items", tags=["items"])


@router.get("")
async def list_items(limit: int = Query(default=5, le=50)):
    db = get_db()
    docs = (
        db.collection("items")
        .order_by("date_added", direction="DESCENDING")
        .limit(limit)
        .stream()
    )

    items = []
    for doc in docs:
        data = doc.to_dict()
        items.append({
            "id": doc.id,
            "title": data.get("title"),
            "description": data.get("description"),
            "status": data.get("status"),
            "image_url": data.get("image_url"),
            "date_added": data.get("date_added").isoformat() if data.get("date_added") else None,
        })

    return {"items": items}


@router.post("")
async def add_item(image: UploadFile, background_tasks: BackgroundTasks):
    item_id = str(uuid.uuid4())
    image_bytes = await image.read()

    background_tasks.add_task(add_item_service, image_bytes, item_id)

    return {"item_id": item_id, "status": "processing"}
