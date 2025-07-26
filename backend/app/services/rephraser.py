from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

model_name = "humarin/chatgpt_paraphraser_on_T5_base"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)

def rephrase_text(text: str, tone: str = "general") -> str:
    if tone == "general":
        prompt = f"paraphrase: {text} </s>"
    else:
        prompt = f"Rephrase in a {tone} tone without introductory phrases:\n{text} </s>"

    inputs = tokenizer([prompt], return_tensors="pt", padding=True, truncation=True).to(device)

    outputs = model.generate(
        **inputs,
        do_sample=True,
        top_k=50,
        top_p=0.92,
        temperature=0.8,
        max_length=256,
        repetition_penalty=1.1,
        early_stopping=True
    )

    result = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Strip common generic prefixes
    generic_starts = [
        "the following text is",
        "here is a",
        "this is the",
        "paraphrased version",
        "rephrased version",
        "reworded version",
        "rewritten version"
    ]
    for start in generic_starts:
        if result.lower().startswith(start):
            result = result[len(start):].strip(" :.-\"\n")
    
    return result