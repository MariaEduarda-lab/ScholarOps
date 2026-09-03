from fastapi import APIRouter, HTTPException, status

from app.api.dependencies import DatabaseSession, InstitutionId
from app.core.config import get_settings
from app.models import Institution
from app.schemas import InstitutionRead, SessionRead

router = APIRouter(prefix="/session", tags=["session"])


@router.get("", response_model=SessionRead)
def current_session(db: DatabaseSession, institution_id: InstitutionId) -> SessionRead:
    institution = db.get(Institution, institution_id)
    if institution is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instituição não encontrada.")
    settings = get_settings()
    return SessionRead(
        user_id=settings.demo_user_id,
        user_name="Marina Souza",
        role="Assistente social",
        institution=InstitutionRead.model_validate(institution),
    )


@router.get("/process")
def current_process(db: DatabaseSession, institution_id: InstitutionId) -> dict[str, object]:
    institution = db.get(Institution, institution_id)
    if institution is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instituição não encontrada.")
    return {
        "institution": InstitutionRead.model_validate(institution),
        "milestones": [
            {"date": "2026-05-12", "title": "Abertura das inscrições", "state": "done"},
            {"date": "2026-05-31", "title": "Encerramento das inscrições", "state": "done"},
            {"date": "2026-06-10", "title": "Triagem documental", "state": "current"},
            {"date": "2026-06-24", "title": "Entrevistas sociais", "state": "next"},
            {"date": "2026-07-08", "title": "Resultado final", "state": "next"},
        ],
    }
