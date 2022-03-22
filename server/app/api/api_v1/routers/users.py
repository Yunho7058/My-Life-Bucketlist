from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    Body,
    Response,
    Cookie
)
from fastapi.security import OAuth2PasswordRequestForm 
from sqlalchemy.orm import Session

from app.api.dependencies import (
    get_db,
    get_current_user
)
from app.schemas.users import User, UserCreate, Token, UserLogin
from app.crud.users import (
    create_user, 
    authenticate, 
    get_user, 
    get_user_by_nickname
)
from app.core.config import settings
from app.core.security import (
    create_token, 
    get_kakao_token, 
    get_kakao_user_email
)
from app.utils.send_email import send_email_code



router = APIRouter(
    tags=["users"],
)


@router.post("/email", status_code=204, response_class=Response, responses={400: {}})
def check_email(response: Response, email: str = Body(..., embed=True), db: Session = Depends(get_db)):
    if get_user(db, email):
        raise HTTPException(status_code=400)
    try:
        code = send_email_code(email)
        response.set_cookie(key="email_code", value=code, max_age=600, httponly=True)
    except:
        raise HTTPException(status_code=400)
    return


@router.post("/email/code", status_code=204, response_class=Response, responses={400: {}})
def check_email_code(response: Response, code: str = Body(..., embed=True), email_code: str | None = Cookie(None)):
    if code and email_code and code == email_code:
        response.delete_cookie("email_code")
        return
    raise HTTPException(status_code=400)


@router.post("/nickname", status_code=204, response_class=Response, responses={400: {}})
def check_nickname(nickname: str = Body(..., embed=True), db: Session = Depends(get_db)):
    if get_user_by_nickname(db, nickname):
        raise HTTPException(status_code=400)
    return


@router.post("/signup", status_code=201, response_class=Response, responses={400: {}})
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if get_user(db, user.email):
        raise HTTPException(status_code=400)
    create_user(db, user)
    return


@router.post("/login", response_model=Token, responses={401: {}})
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate(db=db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_token(user.email)
    refresh_token = token.pop("refresh_token")
    response.set_cookie("refresh_token", refresh_token, max_age=settings.REFRESH_TOKEN_EXPIRE_MINUTES*60)
    return token


@router.get("/logout", status_code=204, response_class=Response, responses={401: {}})
def logout(response: Response, user: User = Depends(get_current_user)):
    response.delete_cookie("refresh_token")
    return


@router.get("/me", response_model=User)
def get_current_user_info(user: User = Depends(get_current_user)):
    return user


# @router.post("/token/kakao", response_model=Token)
# def kakao_login(code: str = Body(...)):
#     response = get_kakao_token(code)
#     data = response.json()
#     if response.status_code != 200:
#         raise HTTPException(status_code=400)
#     response = get_kakao_user_email(data.get("access_token"))
#     data = response.json()
#     if response.status_code != 200:
#         raise HTTPException(status_code=400)
#     print("========================response")
#     print(data)
#     print(response.status_code)
#     return 



