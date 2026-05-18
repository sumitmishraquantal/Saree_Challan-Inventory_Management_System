from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey,
    Date,
    Text,
)

from sqlalchemy.orm import relationship

from app.db.database import Base


class ChallanReturn(Base):

    __tablename__ = "challan_returns"

    id = Column(Integer, primary_key=True, index=True)

    challan_id = Column(
        Integer,
        ForeignKey("challans.id")
    )

    return_date = Column(Date)

    returned_quantity = Column(Float)

    adjustment_quantity = Column(Float)

    remarks = Column(Text)

    challan = relationship(
        "Challan",
        back_populates="returns"
    )