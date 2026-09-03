import os
from collections.abc import AsyncIterator, Iterator
from pathlib import Path

os.environ["DATABASE_URL"] = "sqlite:///./test_scholarops.db"
os.environ["SEED_DEMO_DATA"] = "false"

import pytest
import pytest_asyncio
from httpx2 import ASGITransport, AsyncClient

from app.core.database import Base, SessionLocal, engine
from app.main import app
from app.services.ingestion import ensure_institutions, ingest_rows


@pytest.fixture(autouse=True)
def database() -> Iterator[None]:
    engine.dispose()
    Path("test_scholarops.db").unlink(missing_ok=True)
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        ensure_institutions(db)
        ingest_rows(
            db,
            "inteli",
            [
                {
                    "instituicao": "inteli",
                    "edicao": "graduacao_2026",
                    "candidatura_id": "INT-TEST-0001",
                    "membro_id": "M1",
                    "relacao": "candidato",
                    "idade": "18",
                    "categoria_documental": "identificacao",
                    "tipo_documento": "rg_candidato",
                    "obrigatoriedade": "obrigatorio",
                    "arquivo_id": "DOC-TEST-001",
                    "status_documento": "ok",
                    "pendencia_esperada": "nenhuma",
                    "confianca_extracao": "0.98",
                    "revisao_humana_esperada": "nao",
                }
            ],
            source_type="test",
        )
    yield
    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    Path("test_scholarops.db").unlink(missing_ok=True)


@pytest_asyncio.fixture
async def client() -> AsyncIterator[AsyncClient]:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as test_client:
        yield test_client
