# app/models/schemas.py

from pydantic import BaseModel
from typing import List, Optional
from pydantic import Field
from typing import Literal
# ---------- Detection Models ----------

class DetectInput(BaseModel):
    text: str

class SentenceAnalysis(BaseModel):
    sentence: str
    ai_likelihood: float  # e.g., 0.0 to 1.0

class DetectResponse(BaseModel):
    overall_ai_score: float  # average across all sentences
    flagged_sentences: List[SentenceAnalysis]

# ---------- Rephrase Models ----------

class RephraseInput(BaseModel):
    text: str
    tone: Literal["general", "formal", "casual", "academic", "creative"]

class RephraseResponse(BaseModel):
    original_text: str
    rephrased_text: str
    tone_used: str
