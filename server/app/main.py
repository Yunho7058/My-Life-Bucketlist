from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from app.api.api_v1.api import router
from app.db.base import Base
from app.db.database import engine, SessionLocal
from app.core.config import settings


Base.metadata.create_all(bind=engine)

app = FastAPI(
    docs_url="/api/docs", 
    redoc_url=None, 
    openapi_url="/api/openapi.json",
    title="MLB",
)

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=settings.ALLOW_CREDENTIALS,
    allow_methods=settings.ALLOW_METHODS,
    allow_headers=settings.ALLOW_HEADERS,
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response