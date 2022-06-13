from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
import requests
from base64 import b64encode

from app.api.dependencies import get_db, authenticate_by_token, get_current_user
from app.core.config import settings
from app.core.aws_boto3 import generate_presigned_post
from app.crud.users import get_user
from app.crud import posts as crud
from app.models.users import User
from app.schemas import posts as schemas
from app.schemas.common import PresignedPost


router = APIRouter()


@router.get("/post", response_model=list[schemas.Post], summary="게시글 목록 조회", tags=["버킷리스트"])
def get_post_list(last_id: int | None = None, nickname: str | None = None, db: Session = Depends(get_db)):
    """
    **설명**
    - 전체 게시글 중 최근 20개를 응답
    - last_id가 주어지면 그 다음 20개의 게시글을 응답
    - nickname이 주어지면 게시글의 닉네임에 nickname을 포함하고 있는 게시글의 목록을 응답

    **query**
    - last_id: 마지막 게시글의 id
    - nickname: 검색한 닉네임
    """
    posts = crud.get_post_list(db, last_id, nickname)
    for post in posts:
        post.bucketlist = post.bucketlist[:3]
    return posts


@router.patch("/post", status_code=204, responses={401: {}}, summary="게시글 공개/비공개 변경", tags=["버킷리스트"])
def update_public(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    crud.update_post_public(db, user.post.id)
    return


@router.get("/post/{post_id}", response_model=schemas.PostDetail, summary="게시글 상세 조회", tags=["버킷리스트"])
def get_post_detail(post_id: int, email: str = Depends(authenticate_by_token), db: Session = Depends(get_db)):
    """
    header에 토큰이 없어도 게시글 상세 조회는 가능하지만 response의 **owner** 값은 false로 응답한다.
    """
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(status_code=404)
    user = get_user(db, email)
    if user:
        if user.id != post.user_id and not post.is_public:
            raise HTTPException(status_code=403)
        like = crud.get_like(db, post.id, user.id)
        post.like = like.state if like else False
        bookmark = crud.get_bookmark(db, post.id, user.id)
        post.bookmark = bookmark.state if bookmark else False
        post.owner = user.id == post.user.id
    else:
        if not post.is_public:
            raise HTTPException(status_code=401)
        post.like = False
        post.bookmark = False
        post.owner = False
    return post


@router.post("/bucketlist", status_code=200, response_model=schemas.BucketlistOut, responses={401: {}}, summary="버킷리스트 생성", tags=["버킷리스트"])
def create_bucketlist(bucketlist: schemas.BucketlistIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bucketlist = crud.create_bucketlist(db, bucketlist, user.post.id)
    return {"id": bucketlist.id}


@router.put("/bucketlist/{bucketlist_id}", status_code=204, responses={401: {}, 403: {}, 404: {}}, summary="버킷리스트 수정", tags=["버킷리스트"])
def update_bucketlist(bucketlist_id: int, bucketlist: schemas.BucketlistIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_bucketlist = crud.get_bucketlist(db, bucketlist_id)
    if db_bucketlist is None:
        raise HTTPException(status_code=404)
    if db_bucketlist.post_id != user.post.id:
        raise HTTPException(status_code=403)
    crud.update_bucketlist(db, db_bucketlist, bucketlist)
    return


@router.delete("/bucketlist/{bucketlist_id}", status_code=204, responses={400: {}, 401: {}, 403: {}, 404: {}}, summary="버킷리스트 삭제", tags=["버킷리스트"])
def delete_bucketlist(bucketlist_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bucketlist = crud.get_bucketlist(db, bucketlist_id)
    if bucketlist is None:
        raise HTTPException(status_code=404)
    if bucketlist.post_id != user.post.id:
        raise HTTPException(status_code=403)
    if len(user.post.bucketlist) <= 1:
        raise HTTPException(status_code=400)
    crud.delete_bucketlist(db, bucketlist)
    return


@router.get("/comment/{post_id}", response_model=list[schemas.Comment], summary="댓글 목록 조회", tags=["댓글"])
def get_comment_list(post_id: int, db: Session = Depends(get_db)):
    comments = crud.get_comment_list(db, post_id)
    return comments


@router.post("/comment/{post_id}", status_code=200, response_model=schemas.CommentOut, responses={400: {}, 401: {}, 404: {}}, summary="댓글 생성", tags=["댓글"])
def create_comment(post_id: int, content: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not content:
        raise HTTPException(status_code=400)
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(status_code=404)
    comment = crud.create_comment(db, content, user.id, post.id)
    return {"id": comment.id, "updated_at": comment.updated_at}


@router.patch("/comment/{comment_id}", status_code=200, response_model=schemas.CommentOut, responses={400: {}, 401: {}, 403: {}, 404: {}}, summary="댓글 수정", tags=["댓글"])
def update_comment(comment_id: int, content: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not content:
        raise HTTPException(status_code=400)
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(status_code=404)
    if comment.user.id != user.id:
        raise HTTPException(status_code=403)
    comment = crud.update_comment(db, content, comment)
    return {"id": comment.id, "updated_at": comment.updated_at}


@router.delete("/comment/{comment_id}", status_code=204, responses={401: {}, 403: {}, 404: {}}, summary="댓글 삭제", tags=["댓글"])
def delete_comment(comment_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(status_code=404)
    if comment.user.id != user.id:
        raise HTTPException(status_code=403)
    crud.delete_comment(db, comment)
    return


@router.put("/like/{post_id}", status_code=204, responses={401: {}, 404: {}}, summary="좋아요 상태 변경", tags=["좋아요"])
def push_like(post_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(status_code=404)
    like = crud.get_like(db, post_id, user.id)
    if like is None:
        crud.create_like(db, post_id, user.id)
    else:
        crud.update_like(db, like)
    return


@router.put("/bookmark/{post_id}", status_code=204, responses={401: {}, 404: {}}, summary="북마크 상태 변경", tags=["북마크"])
def push_bookmark(post_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(status_code=404)
    bookmark = crud.get_bookmark(db, post.id, user.id)
    if bookmark is None:
        crud.create_bookmark(db, post.id, user.id)
    else:
        crud.update_bookmark(db, bookmark)
    return 


@router.get("/bookmark", response_model=list[schemas.Post], summary="북마크한 게시글 목록 조회", tags=["북마크"])
def get_bookmarked_post_list(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bookmarked_posts = crud.get_bookmarked_post_list(db, user)
    return bookmarked_posts


@router.get("/bucketlist/presigned-post", response_model=PresignedPost, summary="S3에 버킷리스트 이미지 업로드를 위한 Presigned POST 요청", tags=["버킷리스트"])
def get_presigned_post(file_name: str, user: User = Depends(get_current_user)):
    presigned_post = generate_presigned_post("bucketlist", file_name, user.id)
    return presigned_post
