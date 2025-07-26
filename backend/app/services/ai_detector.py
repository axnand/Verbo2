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
    Returns overall_ai_score, flagged_sentences, and highlighted_html.
    """
    lines = clean_text(text)
    flagged_sentences = []
    total_ai_score = 0.0
    highlighted_html = ""

    for line in lines:
        try:
            result = detector(line)[0]
            label = result["label"]
            score = result["score"]

            sentence_html = line
            if label == "LABEL_1" or label.lower() == "fake":
                flagged_sentences.append({
                    "sentence": line,
                    "ai_likelihood": round(score, 2)
                })
                total_ai_score += score

                # Highlight based on score
                if score > 0.7:
                    sentence_html = f'<span class="bg-red-500/20 border-b-2 border-red-500 rounded px-1">{line}</span>'
                elif score > 0.4:
                    sentence_html = f'<span class="bg-yellow-500/20 border-b-2 border-yellow-500 rounded px-1">{line}</span>'
            else:
                total_ai_score += score  # optional: to keep normalization balanced

            highlighted_html += sentence_html + ". "

        except Exception as e:
            print(f"Error analyzing line: {line[:30]}... | Error: {e}")
            highlighted_html += line + ". "

    overall_ai_score = round(total_ai_score / len(lines), 2) if lines else 0.0

    return {
        "overall_ai_score": overall_ai_score,
        "flagged_sentences": flagged_sentences,
        "highlighted_html": highlighted_html.strip()
    }