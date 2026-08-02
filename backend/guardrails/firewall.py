import sqlglot
from sqlglot.expressions import Select
import re

class SQLFirewall:
    def __init__(self):
        self.blocked_keywords = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", "TRUNCATE", "MERGE"]

    def is_safe_query(self, sql: str) -> bool:
        """
        Parses SQL AST and checks for dangerous operations.
        """
        upper_sql = sql.upper()
        for kw in self.blocked_keywords:
            if re.search(rf"\b{kw}\b", upper_sql):
                return False
        
        # Deeper AST validation using sqlglot
        try:
            expressions = sqlglot.parse(sql)
            for expr in expressions:
                if not isinstance(expr, Select):
                    return False
        except Exception:
            # If we can't parse it, fail closed
            return False
            
        return True

    def enforce_limits(self, sql: str, max_rows: int = 100) -> str:
        """
        Appends LIMIT clause to prevent massive data reads using AST rewriting.
        """
        try:
            expression = sqlglot.parse_one(sql)
            if isinstance(expression, Select):
                if not expression.args.get("limit"):
                    expression = expression.limit(max_rows)
                return expression.sql(dialect="mysql")
        except Exception:
            pass
            
        # Basic fallback limit enforcement
        if "LIMIT" not in sql.upper():
            sql = f"{sql} LIMIT {max_rows}"
        return sql
