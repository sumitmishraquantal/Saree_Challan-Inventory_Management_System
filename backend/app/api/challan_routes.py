from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

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
from fastapi.responses import (
    StreamingResponse
)

from io import BytesIO

router = APIRouter(
    prefix="/challans",
    tags=["Challans"]
)


@router.post(
    "",
    response_model=ChallanResponse
)
def create_new_challan(
    challan: ChallanCreate,
    db: Session = Depends(get_db)
):

    return create_challan(
        db,
        challan
    )


@router.get(
    "",
    response_model=list[ChallanResponse]
)
def fetch_challans(
    db: Session = Depends(get_db)
):

    return get_all_challans(db)



@router.get(
    "/{challan_id}/pdf"
)
def download_pdf(
    challan_id: int,
    db: Session = Depends(get_db)
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