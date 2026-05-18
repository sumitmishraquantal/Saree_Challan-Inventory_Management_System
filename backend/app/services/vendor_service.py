from sqlalchemy.orm import Session
from app.models.vendor import Vendor
from app.schemas.vendor_schema import VendorCreate


def create_vendor(db: Session, vendor: VendorCreate):
    db_vendor = Vendor(
        name=vendor.name,
        gst_number=vendor.gst_number,
        phone=vendor.phone,
        address=vendor.address
    )

    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)

    return db_vendor


def get_all_vendors(db: Session):
    return db.query(Vendor).all()