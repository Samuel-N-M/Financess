FROM python:3.11-slim

ARG UID=1001
ARG GID=1001

WORKDIR /app

# Instala dependências nativas do Linux exigidas pelo driver do PostgreSQL (psycopg2)
RUN apt-get update \
    && apt-get install -y gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .

# Instala as bibliotecas do Python
RUN pip install --no-cache-dir -r requirements.txt

# Cria um usuário não-root por segurança
RUN groupadd -g "${GID}" appgroup && \
    useradd -u "${UID}" -g "${GID}" -m -s /bin/bash appuser

# Muda do usuário root para o usuário seguro
USER appuser

# Não precisamos do COPY do código fonte aqui, pois mapeamos o volume "./backend:/app" no docker-compose.
# O código será lido diretamente da sua máquina para facilitar o desenvolvimento.