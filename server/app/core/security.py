from datetime import datetime, timedelta
import requests
from passlib.context import CryptContext
from jose import jwt, JWTError

from app.core.config import settings



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expire_delta: timedelta | None = None):
    to_encode = data.copy()
    now = datetime.utcnow()
    if expire_delta:
        expire = now + expire_delta
    else:
        expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    to_encode.update({"iat": now})
    to_encode.update({"nbf": now})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict):
    return create_access_token(data, timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES))


def create_token(email: str):
    data = {
        "sub": email,
        "iss": settings.ISSUER,
        "aud": settings.AUDIENCE,
    }
    access_token = create_access_token(
        data=data
    )
    refresh_token = create_refresh_token(
        data=data
    )
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


def decode_token(token: str):
    if not token:
        return ""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM], issuer=settings.ISSUER, audience=settings.AUDIENCE)
        email: str = payload.get("sub")
    except JWTError:
        return ""
    return email


def get_kakao_token(code):
    url = "https://kauth.kakao.com/oauth/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": settings.KAKAO_CLIENT_ID,
        "redirect_uri": settings.KAKAO_REDIRECT_URI
    }
    response = requests.post(url, headers=headers, data=data)
    return response


def get_kakao_user_email(token):
    url = "https://kapi.kakao.com/v2/user/me"
    headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data ='property_keys=["properties.nickname","properties.profile_image","kakao_account.email"]'
    response = requests.post(url, headers=headers, data=data)
    return response
