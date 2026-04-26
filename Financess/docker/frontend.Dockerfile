FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Expõe a porta do Vite
EXPOSE 5173

# O comando de inicialização (npm install + dev) é gerido pelo docker-compose 
# para garantir que os volumes de node_modules sejam montados corretamente.