from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    DateTime, 
    Date
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    updated_at = Column(DateTime(timezone=True))
    title = Column(String(100))

    user = relationship("User", back_populates="post")
    bucketlist = relationship("Bucketlist", back_populates="post")


class Bucketlist(Base):
    __tablename__ = "bucketlist"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    content = Column(String(300))
    date = Column(Date)
    image_path = Column(String(300))

    post = relationship("Post", back_populates="bucketlist")