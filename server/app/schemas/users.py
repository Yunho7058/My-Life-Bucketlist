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
    image_path: str | None

    class Config:
        orm_mode = True


class UserWithPostId(User):
    post_id: int
    


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class PostId(BaseModel):
    id: int
    is_public: bool

    class Config:
        orm_mode = True
