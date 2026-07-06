from pydantic import BaseModel


class NewsletterSubscribeRequest(BaseModel):
    email: str


class NewsletterSubscribeResponse(BaseModel):
    message: str
