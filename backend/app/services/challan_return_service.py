from sqlalchemy.orm import Session

from sqlalchemy import func

from app.models.challan import Challan

from app.models.challan_return import (
    ChallanReturn
)

from app.schemas.challan_return_schema import (
    ChallanReturnCreate
)

from app.core.constants import (
    ChallanStatus
)


def create_return_entry(
    db: Session,
    return_data: ChallanReturnCreate
):

    challan = (
        db.query(Challan)
        .filter(
            Challan.id ==
            return_data.challan_id
        )
        .first()
    )

    if not challan:

        raise Exception(
            "Challan Not Found"
        )


    # TOTAL PREVIOUS RETURNS
    total_returned = (
        db.query(
            func.sum(
                ChallanReturn.returned_quantity
            )
        )
        .filter(
            ChallanReturn.challan_id ==
            return_data.challan_id
        )
        .scalar()
    ) or 0


    total_adjustment = (
        db.query(
            func.sum(
                ChallanReturn.adjustment_quantity
            )
        )
        .filter(
            ChallanReturn.challan_id ==
            return_data.challan_id
        )
        .scalar()
    ) or 0


    # NEW TOTAL AFTER ENTRY
    final_total = (
        total_returned +
        total_adjustment +
        return_data.returned_quantity +
        return_data.adjustment_quantity
    )


    # VALIDATION
    if final_total > challan.quantity:

        raise Exception(
            "Return quantity exceeds sent quantity"
        )


    # CREATE RETURN ENTRY
    db_return = ChallanReturn(
        challan_id=return_data.challan_id,

        return_date=return_data.return_date,

        returned_quantity=
            return_data.returned_quantity,

        adjustment_quantity=
            return_data.adjustment_quantity,

        remarks=return_data.remarks
    )

    db.add(db_return)


    # PENDING CALCULATION
    pending_quantity = (
        challan.quantity -
        final_total
    )


    # STATUS UPDATE
    if pending_quantity == 0:

        challan.status = (
            ChallanStatus.COMPLETED.value
        )

    elif pending_quantity < challan.quantity:

        challan.status = (
            ChallanStatus.PARTIAL.value
        )

    else:

        challan.status = (
            ChallanStatus.ACTIVE.value
        )


    db.commit()

    db.refresh(db_return)

    return db_return