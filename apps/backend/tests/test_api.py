import pytest
from httpx2 import AsyncClient

pytestmark = pytest.mark.asyncio


async def test_health_and_database(client: AsyncClient) -> None:
    assert (await client.get("/health")).json()["status"] == "ok"
    database = await client.get("/health/database")
    assert database.status_code == 200
    assert database.json()["database"] == "sqlite"


async def test_candidates_are_scoped_by_institution(client: AsyncClient) -> None:
    response = await client.get("/api/v1/candidates", headers={"X-Institution-Id": "inteli"})
    assert response.status_code == 200
    assert response.json()["total"] == 1

    forbidden_scope = await client.get(
        "/api/v1/candidates/INT-TEST-0001",
        headers={"X-Institution-Id": "bom_aluno_bh"},
    )
    assert forbidden_scope.status_code == 404


async def test_json_ingestion_and_patch(client: AsyncClient) -> None:
    ingestion = await client.post(
        "/api/v1/ingestions/rows",
        headers={"X-Institution-Id": "inteli"},
        json={
            "sourceName": "table-sync",
            "rows": [
                {
                    "candidatura_id": "INT-API-0002",
                    "nome": "Pessoa de Teste",
                    "tipo_documento": "comprovante_residencia",
                    "arquivo_id": "DOC-API-002",
                    "status_documento": "pendente",
                }
            ],
        },
    )
    assert ingestion.status_code == 201
    assert ingestion.json()["candidatesUpserted"] == 1

    patched = await client.patch(
        "/api/v1/candidates/INT-API-0002",
        headers={"X-Institution-Id": "inteli"},
        json={"phone": "(11) 99999-9999", "familyMembers": 3, "monthlyIncome": 3000},
    )
    assert patched.status_code == 200
    assert patched.json()["perCapitaIncome"] == 1000


async def test_csv_file_ingestion(client: AsyncClient) -> None:
    csv_content = (
        "instituicao,candidatura_id,tipo_documento,arquivo_id,status_documento,pendencia_esperada\n"
        "inteli,INT-CSV-0003,rg_candidato,DOC-CSV-003,ok,nenhuma\n"
    )
    response = await client.post(
        "/api/v1/ingestions/file",
        headers={"X-Institution-Id": "inteli"},
        files={"file": ("candidaturas.csv", csv_content.encode(), "text/csv")},
    )
    assert response.status_code == 201
    assert response.json()["documentsUpserted"] == 1


async def test_analysis_does_not_make_a_decision(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/candidates/INT-TEST-0001/analysis",
        headers={"X-Institution-Id": "inteli"},
    )
    assert response.status_code == 201
    assert response.json()["provider"] == "rules"
    assert "decision" not in response.json()["result"]


async def test_decision_requires_reason(client: AsyncClient) -> None:
    invalid = await client.post(
        "/api/v1/candidates/INT-TEST-0001/decisions",
        headers={"X-Institution-Id": "inteli"},
        json={"decision": "Aprovar para entrevista", "reason": "não"},
    )
    assert invalid.status_code == 422

    valid = await client.post(
        "/api/v1/candidates/INT-TEST-0001/decisions",
        headers={"X-Institution-Id": "inteli"},
        json={"decision": "Aprovar para entrevista", "reason": "Documentação conferida manualmente."},
    )
    assert valid.status_code == 201
