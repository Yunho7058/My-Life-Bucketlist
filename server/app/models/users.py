from sqlalchemy import Column, Integer, String

from ..db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True)
    nickname = Column(String(30), unique=True)
    password = Column(String(300))
