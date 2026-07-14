import sqlglot

class SQLFirewall:
    def __init__(self):
        self.blocked_keywords = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", "TRUNCATE", "MERGE"]

    def is_safe_query(self, sql: str) -> bool:
        """
        Parses SQL AST and checks for dangerous operations.
        """
        upper_sql = sql.upper()
        for kw in self.blocked_keywords:
            if kw in upper_sql:
                return False
        
        # TODO: Add deeper AST validation using sqlglot
        return True

    def enforce_limits(self, sql: str, max_rows: int = 100) -> str:
        """
        Appends LIMIT clause to prevent massive data reads.
        """
        # Basic limit enforcement
        if "LIMIT" not in sql.upper():
            sql = f"{sql} LIMIT {max_rows}"
        return sql
