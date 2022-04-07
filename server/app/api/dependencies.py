from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends, Request
from sqlalchemy.orm import Session

from app.crud.users import get_user
from app.core.security import decode_token


def get_db(request: Request):
    return request.state.db


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", auto_error=False)


credentials_exception = HTTPException(
    status_code=401,
    detail="Not authenticated",
    headers={"WWW-Authenticate": "Bearer"},
)


def authenticate_by_token(token: str = Depends(oauth2_scheme)):
    return decode_token(token)


def get_current_user(email: str = Depends(authenticate_by_token), db: Session = Depends(get_db)):
    if not email:
        raise credentials_exception
    user = get_user(db, email)
    if user is None:
        raise credentials_exception
    return user
