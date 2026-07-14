from langchain_community.chat_models import ChatOllama
from config.settings import settings

def get_chat_ollama(model_name: str = None):
    """
    Returns an instance of ChatOllama with configured parameters.
    """
    if model_name is None:
        model_name = settings.OLLAMA_MODEL

    return ChatOllama(
        model=model_name,
        base_url=settings.OLLAMA_BASE_URL,
        temperature=0,
    )
