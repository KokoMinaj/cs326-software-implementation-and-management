# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies into a prefix so we can copy them cleanly
COPY queueless_backend/requirements.txt .
RUN pip install --upgrade pip \
    && pip install --prefix=/install --no-cache-dir -r requirements.txt


# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS runtime

WORKDIR /app

# Runtime system deps only (libpq for psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application source
COPY queueless_backend/ .

# Collect static files at build time
# SECRET_KEY is a throwaway value used only for this step — not used at runtime.
RUN SECRET_KEY=docker-build-collect-static \
    DEBUG=False \
    ENABLE_MOCK_API=True \
    python manage.py collectstatic --noinput

# Expose the port gunicorn will listen on
EXPOSE 8000

# Default environment — override all of these in production via env vars or .env
ENV DJANGO_SETTINGS_MODULE=queueless_backend.settings \
    DEBUG=False \
    ENABLE_MOCK_API=True \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Entrypoint: run migrations then start gunicorn
CMD ["sh", "-c", \
    "python manage.py migrate --noinput && \
     gunicorn queueless_backend.wsgi:application \
       --bind 0.0.0.0:8000 \
       --workers 2 \
       --timeout 120 \
       --access-logfile - \
       --error-logfile -"]# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies into a prefix so we can copy them cleanly
COPY queueless_backend/requirements.txt .
RUN pip install --upgrade pip \
    && pip install --prefix=/install --no-cache-dir -r requirements.txt


# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS runtime

WORKDIR /app

# Runtime system deps only (libpq for psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application source
COPY queueless_backend/ .

# Collect static files at build time
# SECRET_KEY is a throwaway value used only for this step — not used at runtime.
RUN SECRET_KEY=docker-build-collect-static \
    DEBUG=False \
    ENABLE_MOCK_API=True \
    python manage.py collectstatic --noinput

# Expose the port gunicorn will listen on
EXPOSE 8000

# Default environment — override all of these in production via env vars or .env
ENV DJANGO_SETTINGS_MODULE=queueless_backend.settings \
    DEBUG=False \
    ENABLE_MOCK_API=True \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Entrypoint: run migrations then start gunicorn
CMD ["sh", "-c", \
    "python manage.py migrate --noinput && \
     gunicorn queueless_backend.wsgi:application \
       --bind 0.0.0.0:8000 \
       --workers 2 \
       --timeout 120 \
       --access-logfile - \
       --error-logfile -"]