from fastapi import APIRouter, HTTPException, status
from sqlalchemy import text

from app.api.dependencies import DatabaseSession
from app.core.config import get_settings
from app.schemas import HealthRead

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthRead)
def health() -> HealthRead:
    settings = get_settings()
    return HealthRead(status="ok", service=settings.app_name, environment=settings.environment)


@router.get("/health/database", response_model=HealthRead)
def database_health(db: DatabaseSession) -> HealthRead:
    settings = get_settings()
    try:
        db.execute(text("SELECT 1"))
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Banco de dados indisponível.",
        ) from exc
    backend = "sqlite" if settings.database_url.startswith("sqlite") else "postgresql"
    return HealthRead(status="ok", service=settings.app_name, environment=settings.environment, database=backend)
