from app.db.database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends
from jose import JWTError
from sqlalchemy.orm import Session
from app.crud.users import get_user
from app.core.security import decode_token


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


credentials_exception = HTTPException(
    status_code=401,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def authenticate_by_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email


def get_current_user(email: str = Depends(authenticate_by_token), db: Session = Depends(get_db)):
    user = get_user(db, email)
    if user is None:
        raise credentials_exception
    return user
