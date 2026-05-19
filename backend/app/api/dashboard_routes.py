from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from sqlalchemy import func

from app.db.session import get_db

from app.models.challan import Challan

from app.models.vendor import Vendor

from app.models.supplier import Supplier

from app.models.challan_return import (
    ChallanReturn
)

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(

    db: Session = Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    # TOTAL CHALLANS
    total_challans = (
        db.query(Challan)
        .count()
    )


    # ACTIVE
    active_challans = (
        db.query(Challan)
        .filter(
            Challan.status == "ACTIVE"
        )
        .count()
    )


    # PARTIAL
    partial_challans = (
        db.query(Challan)
        .filter(
            Challan.status == "PARTIAL"
        )
        .count()
    )


    # COMPLETED
    completed_challans = (
        db.query(Challan)
        .filter(
            Challan.status == "COMPLETED"
        )
        .count()
    )


    # PENDING QUANTITY
    challans = (
        db.query(Challan)
        .all()
    )

    total_pending_quantity = 0


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


        pending = (
            challan.quantity -
            total_returned
        )

        total_pending_quantity += pending


    # VENDORS
    total_vendors = (
        db.query(Vendor)
        .count()
    )


    # SUPPLIERS
    total_suppliers = (
        db.query(Supplier)
        .count()
    )


    return {

        "total_challans":
            total_challans,

        "active_challans":
            active_challans,

        "partial_challans":
            partial_challans,

        "completed_challans":
            completed_challans,

        "pending_quantity":
            total_pending_quantity,

        "total_vendors":
            total_vendors,

        "total_suppliers":
            total_suppliers
    }