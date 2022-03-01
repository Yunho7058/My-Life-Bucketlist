from sqlalchemy.orm import Session
from fastapi import Depends

from app.models.users import User
from app.schemas.users import UserCreate
from app.core.security import get_password_hash, verify_password


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username, 
        name=user.name, 
        email=user.email, 
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, username: str):
    user = db.query(User).filter(User.username == username).first()
    return user


def authenticate(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
