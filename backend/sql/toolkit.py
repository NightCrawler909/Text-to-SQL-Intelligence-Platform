import urllib.parse
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_community.utilities import SQLDatabase
from llm.agent import get_chat_ollama

def create_db_connection(db_config: dict) -> SQLDatabase:
    """
    Creates and returns a SQLDatabase connection using LangChain.
    """
    db_type = db_config.get('TYPE', 'mysql').lower()
    
    if db_type == 'duckdb':
        # duckdb path can be memory or file
        path = db_config.get('DATABASE', ':memory:')
        connection_string = f"duckdb:///{path}"
        return SQLDatabase.from_uri(connection_string)
        
    password = urllib.parse.quote_plus(db_config.get('PASSWORD', ''))
    
    if db_type == 'postgresql':
        connection_string = f"postgresql://{db_config.get('USER')}:{password}@{db_config.get('HOST')}:{db_config.get('PORT')}/{db_config.get('DATABASE')}"
    elif db_type == 'snowflake':
        # Snowflake generally uses snowflake://<user>:<password>@<account>/<database>/<schema>?warehouse=<warehouse>&role=<role>
        # To keep it simple, we construct a basic one or expect user to pass account in HOST
        connection_string = f"snowflake://{db_config.get('USER')}:{password}@{db_config.get('HOST')}/{db_config.get('DATABASE')}/PUBLIC"
    else:
        # Default to mysql
        connection_string = f"mysql+pymysql://{db_config.get('USER')}:{password}@{db_config.get('HOST')}:{db_config.get('PORT')}/{db_config.get('DATABASE')}"
        
    return SQLDatabase.from_uri(connection_string, engine_args={"pool_pre_ping": True})

def get_sql_toolkit(db_config: dict) -> SQLDatabaseToolkit:
    """
    Instantiates a SQLDatabaseToolkit object with the provided database connection.
    """
    db = create_db_connection(db_config)
    llm_tool = get_chat_ollama()
    toolkit = SQLDatabaseToolkit(db=db, llm=llm_tool)
    return toolkit
