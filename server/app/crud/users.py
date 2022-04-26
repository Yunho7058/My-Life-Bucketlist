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


def get_user_by_id(db: Session, user_id: int):
    user = db.get(User, user_id)
    return user


def update_user_nickname(db: Session, user_id: int, nickname: str):
    user = db.get(User, user_id)
    user.nickname = nickname
    db.commit()
    return


def update_user_password(db: Session, user_id: int, password: str):
    user = db.get(User, user_id)
    user.password = get_password_hash(password)
    db.commit()
    return