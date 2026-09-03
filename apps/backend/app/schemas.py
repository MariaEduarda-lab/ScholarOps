from datetime import date, datetime
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class ApiModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


class InstitutionRead(ApiModel):
    id: str
    name: str
    short_name: str
    initials: str
    process_name: str
    edition: str
    education_level: str
    description: str


class SessionRead(ApiModel):
    user_id: str
    user_name: str
    role: str
    institution: InstitutionRead


class DocumentRead(ApiModel):
    id: str
    category: str
    document_type: str = Field(serialization_alias="type")
    label: str
    member_id: str = Field(serialization_alias="member")
    relationship_label: str = Field(serialization_alias="relationship")
    required: str
    status: str
    issue: str | None
    confidence: float
    declared_value: str
    extracted_value: str
    human_review: bool


class CandidateRead(ApiModel):
    id: str
    external_id: str
    name: str
    initials: str
    age: int
    institution_id: str
    institution: str
    edition: str
    scenario: str
    status: str
    progress: int
    submitted_at: date
    updated_at: datetime
    phone: str
    email: str
    city: str
    family_members: int
    monthly_income: float
    per_capita_income: float
    documents: list[DocumentRead]
    pending_count: int
    inconsistent_count: int
    attention_count: int
    summary: str
    insights: list[str]


class CandidateListItem(ApiModel):
    id: str
    external_id: str
    name: str
    initials: str
    age: int
    institution_id: str
    institution: str
    edition: str
    scenario: str
    status: str
    progress: int
    submitted_at: date
    updated_at: datetime
    phone: str
    email: str
    city: str
    family_members: int
    monthly_income: float
    per_capita_income: float
    pending_count: int
    inconsistent_count: int
    attention_count: int
    summary: str
    insights: list[str]
    document_count: int
    documents: list[DocumentRead]


class CandidateList(ApiModel):
    items: list[CandidateListItem]
    total: int
    limit: int
    offset: int


class CandidatePatch(ApiModel):
    name: str | None = Field(default=None, min_length=2, max_length=180)
    age: int | None = Field(default=None, ge=0, le=120)
    status: str | None = Field(default=None, max_length=80)
    phone: str | None = Field(default=None, max_length=40)
    email: str | None = Field(default=None, max_length=180)
    city: str | None = Field(default=None, max_length=120)
    family_members: int | None = Field(default=None, ge=1, le=100)
    monthly_income: float | None = Field(default=None, ge=0)
    summary: str | None = None
    insights: list[str] | None = None


class IngestionRows(ApiModel):
    rows: list[dict[str, Any]] = Field(min_length=1, max_length=20_000)
    source_name: str = Field(default="api", max_length=100)


class IngestionRead(ApiModel):
    id: str
    institution_id: str
    source_type: str
    filename: str | None
    status: str
    rows_received: int
    candidates_upserted: int
    documents_upserted: int
    errors: list[dict[str, Any]]
    created_at: datetime
    completed_at: datetime | None


class DecisionCreate(ApiModel):
    decision: Literal["Aprovar para entrevista", "Solicitar revisão", "Não encaminhar"]
    reason: str = Field(min_length=5, max_length=4000)


class DecisionRead(ApiModel):
    id: str
    candidate_id: str
    institution_id: str
    reviewer_id: str
    decision: str
    reason: str
    created_at: datetime


class AnalysisRead(ApiModel):
    id: str
    candidate_id: str
    provider: str
    model_version: str
    status: str
    result: dict[str, Any]
    created_at: datetime


class MetricsRead(ApiModel):
    total: int
    awaiting: int
    pending: int
    review: int
    ready: int
    approved: int
    rejected: int


class HealthRead(ApiModel):
    status: str
    service: str
    environment: str
    database: str | None = None
