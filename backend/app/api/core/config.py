# app/core/config.py

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

def setup_cors(app: FastAPI):
    """
    Configure CORS settings for development and frontend integration.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Change this in production to a specific domain like ["https://verbo-ai.vercel.app"]
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
