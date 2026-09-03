from fastapi import APIRouter
from sqlalchemy import func, select

from app.api.dependencies import DatabaseSession, InstitutionId
from app.models import Candidate
from app.schemas import MetricsRead

router = APIRouter(prefix="/metrics", tags=["metrics"])


@router.get("", response_model=MetricsRead)
def get_metrics(db: DatabaseSession, institution_id: InstitutionId) -> MetricsRead:
    rows = db.execute(
        select(Candidate.status, func.count(Candidate.id))
        .where(Candidate.institution_id == institution_id)
        .group_by(Candidate.status)
    ).all()
    counts = {status: count for status, count in rows}
    return MetricsRead(
        total=sum(counts.values()),
        awaiting=counts.get("Aguardando análise", 0),
        pending=counts.get("Documentação pendente", 0),
        review=counts.get("Em revisão", 0),
        ready=counts.get("Apto para entrevista", 0),
        approved=counts.get("Aprovado", 0),
        rejected=counts.get("Reprovado", 0),
    )
