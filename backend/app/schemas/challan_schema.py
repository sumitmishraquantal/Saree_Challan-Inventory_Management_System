from pydantic import BaseModel

from typing import Optional

from datetime import date


class ChallanCreate(BaseModel):

    vendor_id: int

    supplier_id: int

    quantity: float

    unit: str

    transport_type: Optional[str] = None

    lr_number: Optional[str] = None

    program: Optional[str] = None

    rate: Optional[float] = None

    sent_date: date


class ChallanResponse(BaseModel):

    id: int

    challan_number: str

    vendor_id: int

    supplier_id: int

    vendor_name: str

    supplier_name: str

    quantity: float

    returned_quantity: float

    pending_quantity: float

    unit: str

    transport_type: Optional[str]

    lr_number: Optional[str]

    program: Optional[str]

    rate: Optional[float]

    sent_date: date

    status: str

    class Config:
        from_attributes = True