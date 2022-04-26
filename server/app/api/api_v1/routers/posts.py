from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
import requests
from base64 import b64encode

from app.api.dependencies import get_db, authenticate_by_token, get_current_user
from app.core.config import settings
from app.models.users import User
from app.crud.users import get_user
from app.crud import posts as crud
from app.schemas import posts as schemas


router = APIRouter()


@router.get("/post", response_model=list[schemas.Post], summary="게시글 목록 조회", tags=["버킷리스트"])
def get_post_list(last_id: int | None = None, db: Session = Depends(get_db)):
    """
    **설명**
    - 전체 게시글 중 최근 20개를 응답
    - last_id가 주어지면 그 다음 20개의 게시글을 응답

    **query**
    - last_id: 마지막 게시글의 id
    """
    posts = crud.get_post_list(db, last_id)
    for post in posts:
        post.nickname = post.user.nickname
        post.bucketlist = post.bucketlist[:3]
    return posts


@router.get("/post/{post_id}", response_model=schemas.PostDetail, summary="게시글 상세 조회", tags=["버킷리스트"])
def get_post_detail(post_id: int, email: str = Depends(authenticate_by_token), db: Session = Depends(get_db)):
    """
    header에 토큰이 없어도 게시글 상세 조회는 가능하지만 response의 **owner** 값은 false로 응답한다.
    """
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(status_code=404)
    post.nickname = post.user.nickname
    user = get_user(db, email)
    if user:
        like = crud.get_like(db, post.id, user.id)
        post.like = like.state if like else False
        bookmark = crud.get_bookmark(db, post.id, user.id)
        post.bookmark = bookmark.state if bookmark else False
        post.owner = user.id == post.user.id
    else:
        post.like = False
        post.bookmark = False
        post.owner = False
    return post


@router.patch("/post/{post_id}", response_model=schemas.PostBase, responses={400: {}, 401: {}, 403: {}, 404: {}}, summary="게시글 제목 수정", tags=["버킷리스트"])
def update_post_title(post_id: int, title: str = Body(..., embed=True), user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    title = title.strip()
    if not title:
        raise HTTPException(status_code=400)
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(status_code=404)
    if post.id != user.post.id:
        raise HTTPException(status_code=403)
    db_post = crud.update_post_title(db, post_id, title)
    return db_post


@router.put("/bucketlist", status_code=204, responses={400: {}, 401: {}, 403: {}}, summary="버킷리스트 추가 및 수정", tags=["버킷리스트"], deprecated=True)
def put_bucketlist(
    post : schemas.PostBase = Body(
        ...,
        examples={
            "버킷리스트 추가 및 수정": {
                "description": "id가 없는 '서핑하기' 항목은 추가되고 id가 있는 '등산하기' 항목은 수정된다.",
                "value": {
                    "title": "코코의 버킷리스트",
                    "bucketlist": [
                        {
                        "content": "서핑하기",
                        },
                        {
                        "id": 1,
                        "content": "등산하기",
                        "date": "2022-07-01",
                        "image_path": "image_path/image_file.jpg"
                        }
                    ]
                }
            },
            "버킷리스트 변경사항 없을 때 1": {
                "description": "bucketlist 없이 title만 줘도 됌",
                "value": {
                    "title": "코코의 버킷리스트"
                }
            },
            "버킷리스트 변경사항 없을 때 2": {
                "description": "bucketlist에 빈 리스트를 줘도 됌",
                "value": {
                    "title": "코코의 버킷리스트",
                    "bucketlist": []
                }
            },
        }
    ), 
    user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """
    **Body**
    - title: 게시글의 제목 (required)
    - bucketlist: 버킷리스트 항목들이 담겨있는 리스트
        - id: 버킷리스트 id
            - **id**가 없으면 새로운 버킷리스트를 추가
            - **id**가 있으면 기존의 버킷리스트를 수정
        - content: 버킷리스트 내용 (required)
        - date: 희망 날짜
        - image_path: 이미지파일 경로
    """
    if not post.title:
        raise HTTPException(status_code=400)
    crud.update_post(db, user.post.id, post.title)
    for bucketlist in post.bucketlist:
        if not bucketlist.content:
            raise HTTPException(status_code=400)
        if not bucketlist.id:
            crud.create_bucketlist(db, bucketlist, user.post.id)
        else:
            db_bucketlist = crud.get_bucketlist(db, bucketlist.id)
            if db_bucketlist.post_id != user.post.id:
                raise HTTPException(status_code=403)
            crud.update_bucketlist(db, db_bucketlist, bucketlist)
    return


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


@router.delete("/bucketlist/{bucketlist_id}", status_code=204, responses={401: {}, 403: {}, 404: {}}, summary="버킷리스트 삭제", tags=["버킷리스트"])
def delete_bucketlist(bucketlist_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bucketlist = crud.get_bucketlist(db, bucketlist_id)
    if bucketlist is None:
        raise HTTPException(status_code=404)
    if bucketlist.post_id != user.post.id:
        raise HTTPException(status_code=403)
    crud.delete_bucketlist(db, bucketlist)
    return


@router.get("/comment/{post_id}", response_model=list[schemas.Comment], summary="댓글 목록 조회", tags=["댓글"])
def get_comment_list(post_id: int, last_id: int | None = None, db: Session = Depends(get_db)):
    """
    **설명**
    - post_id를 받아 해당 게시글의 댓글 20개를 응답
    - last_id가 주어지면 그 다음 댓글 20개를 응답

    **Path**
    - post_id: 댓글목록을 조회하려는 게시글의 id

    **query**
    - last_id: 마지막 댓글의 id
    """
    comments = crud.get_comment_list(db, post_id, last_id)
    for comment in comments:
        comment.nickname = comment.user.nickname
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
    for post in bookmarked_posts:
        post.nickname = post.user.nickname
    return bookmarked_posts


@router.get("/presigned-post", summary="S3 이미지 업로드를 위한 Presigned POST 요청", tags=["버킷리스트"])
def get_presigned_post(file_name: str, user: User = Depends(get_current_user)):
    response = requests.post(
        f"{settings.AWS_API_GATEWAY_URL}/presigned-post",
        headers={"Authorization": settings.AWS_AUTH_KEY},
        json={"name": file_name}
    ).json()
    if response.get("error"):
        return response.get("message")
    return response.get("data")