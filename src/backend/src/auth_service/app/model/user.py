from uuid import uuid4
from sqlalchemy import UUID, Column, Integer, String

from utils.database import Base

class UserModel(Base):
  __tablename__ = "user"
  __table_args__ = {"extend_existing": True}

  id       = Column(Integer, primary_key=True, index=True)
  uuid     = Column(UUID(as_uuid=True), default=uuid4, unique=True, nullable=False)
  login    = Column(String(255), nullable=False)
  password = Column(String(255), nullable=False)
  email    = Column(String(255), nullable=False)
  phone    = Column(String(255), nullable=False)
