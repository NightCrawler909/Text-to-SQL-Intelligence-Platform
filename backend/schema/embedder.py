from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document
from config.settings import settings
import chromadb

class SchemaEmbedder:
    def __init__(self, api_key: str = None):
        if api_key is None:
            api_key = settings.GEMINI_API_KEY
            
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=api_key
        )
        self.chroma_client = chromadb.Client()
        self.vector_store = Chroma(
            client=self.chroma_client,
            collection_name="schema_embeddings",
            embedding_function=self.embeddings
        )

    def embed_schema(self, tables_metadata: list):
        """
        Embeds table descriptions and columns into the vector DB.
        tables_metadata: list of dicts with 'table_name', 'columns', 'description'
        """
        docs = []
        for table in tables_metadata:
            content = f"Table: {table.get('table_name', '')}\nDescription: {table.get('description', '')}\nColumns: {table.get('columns', '')}"
            docs.append(Document(page_content=content, metadata={"table_name": table.get('table_name', '')}))
            
        if docs:
            self.vector_store.add_documents(docs)

    def get_top_k_tables(self, query: str, k: int = 5):
        """
        Retrieves top K relevant tables based on the user's natural language query.
        """
        try:
            results = self.vector_store.similarity_search(query, k=k)
            return [doc.metadata.get("table_name") for doc in results]
        except Exception:
            return []
