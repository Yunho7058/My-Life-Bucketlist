from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, authenticate_by_token, get_current_user
from app.models.users import User
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
    user = get_user(db, email)
    if user:
        post.like = user.id in post.likes
        post.bookmark = user.id in post.bookmarks
        post.owner = user.id == post.user.id
    else:
        post.like = False
        post.bookmark = False
        post.owner = False
    return post


@router.put("/bucketlist", status_code=204, responses={400: {}, 401: {}, 403: {}})
def put_bucketlist(post : schemas.PostBase, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not post.title:
        raise HTTPException(400)
    crud.update_post(db, user.post.id, post.title)
    for bucketlist in post.bucketlist:
        if not bucketlist.content:
            raise HTTPException(400)
        if not bucketlist.id:
            crud.create_bucketlist(db, bucketlist, user.post.id)
        else:
            db_bucketlist = crud.get_bucketlist(db, bucketlist.id)
            if db_bucketlist.post.id != user.post.id:
                raise HTTPException(403)
            crud.update_bucketlist(db, db_bucketlist, bucketlist)
    return


@router.delete("/bucketlist/{bucketlist_id}", status_code=204, responses={401: {}, 403: {}, 404: {}})
def delete_bucketlist(bucketlist_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bucketlist = crud.get_bucketlist(db, bucketlist_id)
    if bucketlist is None:
        raise HTTPException(404)
    if bucketlist.post.id != user.post.id:
        raise HTTPException(403)
    crud.delete_bucketlist(db, bucketlist)
    return
