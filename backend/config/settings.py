import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App Config
    APP_NAME: str = "Enterprise Text-to-SQL"
    DEBUG_MODE: bool = True
    
    # Gemini Config
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.1-flash")

    # OpenAI Config (Fallback)
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    LLM_MODEL_NAME: str = os.getenv("LLM_MODEL_NAME", "gpt-3.5-turbo")
    
    # DB Sandbox Config
    MAX_ROWS_LIMIT: int = 100
    QUERY_TIMEOUT_SECONDS: int = 10
    
    # Database Config (For Fallback/Mock usage)
    DB_USER: str = os.getenv("DB_USER", "root")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "password")
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = os.getenv("DB_PORT", "3306")
    DB_NAME: str = os.getenv("DB_NAME", "test_db")

    class Config:
        env_file = ".env"

settings = Settings()
