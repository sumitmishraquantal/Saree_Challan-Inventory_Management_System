from sqlalchemy.orm import Session

from datetime import datetime

from app.models.challan import Challan


def generate_challan_number(
    db: Session
):

    current_year = datetime.now().year

    prefix = f"MK-{current_year}"

    latest_challan = (
        db.query(Challan)
        .order_by(Challan.id.desc())
        .first()
    )

    if latest_challan:

        try:

            last_number = int(
                latest_challan.challan_number.split("-")[-1]
            )

        except:

            last_number = 0

    else:

        last_number = 0

    new_number = last_number + 1

    challan_number = (
        f"{prefix}-{new_number:03d}"
    )

    return challan_number