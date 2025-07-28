# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Environment variables for better logging and HF cache
ENV TRANSFORMERS_CACHE=/tmp/hf_cache \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY app/ ./app/

# Expose port for FastAPI
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7680"]