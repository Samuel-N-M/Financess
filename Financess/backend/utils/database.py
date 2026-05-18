"""
Módulo de Configuração da Base de Dados.
Instancia o objeto SQLAlchemy que será partilhado por toda a aplicação,
evitando problemas de importação circular.
"""
# Ficheiro: backend/utils/database.py
from flask_sqlalchemy import SQLAlchemy

# Criamos a instância vazia aqui. Ela será ligada ao Flask no app.py
db = SQLAlchemy()