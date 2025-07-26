# ---------- Stage 1: Install dependencies ----------
FROM python:3.11-slim AS builder

WORKDIR /app

# Set environment to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc wget git \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first to leverage Docker cache
COPY requirements.txt .

# Create virtualenv & install dependencies
RUN python -m venv /venv && \
    . /venv/bin/activate && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ---------- Stage 2: Copy source & run ----------
FROM python:3.11-slim

WORKDIR /app

# Set environment for Hugging Face cache
ENV TRANSFORMERS_CACHE=/tmp/hf_cache \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Copy virtualenv from builder
COPY --from=builder /venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy only app source code
COPY app/ ./app

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]