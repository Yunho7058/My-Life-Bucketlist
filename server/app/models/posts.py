from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    DateTime, 
    Date,
    Boolean,
    TEXT,
    event,
    update
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm.attributes import get_history

from app.db.database import Base
from app.utils import get_now
from app.core.aws_sqs import delete_s3_object_task


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    updated_at = Column(DateTime(timezone=True), default=get_now, onupdate=get_now)
    is_public = Column(Boolean, default=False)

    user = relationship("User", back_populates="post")
    bucketlist = relationship("Bucketlist", back_populates="post", cascade="all, delete-orphan", lazy="joined")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan", lazy="dynamic")
    bookmarks = relationship("Bookmark", back_populates="post", cascade="all, delete-orphan")

    nickname = association_proxy("user", "nickname")

    @hybrid_property
    def like_count(self):
        return self.likes.filter_by(state = True).count()


class Bucketlist(Base):
    __tablename__ = "bucketlist"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    content = Column(String(300))
    detail = Column(TEXT)
    image_path = Column(String(300))

    post = relationship("Post", back_populates="bucketlist", cascade="save-update")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("posts.id"))
    content = Column(TEXT)
    updated_at = Column(DateTime(timezone=True), default=get_now, onupdate=get_now)

    post = relationship("Post", back_populates="comments")
    user = relationship("User", back_populates="comments")

    nickname = association_proxy("user", "nickname")
    image_path = association_proxy("user", "image_path")


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



def bucketlist_listener(mapper, connection, target):
    connection.execute(update(Post).values(updated_at=get_now()).where(Post.id == target.post_id))


def bucketlist_image_path_update_listener(mapper, connection, target):
    history = get_history(target, "image_path")
    if history.has_changes():
        old_image_path = history.deleted[0] if history.deleted else None
        new_image_path = target.image_path
        delete_s3_object_task(old_image_path)


def bucketlist_image_path_delete_listener(mapper, connection, target):
    if target.image_path:
        delete_s3_object_task(target.image_path)
    

event.listen(Bucketlist, "after_insert", bucketlist_listener)
event.listen(Bucketlist, "after_update", bucketlist_listener)
event.listen(Bucketlist, "after_update", bucketlist_image_path_update_listener)
event.listen(Bucketlist, "after_delete", bucketlist_listener)
event.listen(Bucketlist, "after_delete", bucketlist_image_path_delete_listener)