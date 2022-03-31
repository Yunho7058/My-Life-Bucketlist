from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from fastapi.security import OAuth2PasswordBearer
from fastapi import Request, Depends

from app.db.database import Base
from app.main import app
from app.api.dependencies import get_db, authenticate_by_token, oauth2_scheme
from app.core.config import settings


# database
SQLALCHEMY_DATABASE_URL = f"mysql://{settings.DATABASE_USERNAME}:{settings.DATABASE_PASSWORD}@{settings.DATABASE_HOST}:3306/coco_test_database?charset=utf8"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)


# dependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


class OAuth2PasswordBearerTest(OAuth2PasswordBearer):
    async def __call__(self, request: Request):
        authorization: str = request.headers.get("Authorization", "")
        return authorization


override_oauth2_scheme = OAuth2PasswordBearerTest(tokenUrl="login", auto_error=False)


def override_authenticate_by_token(token: str = Depends(oauth2_scheme)):
    if token[:6] == "Bearer":
        return "test@example.com"
    return ""


app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[oauth2_scheme] = override_oauth2_scheme
app.dependency_overrides[authenticate_by_token] = override_authenticate_by_token
