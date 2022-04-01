from pydantic import BaseModel
import datetime



class Comment(BaseModel):
    id: int
    nickname: str 
    content: str 
    updated_at: datetime.datetime

    class Config:
        orm_mode = True


class Bucketlist(BaseModel):
    id: int | None = None
    content: str 
    date: datetime.date | None = None
    image_path: str | None = None

    class Config:
        orm_mode = True


class PostBase(BaseModel):
    title: str | None = None
    bucketlist: list[Bucketlist] = []


class Post(PostBase):
    id: int 
    nickname: str 
    updated_at: datetime.datetime | None = None
    like_count: int 

    class Config:
        orm_mode = True


class PostDetail(Post):
    owner: bool 
    bookmark: bool 
    like: bool 
