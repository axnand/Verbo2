from fastapi import APIRouter
from app.services.grammar import correct_grammar
from app.models.schemas import GrammarInput, GrammarResponse

router = APIRouter()

@router.post("/grammar", response_model=GrammarResponse)
async def grammar_check(input: GrammarInput):
    result = correct_grammar(input.text)
    return GrammarResponse(corrected_text=result)