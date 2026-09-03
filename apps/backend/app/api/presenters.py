from sqlalchemy.orm import Session

from app.models import Candidate, Document
from app.schemas import CandidateListItem, CandidateRead, DocumentRead


def present_document(document: Document) -> DocumentRead:
    return DocumentRead(
        id=document.id.rsplit(":", 1)[-1],
        category=document.category,
        document_type=document.document_type,
        label=document.label,
        member_id=document.member_id,
        relationship_label=document.relationship_label,
        required=document.required,
        status=document.status,
        issue=document.issue,
        confidence=document.confidence,
        declared_value=document.declared_value,
        extracted_value=document.extracted_value,
        human_review=document.human_review,
    )


def candidate_values(candidate: Candidate) -> dict[str, object]:
    name_parts = candidate.name.split()
    initials = "".join(part[0] for part in name_parts[:2]).upper()
    return {
        "id": candidate.external_id,
        "external_id": candidate.external_id,
        "name": candidate.name,
        "initials": initials,
        "age": candidate.age,
        "institution_id": candidate.institution_id,
        "institution": candidate.institution.short_name,
        "edition": candidate.edition,
        "scenario": candidate.scenario,
        "status": candidate.status,
        "progress": candidate.progress,
        "submitted_at": candidate.submitted_at,
        "updated_at": candidate.updated_at,
        "phone": candidate.phone,
        "email": candidate.email,
        "city": candidate.city,
        "family_members": candidate.family_members,
        "monthly_income": candidate.monthly_income,
        "per_capita_income": candidate.per_capita_income,
        "pending_count": candidate.pending_count,
        "inconsistent_count": candidate.inconsistent_count,
        "attention_count": candidate.attention_count,
        "summary": candidate.summary,
        "insights": candidate.insights,
    }


def present_candidate(candidate: Candidate) -> CandidateRead:
    return CandidateRead(
        **candidate_values(candidate),
        documents=[present_document(document) for document in candidate.documents],
    )


def present_candidate_item(candidate: Candidate, db: Session) -> CandidateListItem:
    del db  # Mantém assinatura pronta para projeções futuras no repositório.
    return CandidateListItem(
        **candidate_values(candidate),
        document_count=len(candidate.documents),
        documents=[present_document(document) for document in candidate.documents],
    )
