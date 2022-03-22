from pydantic import BaseModel


class UserBase(BaseModel):
    email: str 
    nickname: str 


class UserCreate(UserBase):
    password: str 

    class Config:
        schema_extra = {
            "example": {
                "email": "coco@example.com",
                "password": "qwer1234",
                "nickname": "코코",
            }
        }


class User(UserBase):
    id: int 

    class Config:
        orm_mode = True


class RefreshToken(BaseModel):
    refresh_token: str


class Token(RefreshToken):
    access_token: str
    token_type: str
