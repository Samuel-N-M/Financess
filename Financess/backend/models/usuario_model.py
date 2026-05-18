"""
Modelo de Dados: Utilizador (Usuario)
Representa a tabela 'usuarios' na base de dados PostgreSQL.
"""

from utils.database import db
from datetime import datetime

class Usuario(db.Model):
    __tablename__ = 'usuarios' # Nome exato da tabela no banco de dados

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    # Relações (serão úteis mais tarde)
    categorias = db.relationship('Categoria', backref='usuario', lazy=True)

    def to_dict(self):
        """Converte o objeto para um dicionário (útil para retornar JSON)"""
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "criado_em": self.criado_em.isoformat()
        }