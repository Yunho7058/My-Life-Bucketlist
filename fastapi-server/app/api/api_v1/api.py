from fastapi import APIRouter

from .routers import users


router = APIRouter(prefix="/api")

router.include_router(users.router)
