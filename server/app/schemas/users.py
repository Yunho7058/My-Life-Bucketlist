from pydantic import BaseModel


class UserBase(BaseModel):
    email: str 
    nickname: str 
    domain: str | None = None


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


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
