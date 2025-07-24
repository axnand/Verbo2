from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.detector import detect_ai_lines

router = APIRouter()

class DetectionRequest(BaseModel):
    text: str

@router.post("/")
def detect_ai(request: DetectionRequest):
    return detect_ai_lines(request.text)
