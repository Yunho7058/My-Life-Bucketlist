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
    get_current_user, 
    get_current_user_by_refresh_token
)
from app.schemas.users import User, UserCreate, Token
from app.crud.users import (
    create_user, 
    authenticate, 
    get_user, 
    get_user_by_nickname
)
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


# @router.post("/token", response_model=Token)
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate(db=db, username=form_data.username, password=form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=401,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     return create_token(user.username)


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


# @router.post("/token/refresh", response_model=Token)
# def refresh_token(user: User = Depends(get_current_user_by_refresh_token)):
#     if not user:
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid refresh token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     return create_token(user.username)


# @router.get("/me", response_model=User)
# def get_current_user_info(user: User = Depends(get_current_user)):
#     return user
