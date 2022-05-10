from pydantic import BaseSettings


class Settings(BaseSettings):
    DATABASE_USERNAME: str
    DATABASE_PASSWORD: str
    DATABASE_NAME: str
    DATABASE_HOST: str

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    ALLOW_ORIGINS: list[str] = [
        "http://localhost:3000",
    ]
    ALLOW_CREDENTIALS: bool = True
    ALLOW_METHODS: list[str] = ["*"]
    ALLOW_HEADERS: list[str] = ["*"]

    NAVER_ID: str 
    NAVER_PASSWORD: str

    DOMAIN: str

    ISSUER: str
    AUDIENCE: str 

    AWS_API_GATEWAY_URL: str
    AWS_AUTH_KEY: str

    KAKAO_CLIENT_ID: str
    KAKAO_REDIRECT_URI: str

    NAVER_CLIENT_ID: str
    NAVER_CLIENT_SECRET: str

    class Config:
        env_file = "app/.env"


settings = Settings()