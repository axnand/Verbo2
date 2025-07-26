from transformers import pipeline

grammar_corrector = pipeline("text2text-generation", model="pszemraj/flan-t5-large-grammar-synthesis")

def correct_grammar(text: str) -> str:
    prompt = "grammar: " + text
    result = grammar_corrector(prompt, max_length=min(len(prompt.split()) + 50, 128), do_sample=False)
    return result[0]["generated_text"]  