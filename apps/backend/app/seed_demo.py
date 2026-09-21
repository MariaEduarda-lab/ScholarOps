import argparse

from sqlalchemy import func, select

from app.core.config import get_settings
from app.core.database import Base, SessionLocal, create_database_tables, engine
from app.models import Candidate, Document
from app.services.ingestion import INSTITUTIONS, seed_demo_database


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Cria e popula a base local de demonstração do ScholarOps.")
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Recria as tabelas antes da carga. Permitido apenas com SQLite fora de produção.",
    )
    return parser.parse_args()


def reset_database() -> None:
    settings = get_settings()
    if not settings.database_url.startswith("sqlite") or settings.environment == "production":
        raise SystemExit("O reset da base demo só é permitido em SQLite e fora do ambiente de produção.")
    Base.metadata.drop_all(bind=engine)


def main() -> None:
    args = parse_args()
    if args.reset:
        reset_database()
    create_database_tables()

    with SessionLocal() as db:
        seed_demo_database(db)
        print("Base de demonstração pronta:")
        for institution_id, institution in INSTITUTIONS.items():
            candidates = db.scalar(
                select(func.count()).select_from(Candidate).where(Candidate.institution_id == institution_id)
            )
            documents = db.scalar(
                select(func.count()).select_from(Document).where(Document.institution_id == institution_id)
            )
            print(f"- {institution['short_name']}: {candidates or 0} candidaturas, {documents or 0} documentos")


if __name__ == "__main__":
    main()
