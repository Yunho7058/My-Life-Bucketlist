from pydantic import BaseModel


class Bucketlist(BaseModel):
    id: int 
    content: str 
    date: str 
    image_path: str 


class PostBase(BaseModel):
    title: str | None = None
    bucketlist: list[Bucketlist]


class Post(PostBase):
    id: int 
    nickname: str 
    updated_at: str | None = None
    like_count: int 

    class Config:
        orm_mode = True


class PostDetail(Post):
    owner: bool 
    bookmark: bool 
    like: bool 
