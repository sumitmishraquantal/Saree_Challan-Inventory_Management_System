from sqlalchemy.orm import Session

from app.models.supplier import Supplier

from app.schemas.supplier_schema import (
    SupplierCreate
)


def create_supplier(
    db: Session,
    supplier: SupplierCreate
):

    db_supplier = Supplier(
        name=supplier.name,
        gst_number=supplier.gst_number,
        phone=supplier.phone,
        address=supplier.address
    )

    db.add(db_supplier)

    db.commit()

    db.refresh(db_supplier)

    return db_supplier


def get_all_suppliers(db: Session):

    return db.query(Supplier).all()