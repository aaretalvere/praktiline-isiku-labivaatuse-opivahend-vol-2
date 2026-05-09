import os
from dataclasses import dataclass

@dataclass
class Settings:
    app_name: str = os.getenv("APP_NAME", "Opivahend API")
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql://opivahend:secret@localhost:5432/opivahend",
    )
    modules_path: str = os.getenv("MODULES_PATH", "../../modules")

settings = Settings()
