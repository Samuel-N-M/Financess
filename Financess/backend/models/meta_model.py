from utils.database import db
from datetime import datetime

class Meta(db.Model):
    __tablename__ = 'metas'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titulo = db.Column(db.String(100), nullable=False)
    valor_alvo = db.Column(db.Numeric(10, 2), nullable=False)
    valor_atual = db.Column(db.Numeric(10, 2), default=0.00)
    prazo = db.Column(db.Date, nullable=True)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    # Chave Estrangeira (Cada meta pertence a um utilizador)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "valor_alvo": float(self.valor_alvo),
            "valor_atual": float(self.valor_atual),
            "prazo": self.prazo.isoformat() if self.prazo else None,
            "usuario_id": self.usuario_id
        }