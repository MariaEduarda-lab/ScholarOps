from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import selectinload

from app.api.dependencies import DatabaseSession, InstitutionId
from app.api.presenters import present_candidate, present_candidate_item
from app.core.config import get_settings
from app.models import AnalysisRun, Candidate, ReviewDecision
from app.schemas import AnalysisRead, CandidateList, CandidatePatch, CandidateRead, DecisionCreate, DecisionRead
from app.services.analysis import run_analysis

router = APIRouter(prefix="/candidates", tags=["candidates"])


def find_candidate(db: DatabaseSession, institution_id: str, external_id: str) -> Candidate:
    statement = (
        select(Candidate)
        .where(Candidate.institution_id == institution_id, Candidate.external_id == external_id)
        .options(selectinload(Candidate.documents), selectinload(Candidate.institution))
    )
    candidate = db.scalar(statement)
    if candidate is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Candidatura não encontrada nesta instituição."
        )
    return candidate


@router.get("", response_model=CandidateList)
def list_candidates(
    db: DatabaseSession,
    institution_id: InstitutionId,
    search: str | None = None,
    candidate_status: str | None = Query(default=None, alias="status"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> CandidateList:
    filters = [Candidate.institution_id == institution_id]
    if search:
        term = f"%{search.strip()}%"
        filters.append(or_(Candidate.name.ilike(term), Candidate.external_id.ilike(term)))
    if candidate_status:
        filters.append(Candidate.status == candidate_status)
    total = db.scalar(select(func.count()).select_from(Candidate).where(*filters)) or 0
    statement = (
        select(Candidate)
        .where(*filters)
        .options(selectinload(Candidate.documents), selectinload(Candidate.institution))
        .order_by(Candidate.attention_count.desc(), Candidate.inconsistent_count.desc(), Candidate.updated_at.desc())
        .limit(limit)
        .offset(offset)
    )
    items = [present_candidate_item(candidate, db) for candidate in db.scalars(statement).all()]
    return CandidateList(items=items, total=total, limit=limit, offset=offset)


@router.get("/{candidate_id}", response_model=CandidateRead)
def get_candidate(candidate_id: str, db: DatabaseSession, institution_id: InstitutionId) -> CandidateRead:
    return present_candidate(find_candidate(db, institution_id, candidate_id))


@router.patch("/{candidate_id}", response_model=CandidateRead)
def patch_candidate(
    candidate_id: str,
    payload: CandidatePatch,
    db: DatabaseSession,
    institution_id: InstitutionId,
) -> CandidateRead:
    candidate = find_candidate(db, institution_id, candidate_id)
    changes = payload.model_dump(exclude_unset=True)
    for field, value in changes.items():
        setattr(candidate, field, value)
    if "monthly_income" in changes or "family_members" in changes:
        candidate.per_capita_income = round(candidate.monthly_income / max(candidate.family_members, 1), 2)
    db.commit()
    db.refresh(candidate)
    return present_candidate(candidate)


@router.post("/{candidate_id}/analysis", response_model=AnalysisRead, status_code=status.HTTP_201_CREATED)
def analyze_candidate(candidate_id: str, db: DatabaseSession, institution_id: InstitutionId) -> AnalysisRun:
    candidate = find_candidate(db, institution_id, candidate_id)
    return run_analysis(db, candidate)


@router.post("/{candidate_id}/decisions", response_model=DecisionRead, status_code=status.HTTP_201_CREATED)
def create_decision(
    candidate_id: str,
    payload: DecisionCreate,
    db: DatabaseSession,
    institution_id: InstitutionId,
) -> ReviewDecision:
    candidate = find_candidate(db, institution_id, candidate_id)
    new_status = {
        "Aprovar para entrevista": "Apto para entrevista",
        "Solicitar revisão": "Em revisão",
        "Não encaminhar": "Reprovado",
    }[payload.decision]
    decision = ReviewDecision(
        candidate_id=candidate.id,
        institution_id=institution_id,
        reviewer_id=get_settings().demo_user_id,
        decision=payload.decision,
        reason=payload.reason,
    )
    candidate.status = new_status
    db.add(decision)
    db.commit()
    db.refresh(decision)
    return decision


@router.get("/{candidate_id}/analysis", response_model=list[AnalysisRead])
def list_analysis(candidate_id: str, db: DatabaseSession, institution_id: InstitutionId) -> list[AnalysisRun]:
    candidate = find_candidate(db, institution_id, candidate_id)
    statement = (
        select(AnalysisRun).where(AnalysisRun.candidate_id == candidate.id).order_by(AnalysisRun.created_at.desc())
    )
    return list(db.scalars(statement).all())
