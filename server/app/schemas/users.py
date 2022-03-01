from pydantic import BaseModel, constr


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


class RefreshToken(BaseModel):
    refresh_token: str


class Token(RefreshToken):
    access_token: str
    token_type: str
