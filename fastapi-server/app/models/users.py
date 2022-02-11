from sqlalchemy import Column, Integer, String

from ..db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), unique=True, index=True)
    hashed_password = Column(String(300))
    name = Column(String(30))
    email = Column(String(100))
