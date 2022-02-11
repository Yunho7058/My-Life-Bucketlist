from datetime import datetime, timedelta
import requests
from passlib.context import CryptContext
from jose import jwt
from .config import settings



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expire_delta: timedelta | None = None):
    to_encode = data.copy()
    if expire_delta:
        expire = datetime.utcnow() + expire_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict):
    return create_access_token(data, timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES))


def create_token(username: str):
    access_token = create_access_token(
        data={"sub": username}
    )
    refresh_token = create_refresh_token(
        data={"sub": username}
    )
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


def decode_token(token: str):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])


def get_kakao_token(code):
    url = "https://kauth.kakao.com/oauth/token"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": settings.KAKAO_CLIENT_ID,
        "redirect_uri": settings.KAKAO_REDIRECT_URI
    }
    response = requests.post(url)
    return response