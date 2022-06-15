from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


SQLALCHEMY_DATABASE_URL = f"mysql://{settings.DATABASE_USERNAME}:{settings.DATABASE_PASSWORD}@{settings.DATABASE_HOST}:3306/{settings.DATABASE_NAME}?charset=utf8"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_recycle=3600
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()