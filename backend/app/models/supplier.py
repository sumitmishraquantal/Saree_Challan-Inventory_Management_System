from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Supplier(Base):

    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    gst_number = Column(String)

    phone = Column(String)

    address = Column(String)

    challans = relationship(
        "Challan",
        back_populates="supplier"
    )