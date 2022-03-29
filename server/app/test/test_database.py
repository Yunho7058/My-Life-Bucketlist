from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from app.db.database import Base
from app.main import app
from app.api.dependencies import get_db
from app.core.config import settings


SQLALCHEMY_DATABASE_URL = f"mysql://{settings.DATABASE_USERNAME}:{settings.DATABASE_PASSWORD}@{settings.DATABASE_HOST}:3306/coco_test_database?charset=utf8"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db