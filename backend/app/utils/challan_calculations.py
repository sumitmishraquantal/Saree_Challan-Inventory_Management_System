from sqlalchemy.orm import Session

from sqlalchemy import func

from app.models.challan_return import (
    ChallanReturn
)


def get_total_returned_quantity(
    db: Session,
    challan_id: int
):

    returned_quantity = (
        db.query(
            func.sum(
                ChallanReturn.returned_quantity
            )
        )
        .filter(
            ChallanReturn.challan_id ==
            challan_id
        )
        .scalar()
    ) or 0

    adjustment_quantity = (
        db.query(
            func.sum(
                ChallanReturn.adjustment_quantity
            )
        )
        .filter(
            ChallanReturn.challan_id ==
            challan_id
        )
        .scalar()
    ) or 0

    return (
        returned_quantity +
        adjustment_quantity
    )