import json
from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str
    firebase_creds: str
    firebase_storage_bucket: str

    @property
    def firebase_creds_dict(self) -> dict:
        return json.loads(self.firebase_creds)

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
