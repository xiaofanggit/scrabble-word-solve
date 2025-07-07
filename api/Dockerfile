FROM python:3.11-slim

WORKDIR /app

# Install make (Debian package manager)
RUN apt-get update && apt-get install -y make && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt dev-requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir -r dev-requirements.txt

# Copy source code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
