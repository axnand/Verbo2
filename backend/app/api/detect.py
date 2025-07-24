
from fastapi import APIRouter
from app.models.schemas import DetectInput, DetectResponse
from app.services.ai_detector import detect_ai_text

router = APIRouter()

@router.post("/detect", response_model=DetectResponse)
async def detect_ai(input_data: DetectInput):
    """
    Detect AI-generated content in the input text.
    Returns overall likelihood and flagged sentences.
    """
    print(f"Input received: {input_data.text}")
    return detect_ai_text(input_data.text)
