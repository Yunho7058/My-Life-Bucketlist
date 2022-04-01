from sqlalchemy.orm import Session

from app.models.posts import Post, Bucketlist, Comment
from app.schemas import posts as schemas



def get_post_list(db: Session):
    return db.query(Post).all()


def get_post_detail(db: Session, post_id: int):
    return db.get(Post, post_id)


def create_post(db: Session, user_id: int):
    db_post = Post(user_id=user_id)
    db.add(db_post)
    db.commit()
    return


def update_post(db: Session, post_id: int, title: str):
    db_post = db.get(Post, post_id)
    db_post.title = title 
    db.commit()
    return


def get_bucketlist(db: Session, bucketlist_id: int):
    return db.get(Bucketlist, bucketlist_id)


def create_bucketlist(db: Session, bucketlist: schemas.Bucketlist, post_id: int):
    db_bucketlist = Bucketlist(
        **bucketlist.dict(),
        post_id=post_id
    )
    db.add(db_bucketlist)
    db.commit()
    return


def update_bucketlist(db: Session, db_bucketlist: Bucketlist, bucketlist: schemas.Bucketlist):
    db_bucketlist.content = bucketlist.content
    if bucketlist.date:
        db_bucketlist.date = bucketlist.date
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


def get_comment_list(db: Session, post_id: int, page: int):
    return db.query(Comment).filter_by(post_id = post_id).offset(20 * (page-1)).limit(20).all()


def create_comment(db: Session, content: str, user_id: int, post_id: int):
    comment = Comment(
        content=content,
        user_id=user_id,
        post_id=post_id
    )
    db.add(comment)
    db.commit()
    return


def update_comment(db: Session, content: str, db_comment: Comment):
    db_comment.content = content
    db.commit()
    return


def delete_comment(db: Session, db_comment: Comment):
    db.delete(db_comment)
    db.commit()
    return