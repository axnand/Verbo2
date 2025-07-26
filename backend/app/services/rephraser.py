from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import re
import random

model_name = "humarin/chatgpt_paraphraser_on_T5_base"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name).to(device)

def post_process_humanize(text: str) -> str:
    # Step 1: Remove generic AI prefixes
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
        if text.lower().startswith(start):
            text = text[len(start):].strip(" :.-\"\n")

    # Step 2: Light contractions and filler words
    replacements = {
        "do not": "don't",
        "cannot": "can't",
        "will not": "won't",
        "should not": "shouldn't",
        "has not": "hasn't",
        "have not": "haven't",
        "it is": "it's",
        "we are": "we're",
        "you are": "you're",
        "they are": "they're",
        "I am": "I'm",
        "There is": "There's",
        "That is": "That's",
        "because": "since",
    }

    for orig, repl in replacements.items():
        text = re.sub(rf"\b{orig}\b", repl, text, flags=re.IGNORECASE)

    # Step 3: Add human filler expressions in safe spots
    softeners = ["frankly", "actually", "honestly", "to be fair", "in fact", "well"]
    if random.random() < 0.5:
        sentences = re.split(r'(?<=[.!?]) +', text)
        if len(sentences) > 1:
            insert_idx = random.randint(0, len(sentences) - 2)
            sentences[insert_idx] += f", {random.choice(softeners)}"
            text = " ".join(sentences)

    return text.strip()

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
        max_length=1024,
        repetition_penalty=1.1,
        early_stopping=True
    )

    result = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Post-process to humanize
    result = post_process_humanize(result)
    return result