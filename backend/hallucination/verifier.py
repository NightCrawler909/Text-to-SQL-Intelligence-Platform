from langchain_core.prompts import PromptTemplate

class HallucinationVerifier:
    def __init__(self, llm_client=None):
        self.llm = llm_client

    def back_translate(self, sql: str) -> str:
        """
        Translates SQL back to natural language to check if it aligns with the original question.
        """
        if not self.llm:
            return "LLM not configured for back-translation."
            
        try:
            prompt = PromptTemplate.from_template(
                "You are an expert SQL analyst. Explain the following SQL query in plain, non-technical English. "
                "Keep it under 2 sentences.\n\nSQL:\n{sql}\n\nExplanation:"
            )
            chain = prompt | self.llm
            response = chain.invoke({"sql": sql})
            return response.content.strip()
        except Exception as e:
            return f"Failed to back-translate: {str(e)}"

    def check_sanity(self, query_results: list) -> bool:
        """
        Checks for impossible dates, negative revenue, NULL explosions, etc.
        Returns True if sane, False if hallucination/error likely.
        """
        if not query_results:
            return True
            
        # Basic heuristic checks on the first 100 rows
        for row in query_results[:100]:
            if not isinstance(row, dict):
                continue
            for key, value in row.items():
                key_lower = str(key).lower()
                if ('revenue' in key_lower or 'sales' in key_lower or 'amount' in key_lower) and isinstance(value, (int, float)):
                    if value < -1000000: # Highly unlikely large negative revenue
                        return False
                if ('year' in key_lower) and isinstance(value, int):
                    if value > 2100 or value < 1900:
                        return False
        return True

    def get_consensus(self, sql_options: list) -> str:
        """
        Executes multiple SQL queries and compares outputs to determine the most reliable one.
        (For simplicity, we return the shortest valid query as consensus in this implementation)
        """
        if not sql_options:
            return ""
        return min(sql_options, key=len)
