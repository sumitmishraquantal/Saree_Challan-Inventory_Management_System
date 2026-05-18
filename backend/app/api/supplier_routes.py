from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.supplier_schema import (
    SupplierCreate,
    SupplierResponse
)

from app.services.supplier_service import (
    create_supplier,
    get_all_suppliers
)

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"]
)


@router.post(
    "",
    response_model=SupplierResponse
)
def create_new_supplier(
    supplier: SupplierCreate,
    db: Session = Depends(get_db)
):

    return create_supplier(
        db,
        supplier
    )


@router.get(
    "",
    response_model=list[SupplierResponse]
)
def fetch_suppliers(
    db: Session = Depends(get_db)
):

    return get_all_suppliers(db)