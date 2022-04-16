from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    nickname = Column(String(30), unique=True, nullable=False)
    password = Column(String(300))
    domain = Column(String(30))
    image_path = Column(String(300))

    post = relationship("Post", back_populates="user", cascade="all, delete-orphan", uselist=False)
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    bookmarks = relationship("Bookmark", back_populates="user", cascade="all, delete-orphan", lazy="dynamic")
