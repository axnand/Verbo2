# app/services/ai_detector.py

from transformers import pipeline


detector = pipeline("text-classification", model="roberta-base-openai-detector")

def clean_text(text: str) -> list:
    """
    Splits the input text into clean sentences/lines.
    """
    lines = text.strip().split(".")
    return [line.strip() for line in lines if line.strip()]

def detect_ai_text(text: str) -> dict:
    """
    Detects AI-generated content in the input text.
    Returns overall_ai_score and flagged_sentences.
    """
    lines = clean_text(text)
    flagged_sentences = []
    total_ai_score = 0.0

    for line in lines:
        try:
            result = detector(line)[0]
            label = result["label"]
            score = result["score"]

            # Assume 'LABEL_1' or 'fake' indicates AI-generated
            if label == "LABEL_1" or label.lower() == "fake":
                flagged_sentences.append({
                    "sentence": line,
                    "ai_likelihood": round(score, 2)
                })
                total_ai_score += score
        except Exception as e:
            print(f"Error analyzing line: {line[:30]}... | Error: {e}")

    overall_ai_score = round(total_ai_score / len(lines), 2) if lines else 0.0

    return {
        "overall_ai_score": overall_ai_score,
        "flagged_sentences": flagged_sentences
    }
