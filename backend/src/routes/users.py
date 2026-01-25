from fastapi import APIRouter, Depends, HTTPException
from firebase_admin import auth
from pydantic import BaseModel

from src.core.auth import get_current_uid

router = APIRouter(prefix="/users", tags=["users"])


def require_assistant(uid: str):
    """Verify the current user is an assistant."""
    user = auth.get_user(uid)
    claims = user.custom_claims or {}
    if claims.get("role") != "assistant":
        raise HTTPException(status_code=403, detail="Forbidden: assistant role required")


@router.get("")
async def list_users(uid: str = Depends(get_current_uid)):
    require_assistant(uid)

    users = []
    page = auth.list_users()

    for user in page.users:
        claims = user.custom_claims or {}
        users.append({
            "uid": user.uid,
            "email": user.email,
            "display_name": user.display_name,
            "photo_url": user.photo_url,
            "role": claims.get("role"),
        })

    return {"users": users}


class SetRoleBody(BaseModel):
    role: str | None


@router.post("/{user_id}/role")
async def set_user_role(
    user_id: str,
    body: SetRoleBody,
    uid: str = Depends(get_current_uid),
):
    require_assistant(uid)

    try:
        user = auth.get_user(user_id)
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")

    current_claims = user.custom_claims or {}

    if body.role:
        current_claims["role"] = body.role
    else:
        current_claims.pop("role", None)

    auth.set_custom_user_claims(user_id, current_claims if current_claims else None)

    return {"success": True, "role": body.role}
