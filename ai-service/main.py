import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Request, Header
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="MindSutra AI Wellness Guidance Microservice", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

INTERNAL_API_KEY = os.getenv("AI_INTERNAL_API_KEY", "")

WELLNESS_DISCLAIMERS = {
    "en": "AI-Generated Wellness Guidance: MindSutra provides mindfulness education and relaxation suggestions only. It does not diagnose, treat, or replace professional mental healthcare.",
    "kn": "AI-ರಚಿತ ಯೋಗಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನ: MindSutra ವಿಶ್ರಾಂತಿ ಮತ್ತು ಧ್ಯಾನ ಸಲಹೆಗಳನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ. ಇದು ವೃತ್ತಿಪರ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಚಿಕಿತ್ಸೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.",
    "hi": "AI-जनित वेलनेस मार्गदर्शन: MindSutra केवल ध्यान और विश्राम के सुझाव देता है। यह पेशेवर मानसिक स्वास्थ्य देखभाल का विकल्प नहीं है।"
}

class ChatRequest(BaseModel):
    user_message: str = Field(..., min_length=1, max_length=1000)
    language: str = Field(default="en", pattern="^(en|kn|hi|ta|te|ml|mr|bn|gu|pa)$")
    experience_level: str = Field(default="BEGINNER")
    primary_goal: str = Field(default="Stress Relief")

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "mindsutra-ai"}

@app.post("/api/ai/chat")
@limiter.limit("20/minute")
async def wellness_chat(request: Request, payload: ChatRequest, x_internal_key: Optional[str] = Header(default=None)):
    if INTERNAL_API_KEY and x_internal_key != INTERNAL_API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized internal service call")
    lang = payload.language if payload.language in WELLNESS_DISCLAIMERS else "en"
    return {
        "reply": f"Based on your {payload.primary_goal} goal, try 4 cycles of Box Breathing followed by a 10-minute guided session.",
        "is_ai_generated": True,
        "disclaimer": WELLNESS_DISCLAIMERS[lang]
    }
