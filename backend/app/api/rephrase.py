from fastapi import APIRouter
from app.models.schemas import RephraseInput, RephraseResponse
from app.services.rephraser import rephrase_text
from app.services.drift import slight_semantic_drift

router = APIRouter()

@router.post("/rephrase", response_model=RephraseResponse)
async def rephrase(input_data: RephraseInput):
    raw_rephrased = rephrase_text(input_data.text, input_data.tone)
    final_output = slight_semantic_drift(raw_rephrased)
    return {
        "original_text": input_data.text,
        "rephrased_text": final_output,
        "tone_used": input_data.tone
    }