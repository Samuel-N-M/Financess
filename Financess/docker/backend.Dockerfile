# Ficheiro: docker/backend.Dockerfile
FROM python:3.11-slim

ARG UID=1001
ARG GID=1001

# Definir a pasta de trabalho dentro do contentor
WORKDIR /app

# Instala as dependências do sistema necessárias para o PostgreSQL e compilação
# O libpq-dev e o gcc são cruciais para instalar o psycopg2 (driver do banco de dados)
RUN apt-get update \
    && apt-get install -y gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia o ficheiro de requisitos primeiro (para otimizar o cache do Docker)
COPY backend/requirements.txt .

# Instala as dependências do Python sem guardar cache
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta 5000 para comunicação
EXPOSE 5000