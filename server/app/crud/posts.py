from sqlalchemy.orm import Session
from datetime import datetime
from pytz import timezone

from app.models.posts import Post, Bucketlist
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
    db_post.updated_at = datetime.now(timezone("Asia/Seoul"))
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