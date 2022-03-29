from sqlalchemy.orm import Session

from app.models.posts import Post



def get_post_list(db: Session):
    return db.query(Post).all()


def create_post(db: Session, user_id: int):
    db_post = Post(user_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_post_detail(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()