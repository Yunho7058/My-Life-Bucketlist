from pydantic import BaseModel


class UserBase(BaseModel):
    username: str 
    name: str 
    email: str 


class UserCreate(UserBase):
    password: str 

    class Config:
        schema_extra = {
            "example": {
                "username": "user1",
                "password": "qwer1234",
                "name": "kimcoco",
                "email": "user1@example.com",
            }
        }


class User(UserBase):
    id: int 

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str