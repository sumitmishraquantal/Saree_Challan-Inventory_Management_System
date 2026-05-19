from fastapi import (
    APIRouter,
    Depends
)

from fastapi.responses import (
    StreamingResponse
)

from sqlalchemy.orm import Session

from io import BytesIO


from app.db.session import get_db

from app.schemas.challan_schema import (
    ChallanCreate,
    ChallanResponse
)

from app.services.challan_service import (
    create_challan,
    get_all_challans,
    download_challan_pdf
)

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User

from app.core.dependencies import (
    require_accountant
)

router = APIRouter(
    prefix="/challans",
    tags=["Challans"]
)


# CREATE CHALLAN
@router.post(
    "",
    response_model=ChallanResponse
)
def create_new_challan(

    challan: ChallanCreate,

    db: Session = Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    return create_challan(
        db,
        challan
    )


# GET ALL CHALLANS
@router.get(
    "",
    response_model=list[ChallanResponse]
)
def fetch_challans(

    db: Session = Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    return get_all_challans(db)


# DOWNLOAD PDF
@router.get(
    "/{challan_id}/pdf"
)
def download_pdf(

    challan_id: int,

    db: Session = Depends(get_db),

    current_user: User =
        Depends(require_accountant)
):

    pdf, challan = (
        download_challan_pdf(
            db,
            challan_id
        )
    )

    return StreamingResponse(

        BytesIO(pdf),

        media_type="application/pdf",

        headers={
            "Content-Disposition":
            f"attachment; filename={challan.challan_number}.pdf"
        }
    )