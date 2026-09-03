from datetime import UTC, date, datetime
from typing import Any
from uuid import uuid4

from sqlalchemy import JSON, Boolean, Date, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


def utc_now() -> datetime:
    return datetime.now(UTC)


class Institution(Base):
    __tablename__ = "institutions"

    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    name: Mapped[str] = mapped_column(String(180))
    short_name: Mapped[str] = mapped_column(String(100))
    initials: Mapped[str] = mapped_column(String(5))
    process_name: Mapped[str] = mapped_column(String(160))
    edition: Mapped[str] = mapped_column(String(120))
    education_level: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    candidates: Mapped[list["Candidate"]] = relationship(back_populates="institution")


class Candidate(Base):
    __tablename__ = "candidates"
    __table_args__ = (UniqueConstraint("institution_id", "external_id", name="uq_candidate_institution_external"),)

    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    external_id: Mapped[str] = mapped_column(String(120), index=True)
    institution_id: Mapped[str] = mapped_column(ForeignKey("institutions.id"), index=True)
    name: Mapped[str] = mapped_column(String(180))
    age: Mapped[int] = mapped_column(Integer, default=0)
    edition: Mapped[str] = mapped_column(String(120))
    scenario: Mapped[str] = mapped_column(String(180), default="")
    status: Mapped[str] = mapped_column(String(80), default="Aguardando análise", index=True)
    progress: Mapped[int] = mapped_column(Integer, default=0)
    submitted_at: Mapped[date] = mapped_column(Date, default=date.today)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)
    phone: Mapped[str] = mapped_column(String(40), default="")
    email: Mapped[str] = mapped_column(String(180), default="")
    city: Mapped[str] = mapped_column(String(120), default="")
    family_members: Mapped[int] = mapped_column(Integer, default=1)
    monthly_income: Mapped[float] = mapped_column(Float, default=0)
    per_capita_income: Mapped[float] = mapped_column(Float, default=0)
    summary: Mapped[str] = mapped_column(Text, default="")
    insights: Mapped[list[str]] = mapped_column(JSON, default=list)
    pending_count: Mapped[int] = mapped_column(Integer, default=0)
    inconsistent_count: Mapped[int] = mapped_column(Integer, default=0)
    attention_count: Mapped[int] = mapped_column(Integer, default=0)

    institution: Mapped[Institution] = relationship(back_populates="candidates")
    documents: Mapped[list["Document"]] = relationship(back_populates="candidate", cascade="all, delete-orphan")
    decisions: Mapped[list["ReviewDecision"]] = relationship(back_populates="candidate", cascade="all, delete-orphan")
    analysis_runs: Mapped[list["AnalysisRun"]] = relationship(back_populates="candidate", cascade="all, delete-orphan")


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    candidate_id: Mapped[str] = mapped_column(ForeignKey("candidates.id"), index=True)
    institution_id: Mapped[str] = mapped_column(ForeignKey("institutions.id"), index=True)
    category: Mapped[str] = mapped_column(String(120), default="")
    document_type: Mapped[str] = mapped_column(String(160), default="")
    label: Mapped[str] = mapped_column(String(180), default="")
    member_id: Mapped[str] = mapped_column(String(120), default="")
    relationship_label: Mapped[str] = mapped_column(String(100), default="")
    required: Mapped[str] = mapped_column(String(80), default="")
    status: Mapped[str] = mapped_column(String(60), default="pendente", index=True)
    issue: Mapped[str | None] = mapped_column(Text, nullable=True)
    confidence: Mapped[float] = mapped_column(Float, default=0)
    declared_value: Mapped[str] = mapped_column(String(160), default="")
    extracted_value: Mapped[str] = mapped_column(String(160), default="")
    human_review: Mapped[bool] = mapped_column(Boolean, default=False)
    source_payload: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)

    candidate: Mapped[Candidate] = relationship(back_populates="documents")


class IngestionJob(Base):
    __tablename__ = "ingestion_jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    institution_id: Mapped[str] = mapped_column(ForeignKey("institutions.id"), index=True)
    source_type: Mapped[str] = mapped_column(String(30))
    filename: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="processing")
    rows_received: Mapped[int] = mapped_column(Integer, default=0)
    candidates_upserted: Mapped[int] = mapped_column(Integer, default=0)
    documents_upserted: Mapped[int] = mapped_column(Integer, default=0)
    errors: Mapped[list[dict[str, Any]]] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class ReviewDecision(Base):
    __tablename__ = "review_decisions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    candidate_id: Mapped[str] = mapped_column(ForeignKey("candidates.id"), index=True)
    institution_id: Mapped[str] = mapped_column(ForeignKey("institutions.id"), index=True)
    reviewer_id: Mapped[str] = mapped_column(String(100))
    decision: Mapped[str] = mapped_column(String(80))
    reason: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    candidate: Mapped[Candidate] = relationship(back_populates="decisions")


class AnalysisRun(Base):
    __tablename__ = "analysis_runs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    candidate_id: Mapped[str] = mapped_column(ForeignKey("candidates.id"), index=True)
    institution_id: Mapped[str] = mapped_column(ForeignKey("institutions.id"), index=True)
    provider: Mapped[str] = mapped_column(String(80))
    model_version: Mapped[str] = mapped_column(String(120))
    status: Mapped[str] = mapped_column(String(40), default="completed")
    result: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    candidate: Mapped[Candidate] = relationship(back_populates="analysis_runs")
