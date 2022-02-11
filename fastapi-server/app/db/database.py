from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


SQLALCHEMY_DATABASE_URL = f"mysql://{settings.DATABASE_NAME}:{settings.DATABASE_PASSWORD}@localhost:3306/coco_database"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()