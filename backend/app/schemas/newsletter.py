from pydantic import BaseModel, EmailStr, Field


class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr = Field(..., max_length=255)


class NewsletterSubscribeResponse(BaseModel):
    message: str
