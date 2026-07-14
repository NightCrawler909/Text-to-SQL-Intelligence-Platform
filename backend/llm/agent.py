from langchain_google_genai import ChatGoogleGenerativeAI
from config.settings import settings

def get_chat_gemini(api_key: str = None, model_name: str = None):
    """
    Returns an instance of ChatGoogleGenerativeAI with configured parameters.
    """
    if model_name is None:
        model_name = settings.GEMINI_MODEL
        
    if api_key is None:
        api_key = settings.GEMINI_API_KEY

    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        temperature=0,
    )
