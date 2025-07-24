from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

model_name = "Ateeqq/Text-Rewriter-Paraphraser"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)

def rephrase_text(text: str, tone: str = "neutral") -> str:
    # Note: The model itself doesn't support tones, so we just rephrase plainly.
    prompt = f"paraphraser: {text}"

    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to(device)
    outputs = model.generate(
        **inputs,
        num_beams=4,
        max_length=512,
        early_stopping=True
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)