
from fastapi import APIRouter
from app.models.schemas import RephraseInput, RephraseResponse
from app.services.rephraser import rephrase_text

router = APIRouter()

@router.post("/rephrase", response_model=RephraseResponse)
async def rephrase(input_data: RephraseInput):
    """
    Rephrase the given text in the desired tone.
    """
    rephrased_output = rephrase_text(input_data.text, input_data.tone)
    return {
        "original_text": input_data.text,
        "rephrased_text": rephrased_output,
        "tone_used": input_data.tone
    }

