from pydantic import BaseModel

from typing import Optional

from datetime import date


class ChallanReturnCreate(BaseModel):

    challan_id: int

    return_date: date

    returned_quantity: float

    adjustment_quantity: float = 0

    remarks: Optional[str] = None


class ChallanReturnResponse(BaseModel):

    id: int

    challan_id: int

    return_date: date

    returned_quantity: float

    adjustment_quantity: float

    remarks: Optional[str]

    class Config:
        from_attributes = True