# ─────────────────────────────────────────────
# Stage 1: Build environment with pip + dependencies
# ─────────────────────────────────────────────
FROM python:3.11-slim as builder

ENV POETRY_VERSION=1.8.2

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    build-essential \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install into custom dir
COPY requirements.txt .

RUN pip install --upgrade pip \
 && pip install --prefix=/install --no-cache-dir -r requirements.txt

# ─────────────────────────────────────────────
# Stage 2: Runtime
# ─────────────────────────────────────────────
FROM python:3.11-slim

# Set cache path (not included in image)
ENV TRANSFORMERS_CACHE=/tmp/hf_cache \
    HF_HOME=/tmp/hf_home \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /install /usr/local

# Copy only source code, not extra files
COPY app/ app/


# Expose port
EXPOSE 8000

# Start command (adjust if your app entry point differs)
CMD ["uvicorn", "app.main:app", "--host=0.0.0.0", "--port=8000"]