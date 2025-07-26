# Use slim Python image to keep size minimal
FROM python:3.10-slim

# Set env vars
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TRANSFORMERS_CACHE=/tmp/hf_cache \
    HF_HOME=/tmp/hf_cache

# Create app directory
WORKDIR /app

# Install basic system dependencies (only what's needed)
RUN apt-get update && apt-get install -y \
    build-essential gcc wget curl git \
 && rm -rf /var/lib/apt/lists/*

# Install pip packages efficiently
COPY requirements.txt .

# Create virtualenv to isolate deps
RUN python -m venv /opt/venv \
 && . /opt/venv/bin/activate \
 && pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Copy only the necessary source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Use virtualenv and run uvicorn
CMD ["/opt/venv/bin/uvicorn", "app.main:app", "--host=0.0.0.0", "--port=8000"]