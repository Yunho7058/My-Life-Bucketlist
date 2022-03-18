from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm 
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.api.dependencies import (
    get_db, oauth2_scheme, 
    get_current_user, 
    get_current_user_by_refresh_token
)
from app.schemas.users import User, UserCreate, Token
from app.crud.users import create_user, authenticate, get_user
from app.core.security import (
    create_token, 
    get_kakao_token, 
    get_kakao_user_email
)
from app.core.config import settings


router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/signup", status_code=201, response_model=User)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if get_user(db, user.username):
        raise HTTPException(status_code=400, detail="username is already existed")
    db_user = create_user(db, user)
    return db_user


@router.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate(db=db, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return create_token(user.username)


@router.post("/token/kakao", response_model=Token)
def kakao_login(code: str = Body(...)):
    response = get_kakao_token(code)
    data = response.json()
    if response.status_code != 200:
        raise HTTPException(status_code=400)
    response = get_kakao_user_email(data.get("access_token"))
    data = response.json()
    if response.status_code != 200:
        raise HTTPException(status_code=400)
    print("========================response")
    print(data)
    print(response.status_code)
    return 


@router.post("/token/refresh", response_model=Token)
def refresh_token(user: User = Depends(get_current_user_by_refresh_token)):
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return create_token(user.username)


@router.get("/me", response_model=User)
def get_current_user_info(user: User = Depends(get_current_user)):
    return user