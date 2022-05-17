from pydantic import BaseModel
import datetime


class CommentOut(BaseModel):
    id: int
    updated_at: datetime.datetime


class Comment(CommentOut):
    user_id: int
    nickname: str 
    content: str 

    class Config:
        orm_mode = True


class BucketlistOut(BaseModel):
    id: int


class BucketlistIn(BaseModel):
    content: str 
    detail:str | None = None
    image_path: str | None = None

    class Config:
        orm_mode = True

    
class Bucketlist(BucketlistIn, BucketlistOut):
    pass


class PostBase(BaseModel):
    updated_at: datetime.datetime | None = None

    class Config:
        orm_mode = True


class Post(PostBase):
    id: int 
    nickname: str 
    bucketlist: list[Bucketlist] = []
    like_count: int 


class PostDetail(Post):
    owner: bool 
    bookmark: bool 
    like: bool 
    is_public: bool
