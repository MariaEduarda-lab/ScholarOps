from typing import Annotated

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.api.dependencies import DatabaseSession, InstitutionId
from app.core.config import get_settings
from app.models import IngestionJob
from app.schemas import IngestionRead, IngestionRows
from app.services.ingestion import ingest_rows, parse_csv_bytes, parse_xlsx_bytes

router = APIRouter(prefix="/ingestions", tags=["ingestions"])


async def read_upload(file: UploadFile) -> bytes:
    contents = await file.read()
    if len(contents) > get_settings().max_csv_size_mb * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Arquivo acima do limite configurado.",
        )
    return contents


@router.post("/csv", response_model=IngestionRead, status_code=status.HTTP_201_CREATED)
async def upload_csv(
    file: Annotated[UploadFile, File(description="Tabela CSV em UTF-8")],
    db: DatabaseSession,
    institution_id: InstitutionId,
) -> IngestionJob:
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Envie um arquivo .csv.")
    contents = await read_upload(file)
    try:
        rows = parse_csv_bytes(contents)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc
    return ingest_rows(db, institution_id, rows, source_type="csv", filename=file.filename)


@router.post("/file", response_model=IngestionRead, status_code=status.HTTP_201_CREATED)
async def upload_table(
    file: Annotated[UploadFile, File(description="Tabela CSV ou XLSX")],
    db: DatabaseSession,
    institution_id: InstitutionId,
) -> IngestionJob:
    filename = file.filename or ""
    suffix = filename.lower().rsplit(".", 1)[-1]
    if suffix not in {"csv", "xlsx"}:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Envie uma tabela .csv ou .xlsx.",
        )
    contents = await read_upload(file)
    try:
        rows = parse_csv_bytes(contents) if suffix == "csv" else parse_xlsx_bytes(contents)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc
    return ingest_rows(db, institution_id, rows, source_type=suffix, filename=filename)


@router.post("/rows", response_model=IngestionRead, status_code=status.HTTP_201_CREATED)
def ingest_api_rows(payload: IngestionRows, db: DatabaseSession, institution_id: InstitutionId) -> IngestionJob:
    """Recebe linhas vindas de uma tabela, automação ou API externa."""
    return ingest_rows(db, institution_id, payload.rows, source_type=payload.source_name)


@router.get("/{job_id}", response_model=IngestionRead)
def get_ingestion(job_id: str, db: DatabaseSession, institution_id: InstitutionId) -> IngestionJob:
    job = db.get(IngestionJob, job_id)
    if job is None or job.institution_id != institution_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Importação não encontrada.")
    return job
