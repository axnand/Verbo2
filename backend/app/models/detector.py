from transformers import pipeline
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

classifier = pipeline("text-classification", model="roberta-base-openai-detector")

def detect_ai_lines(text):
    sentences = sent_tokenize(text)
    results = []
    ai_count = 0

    for i, sent in enumerate(sentences):
        output = classifier(sent)[0]
        label = output['label']
        score = output['score']
        if label == 'LABEL_1':  # Assuming LABEL_1 = AI-generated
            ai_count += 1
            results.append({'sentence': sent, 'ai': True, 'confidence': score})
        else:
            results.append({'sentence': sent, 'ai': False, 'confidence': score})

    percentage_ai = round((ai_count / len(sentences)) * 100, 2)
    return {'percentage_ai': percentage_ai, 'results': results}
