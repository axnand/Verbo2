

from pydantic import BaseModel
from typing import List, Optional
from pydantic import Field
from typing import Literal


class DetectInput(BaseModel):
    text: str

class SentenceAnalysis(BaseModel):
    sentence: str
    ai_likelihood: float

class DetectResponse(BaseModel):
    overall_ai_score: float  
    flagged_sentences: List[SentenceAnalysis]



class RephraseInput(BaseModel):
    text: str
    tone: Literal["general", "formal", "casual", "academic", "creative"]

class RephraseResponse(BaseModel):
    original_text: str
    rephrased_text: str
    tone_used: str

class GrammarInput(BaseModel):
    text: str

class GrammarResponse(BaseModel):
    corrected_text: str
