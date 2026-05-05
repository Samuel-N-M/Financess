# Ficheiro: docker/frontend.Dockerfile
FROM node:20-alpine

# Definir a pasta de trabalho
WORKDIR /app

# Expor a porta que o Vite utiliza por padrão
EXPOSE 5173