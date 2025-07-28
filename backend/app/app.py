from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import detect, rephrase, grammar


app = FastAPI(
    title="Verbo Backend",
    description="Backend for Verbo Chrome Extension to detect and rephrase AI-generated text",
    version="1.0.0"
)

# CORS Setup
origins = [
    "http://localhost:8080",  # for local Vite frontend
    "https://verbo-ai.vercel.app",
    "*",  # production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(detect.router, prefix="/api", tags=["AI Detection"])
app.include_router(rephrase.router, prefix="/api", tags=["Rephrasing"])
app.include_router(grammar.router, prefix="/api")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Verbo Backend API."}