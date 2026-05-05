# Ficheiro: docker/backend.Dockerfile
FROM python:3.11-slim

ARG UID=1001
ARG GID=1001

# Definir a pasta de trabalho dentro do contentor
WORKDIR /app

# Instalar dependências do sistema necessárias para compilar pacotes (ex: psycopg2)
RUN apt-get update \
    && apt-get install -y gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar apenas o ficheiro de dependências primeiro (otimiza o cache do Docker)
COPY backend/requirements.txt .

# Instalar as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Criar um utilizador não-root por questões de segurança
RUN groupadd -g "${GID}" appgroup && \
    useradd -u "${UID}" -g "${GID}" -m -s /bin/bash appuser

USER appuser