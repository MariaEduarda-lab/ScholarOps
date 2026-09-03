from typing import Annotated

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.models import Institution

DatabaseSession = Annotated[Session, Depends(get_db)]


def get_current_institution_id(
    db: DatabaseSession,
    x_institution_id: Annotated[str | None, Header()] = None,
) -> str:
    institution_id = x_institution_id or get_settings().demo_institution_id
    if db.get(Institution, institution_id) is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Instituição ausente ou não autorizada para esta sessão.",
        )
    return institution_id


InstitutionId = Annotated[str, Depends(get_current_institution_id)]
