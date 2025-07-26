from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

model_name = "humarin/chatgpt_paraphraser_on_T5_base"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)


def rephrase_text(text: str, tone: str = "general") -> str:
    prompt = f"paraphrase in a {tone} tone: {text} </s>" if tone != "general" else f"paraphrase: {text} </s>"
    inputs = tokenizer([prompt], return_tensors="pt", padding=True, truncation=True).to(device)
    outputs = model.generate(**inputs, num_beams=4, max_length=256)
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return result