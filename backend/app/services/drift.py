import random

def slight_semantic_drift(text: str) -> str:
    edits = [
        lambda t: t.replace("very", "extremely"),
        lambda t: t.replace("important", "crucial"),
        lambda t: t.replace(",", ", "),
        lambda t: t.replace("has become", "is now"),
        lambda t: t.replace("In today's", "Nowadays,"),
    ]
    for func in random.sample(edits, k=min(2, len(edits))):
        text = func(text)
    return text