from pydantic import BaseModel
from typing import Optional


class SupplierCreate(BaseModel):

    name: str

    gst_number: Optional[str] = None

    phone: Optional[str] = None

    address: Optional[str] = None


class SupplierResponse(BaseModel):

    id: int

    name: str

    gst_number: Optional[str]

    phone: Optional[str]

    address: Optional[str]

    class Config:
        from_attributes = True