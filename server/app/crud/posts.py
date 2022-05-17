from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.users import User
from app.models.posts import Post, Bucketlist, Comment, Like, Bookmark
from app.schemas import posts as schemas



def get_post_list(db: Session, last_id: int | None):
    size = 20
    if last_id is None:
        return db.query(Post).filter(Post.is_public == True).order_by(desc(Post.id)).limit(size).all()
    return db.query(Post).filter(Post.is_public == True, Post.id < last_id).order_by(desc(Post.id)).limit(size).all()


def get_post_detail(db: Session, post_id: int):
    return db.get(Post, post_id)


def create_post(db: Session, user_id: int):
    db_post = Post(user_id=user_id)
    db.add(db_post)
    db.commit()
    return


def update_post_public(db: Session, post_id: int):
    db_post = db.get(Post, post_id)
    db_post.is_public = not(db_post.is_public)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_bucketlist(db: Session, bucketlist_id: int):
    return db.get(Bucketlist, bucketlist_id)


def create_bucketlist(db: Session, bucketlist: schemas.Bucketlist, post_id: int):
    db_bucketlist = Bucketlist(
        **bucketlist.dict(),
        post_id=post_id
    )
    db.add(db_bucketlist)
    db.commit()
    db.refresh(db_bucketlist)
    return db_bucketlist


def update_bucketlist(db: Session, db_bucketlist: Bucketlist, bucketlist: schemas.Bucketlist):
    db_bucketlist.content = bucketlist.content
    if bucketlist.detail:
        db_bucketlist.detail = bucketlist.detail
    if bucketlist.image_path:
        db_bucketlist.image_path = bucketlist.image_path
    db.commit()
    return


def delete_bucketlist(db: Session, bucketlist: Bucketlist):
    db.delete(bucketlist)
    db.commit()
    return


def get_comment(db: Session, comment_id: int):
    return db.get(Comment, comment_id)


def get_comment_list(db: Session, post_id: int, last_id: int | None):
    size = 20
    if last_id is None:
        return db.query(Comment).filter_by(post_id = post_id).order_by(Comment.id).limit(size).all()
    return db.query(Comment).filter(Comment.post_id == post_id, Comment.id > last_id).order_by(Comment.id).limit(size).all()


def create_comment(db: Session, content: str, user_id: int, post_id: int):
    comment = Comment(
        content=content,
        user_id=user_id,
        post_id=post_id
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def update_comment(db: Session, content: str, db_comment: Comment):
    db_comment.content = content
    db.commit()
    db.refresh(db_comment)
    return db_comment


def delete_comment(db: Session, db_comment: Comment):
    db.delete(db_comment)
    db.commit()
    return


def get_like(db: Session, post_id: int, user_id: int):
    return db.get(Like, {"post_id": post_id, "user_id": user_id})


def create_like(db: Session, post_id: int, user_id: int):
    like = Like(
        post_id=post_id,
        user_id=user_id,
        state=True
    )
    db.add(like)
    db.commit()
    return


def update_like(db: Session, db_like: Like):
    db_like.state = not(db_like.state)
    db.commit()
    return


def get_bookmark(db: Session, post_id: int, user_id: int):
    return db.get(Bookmark, {"post_id": post_id, "user_id": user_id})


def create_bookmark(db: Session, post_id: int, user_id: int):
    bookmark = Bookmark(
        post_id=post_id,
        user_id=user_id,
        state=True
    )
    db.add(bookmark)
    db.commit()
    return


def update_bookmark(db: Session, db_bookmark: Bookmark):
    db_bookmark.state = not(db_bookmark.state)
    db.commit()
    return


def get_bookmarked_post_list(db: Session, user: User):
    return db.query(Post).select_from(user.bookmarks.filter_by(state=True).subquery()).join(Bookmark.post).all()
