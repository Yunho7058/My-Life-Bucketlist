from sqlalchemy.orm import Session

from app.models.users import User
from app.schemas.users import UserCreate
from app.core.security import get_password_hash, verify_password


def create_user(db: Session, user: UserCreate):
    password = get_password_hash(user.password)
    db_user = User(
        email=user.email, 
        nickname=user.nickname, 
        password=password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    return user


def get_user_by_nickname(db: Session, nickname: str):
    user = db.query(User).filter(User.nickname == nickname).first()
    return user


def authenticate(db: Session, email: str, password: str):
    user = get_user(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user
