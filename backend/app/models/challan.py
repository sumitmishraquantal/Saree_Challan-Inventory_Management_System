from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    Date,
)

from sqlalchemy.orm import relationship

from app.db.database import Base


class Challan(Base):

    __tablename__ = "challans"

    id = Column(Integer, primary_key=True, index=True)

    challan_number = Column(
        String,
        unique=True,
        nullable=False
    )

    vendor_id = Column(
        Integer,
        ForeignKey("vendors.id")
    )

    supplier_id = Column(
        Integer,
        ForeignKey("suppliers.id")
    )

    quantity = Column(Float, nullable=False)

    unit = Column(String, nullable=False)

    transport_type = Column(String)

    lr_number = Column(String)

    program = Column(String)

    rate = Column(Float)

    sent_date = Column(Date)

    status = Column(String)

    vendor = relationship(
        "Vendor",
        back_populates="challans"
    )

    supplier = relationship(
        "Supplier",
        back_populates="challans"
    )

    returns = relationship(
        "ChallanReturn",
        back_populates="challan"
    )