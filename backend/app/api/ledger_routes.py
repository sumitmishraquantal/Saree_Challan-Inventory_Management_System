from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from sqlalchemy import func

from app.db.session import get_db

from app.models.challan import Challan

from app.models.challan_return import (
    ChallanReturn
)

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User


router = APIRouter(
    prefix="/ledger",
    tags=["Ledger"]
)


@router.get("")
def fetch_ledger(

    db: Session = Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    challans = (
        db.query(Challan)
        .all()
    )

    ledger_entries = []


    for challan in challans:

        total_returned = (

            db.query(
                func.sum(
                    ChallanReturn.returned_quantity
                )
            )

            .filter(
                ChallanReturn.challan_id
                == challan.id
            )

            .scalar()

        ) or 0


        pending_quantity = (
            challan.quantity -
            total_returned
        )


        ledger_entries.append({

            "challan_number":
                challan.challan_number,

            "vendor":
                challan.vendor.name,

            "supplier":
                challan.supplier.name,

            "sent_quantity":
                challan.quantity,

            "returned_quantity":
                total_returned,

            "pending_quantity":
                pending_quantity,

            "status":
                challan.status,

            "sent_date":
                challan.sent_date
        })


    return ledger_entries