import language_tool_python

tool = language_tool_python.LanguageToolPublicAPI('en-US')

def correct_grammar(text: str) -> str:
    matches = tool.check(text)
    corrected_text = language_tool_python.utils.correct(text, matches)
    return corrected_text