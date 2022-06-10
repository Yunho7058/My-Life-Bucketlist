from pydantic import BaseModel, Field


class HTTPError(BaseModel):
    detail: str

    class Config:
        schema_extra = {
            "example": {"detail": "HTTPException raised."},
        }


class PresignedPostField(BaseModel):
    key: str 
    x_amz_algorithm: str = Field(alias="x-amz-algorithm")
    x_amz_credential: str = Field(alias="x-amz-credential")
    x_amz_date: str = Field(alias="x-amz-date")
    policy: str
    x_amz_signature: str = Field(alias="x-amz-signature")
    
    class Config:
        allow_population_by_field_name = True


class PresignedPost(BaseModel):
    url: str
    fields: PresignedPostField