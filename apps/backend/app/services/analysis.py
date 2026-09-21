from dataclasses import dataclass
from typing import Protocol

from sqlalchemy.orm import Session

from app.models import AnalysisRun, Candidate


@dataclass(frozen=True)
class AnalysisResult:
    summary: str
    insights: list[str]
    flags: list[dict[str, str]]
    confidence: float


class AnalysisProvider(Protocol):
    """Contrato que um futuro modelo de IA deverá implementar."""

    name: str
    version: str

    def analyze(self, candidate: Candidate) -> AnalysisResult: ...


class RulesAnalysisProvider:
    """Implementação provisória, determinística e explicável."""

    name = "rules"
    version = "rules-v1"

    def analyze(self, candidate: Candidate) -> AnalysisResult:
        flags: list[dict[str, str]] = []
        for document in candidate.documents:
            if document.status != "ok" or document.human_review:
                flags.append(
                    {
                        "documentId": document.id.rsplit(":", 1)[-1],
                        "type": document.status,
                        "reason": document.issue or "Revisão humana indicada pela regra documental.",
                    }
                )
        return AnalysisResult(
            summary=candidate.summary,
            insights=candidate.insights,
            flags=flags,
            confidence=1.0,
        )


class LoremIpsumAnalysisProvider:
    """Provedor de demonstração usado enquanto não há um modelo de IA conectado."""

    name = "mock-lorem"
    version = "mock-lorem-v1"

    def analyze(self, candidate: Candidate) -> AnalysisResult:
        flags: list[dict[str, str]] = []
        for document in candidate.documents:
            if document.status != "ok" or document.human_review:
                flags.append(
                    {
                        "documentId": document.id.rsplit(":", 1)[-1],
                        "type": document.status,
                        "reason": document.issue or "Revisão humana indicada pela regra documental.",
                    }
                )
        return AnalysisResult(
            summary=(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor "
                "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
                "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            ),
            insights=[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            ],
            flags=flags,
            confidence=0.0,
        )


def run_analysis(db: Session, candidate: Candidate, provider: AnalysisProvider | None = None) -> AnalysisRun:
    selected_provider = provider or LoremIpsumAnalysisProvider()
    result = selected_provider.analyze(candidate)
    run = AnalysisRun(
        candidate_id=candidate.id,
        institution_id=candidate.institution_id,
        provider=selected_provider.name,
        model_version=selected_provider.version,
        result={
            "summary": result.summary,
            "insights": result.insights,
            "flags": result.flags,
            "confidence": result.confidence,
            "requiresHumanReview": bool(result.flags),
        },
    )
    db.add(run)
    db.commit()
    db.refresh(run)
    return run
