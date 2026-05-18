from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.vendor_schema import VendorCreate, VendorResponse
from app.services.vendor_service import create_vendor, get_all_vendors

router = APIRouter(
    prefix="/vendors",
    tags=["Vendors"]
)


@router.post("", response_model=VendorResponse)
def create_new_vendor(
    vendor: VendorCreate,
    db: Session = Depends(get_db)
):
    return create_vendor(db, vendor)


@router.get("", response_model=list[VendorResponse])
def fetch_vendors(
    db: Session = Depends(get_db)
):
    return get_all_vendors(db)