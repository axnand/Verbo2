from transformers import pipeline

grammar_corrector = pipeline("text2text-generation", model="pszemraj/flan-t5-large-grammar-synthesis")

def correct_grammar(text: str) -> str:
    result = grammar_corrector("grammar: " + text, max_length=256, do_sample=False)
    return result[0]["generated_text"]