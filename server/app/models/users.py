from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm.attributes import get_history

from app.db.database import Base
from app.core.aws_sqs import delete_s3_object_task

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


def user_image_path_update_listener(mapper, connection, target):
    history = get_history(target, "image_path")
    if history.has_changes():
        old_image_path = history.deleted[0] if history.deleted else None
        new_image_path = target.image_path
        delete_s3_object_task(old_image_path)


def user_image_path_delete_listener(mapper, connection, target):
    if target.image_path:
        delete_s3_object_task(target.image_path)


event.listen(User, "after_update", user_image_path_update_listener)
event.listen(User, "after_delete", user_image_path_delete_listener)