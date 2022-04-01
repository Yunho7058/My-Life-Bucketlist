from fastapi import APIRouter, Depends, HTTPException, Body, Response
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, authenticate_by_token, get_current_user
from app.models.users import User
from app.crud.users import get_user
from app.crud import posts as crud
from app.schemas import posts as schemas


router = APIRouter(
    tags=["posts"]
)


@router.get("/post", response_model=list[schemas.Post], summary="게시글 목록 조회")
def get_post_list(db: Session = Depends(get_db)):
    posts = crud.get_post_list(db)
    for post in posts:
        post.nickname = post.user.nickname
        post.like_count = len(post.likes)
    return posts


@router.get("/post/{post_id}", response_model=schemas.PostDetail, summary="게시글 상세 조회")
def get_post_detail(post_id: int, email: str = Depends(authenticate_by_token), db: Session = Depends(get_db)):
    """
    header에 토큰이 없어도 게시글 상세 조회는 가능하지만 response의 **owner** 값은 false로 응답한다.
    """
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


@router.put("/bucketlist", status_code=204, responses={400: {}, 401: {}, 403: {}}, summary="버킷리스트 추가 및 수정")
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


@router.delete("/bucketlist/{bucketlist_id}", status_code=204, responses={401: {}, 403: {}, 404: {}}, summary="버킷리스트 삭제")
def delete_bucketlist(bucketlist_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bucketlist = crud.get_bucketlist(db, bucketlist_id)
    if bucketlist is None:
        raise HTTPException(404)
    if bucketlist.post.id != user.post.id:
        raise HTTPException(403)
    crud.delete_bucketlist(db, bucketlist)
    return


@router.get("/comment/{post_id}", response_model=list[schemas.Comment], summary="댓글 목록 조회")
def get_comment_list(post_id: int, page: int = 1, db: Session = Depends(get_db)):
    """
    **설명**
    - post_id와 page를 받아 해당 게시글의 댓글 목록을 응답
    - 페이지당 20개의 댓글 응답

    **Path**
    - post_id: 댓글목록을 조회하려는 게시글의 id

    **query**
    - page: 댓글 페이지 숫자로 기본값은 1
    """
    comments = crud.get_comment_list(db, post_id, page)
    for comment in comments:
        comment.nickname = comment.user.nickname
    return comments


@router.post("/comment/{post_id}", status_code=201, response_class=Response, responses={400: {}, 401: {}, 404: {}}, summary="댓글 생성")
def create_comment(post_id: int, content: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not content:
        raise HTTPException(400)
    post = crud.get_post_detail(db, post_id)
    if post is None:
        raise HTTPException(404)
    crud.create_comment(db, content, user.id, post.id)
    return


@router.patch("/comment/{comment_id}", status_code=204, responses={400: {}, 401: {}, 403: {}, 404: {}}, summary="댓글 수정")
def update_comment(comment_id: int, content: str = Body(..., embed=True), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not content:
        raise HTTPException(400)
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(404)
    if comment.user.id != user.id:
        raise HTTPException(403)
    crud.update_comment(db, content, comment)
    return


@router.delete("/comment/{comment_id}", status_code=204, responses={401: {}, 403: {}, 404: {}}, summary="댓글 삭제")
def delete_comment(comment_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(404)
    if comment.user.id != user.id:
        raise HTTPException(403)
    crud.delete_comment(db, comment)
    return
