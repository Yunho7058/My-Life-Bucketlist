from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, authenticate_by_token
from app.crud.users import get_user
from app.crud import posts as crud
from app.schemas import posts as schemas


router = APIRouter(
    tags=["posts"]
)


@router.get("/post", response_model=list[schemas.Post])
def get_post_list(db: Session = Depends(get_db)):
    posts = crud.get_post_list(db)
    for post in posts:
        post.nickname = post.user.nickname
        post.like_count = len(post.likes)
    return posts


@router.get("/post/{post_id}", response_model=schemas.PostDetail)
def get_post_detail(post_id: int, email: str = Depends(authenticate_by_token), db: Session = Depends(get_db)):
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(404)
    post.nickname = post.user.nickname
    post.like_count = len(post.likes)
    post.like = False
    post.bookmark = False
    post.owner = False
    user = get_user(db, email)
    if user:
        post.like = user.id in post.likes
        post.bookmark = user.id in post.bookmarks
        post.owner = user.id == post.user.id
    return post


