from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.challan_return_schema import (
    ChallanReturnCreate,
    ChallanReturnResponse
)

from app.services.challan_return_service import (
    create_return_entry
)

from app.core.dependencies import (
    require_warehouse
)
from app.models.user import User

router = APIRouter(
    prefix="/returns",
    tags=["Returns"]
)


@router.post(
    "",
    response_model=ChallanReturnResponse
)
def create_new_return(
    
   return_data: ChallanReturnCreate,
    db: Session = Depends(get_db),
    current_user: User =
        Depends(require_warehouse)
):

    return create_return_entry(
        db,
        return_data
    )