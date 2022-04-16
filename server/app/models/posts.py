from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    DateTime, 
    Date,
    Boolean,
    TEXT
)
from sqlalchemy.orm import relationship

from app.db.database import Base
from app.utils import get_now


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    updated_at = Column(DateTime(timezone=True), onupdate=get_now)
    title = Column(String(100))
    is_public = Column(Boolean, default=True)

    user = relationship("User", back_populates="post")
    bucketlist = relationship("Bucketlist", back_populates="post", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan", lazy="dynamic")
    bookmarks = relationship("Bookmark", back_populates="post", cascade="all, delete-orphan")


class Bucketlist(Base):
    __tablename__ = "bucketlist"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    content = Column(String(300))
    detail = Column(TEXT)
    image_path = Column(String(300))

    post = relationship("Post", back_populates="bucketlist")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("posts.id"))
    content = Column(TEXT)
    updated_at = Column(DateTime(timezone=True), default=get_now, onupdate=get_now)

    post = relationship("Post", back_populates="comments")
    user = relationship("User", back_populates="comments")


class Like(Base):
    __tablename__ = "likes"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id"), primary_key=True)
    state = Column(Boolean)

    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")


class Bookmark(Base):
    __tablename__ = "bookmarks"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id"), primary_key=True)
    state = Column(Boolean)

    user = relationship("User", back_populates="bookmarks")
    post = relationship("Post", back_populates="bookmarks")