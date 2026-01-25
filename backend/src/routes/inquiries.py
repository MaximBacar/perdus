from typing import Optional
from pydantic import BaseModel

from fastapi import APIRouter, BackgroundTasks, UploadFile, Form, Depends, HTTPException, Query

from src.core.auth import get_current_uid
from src.core.services import get_db
from src.services.inquiries import create_inquiry, match_inquiry, rate_matches

router = APIRouter(prefix="/inquiries", tags=["inquiries"])


@router.get("")
async def list_inquiries(limit: int = Query(default=5, le=50)):
    db = get_db()
    docs = (
        db.collection_group("inquiries")
        .order_by("created_at", direction="DESCENDING")
        .limit(limit)
        .stream()
    )

    inquiries = []
    for doc in docs:
        data = doc.to_dict()
        inquiries.append({
            "id": doc.id,
            "description": data.get("description"),
            "status": data.get("status", "processing"),
            "created_at": data.get("created_at").isoformat() if data.get("created_at") else None,
        })

    return {"inquiries": inquiries}


@router.post("")
async def post_inquiry(
    background_tasks: BackgroundTasks,
    uid: str = Depends(get_current_uid),
    description: str = Form(...),
    image: Optional[UploadFile] = None
):
    inquiry_id = create_inquiry(uid)

    image_bytes = None
    if image:
        image_bytes = await image.read()

    background_tasks.add_task(match_inquiry, uid, inquiry_id, description, image_bytes)

    return {"inquiry_id": inquiry_id}


@router.get("/{inquiry_id}")
async def get_inquiry(
    inquiry_id: str,
    uid: str = Depends(get_current_uid),
):
    db = get_db()
    doc = db.collection("users").document(uid).collection("inquiries").document(inquiry_id).get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    data = doc.to_dict()
    matched_items = data.get("matched_items")

    if matched_items is None:
        return {"status": "processing", "inquiry_id": inquiry_id}

    return {
        "status": "matched",
        "inquiry_id": inquiry_id,
        "matched_items": matched_items[:5],
        "narrowing_questions": data.get("narrowing_questions", []),
    }


class AnswerItem(BaseModel):
    question: str
    answer: str

class AnswersBody(BaseModel):
    answers: list[AnswerItem]


@router.post("/{inquiry_id}/answers")
async def post_answers(
    inquiry_id: str,
    body: AnswersBody,
    uid: str = Depends(get_current_uid),
):
    db = get_db()
    doc = db.collection("users").document(uid).collection("inquiries").document(inquiry_id).get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    data = doc.to_dict()
    top_items = data.get("top_items")

    if not top_items:
        raise HTTPException(status_code=400, detail="No matched items yet")

    ratings = rate_matches(
        item_descriptions=top_items,
        user_answers=[a.model_dump() for a in body.answers],
    )

    db.collection("users").document(uid).collection("inquiries").document(inquiry_id).set({
        "answers": [a.model_dump() for a in body.answers],
        "ratings": ratings,
    }, merge=True)

    return {"ratings": ratings}
