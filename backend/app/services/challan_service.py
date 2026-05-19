from sqlalchemy.orm import Session

from app.models.challan import Challan

from app.schemas.challan_schema import (
    ChallanCreate
)

from app.utils.challan_number import (
    generate_challan_number
)

from app.core.constants import (
    ChallanStatus
)

from app.utils.challan_calculations import (
    get_total_returned_quantity
)

from app.utils.pdf_generator import (
    generate_challan_pdf
)

def serialize_challan(
    db: Session,
    challan: Challan
):

    returned_quantity = (
        get_total_returned_quantity(
            db,
            challan.id
        )
    )

    pending_quantity = (
        challan.quantity -
        returned_quantity
    )

    return {

        "id": challan.id,

        "challan_number":
            challan.challan_number,

        "vendor_id":
            challan.vendor_id,

        "supplier_id":
            challan.supplier_id,

        "vendor_name":
            challan.vendor.name,

        "supplier_name":
            challan.supplier.name,

        "quantity":
            challan.quantity,

        "returned_quantity":
            returned_quantity,

        "pending_quantity":
            pending_quantity,

        "unit":
            challan.unit,

        "transport_type":
            challan.transport_type,

        "lr_number":
            challan.lr_number,

        "program":
            challan.program,

        "rate":
            challan.rate,

        "sent_date":
            challan.sent_date,

        "status":
            challan.status
    }

def create_challan(
    db: Session,
    challan: ChallanCreate
):

    challan_number = generate_challan_number(db)

    db_challan = Challan(
        challan_number=challan_number,

        vendor_id=challan.vendor_id,

        supplier_id=challan.supplier_id,

        quantity=challan.quantity,

        unit=challan.unit,

        transport_type=challan.transport_type,

        lr_number=challan.lr_number,

        program=challan.program,

        rate=challan.rate,

        sent_date=challan.sent_date,

        status=ChallanStatus.ACTIVE.value
    )

    db.add(db_challan)

    db.commit()

    db.refresh(db_challan)

    return serialize_challan(
    db,
    db_challan
)


def get_all_challans(
    db: Session
):

    challans = (
        db.query(Challan)
        .order_by(Challan.id.desc())
        .all()
    )

    enriched_challans = []

    for challan in challans:

        enriched_challans.append(
            serialize_challan(
                db,
                challan
            )
        )

    return enriched_challans


def download_challan_pdf(
    db: Session,
    challan_id: int
):

    challan = (
        db.query(Challan)
        .filter(
            Challan.id == challan_id
        )
        .first()
    )

    if not challan:

        raise Exception(
            "Challan Not Found"
        )

    pdf = generate_challan_pdf(
        challan
    )

    return pdf, challan