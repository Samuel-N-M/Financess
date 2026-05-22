from utils.database import db
from datetime import datetime

class Meta(db.Model):
    __tablename__ = 'metas'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    valor_alvo = db.Column(db.Numeric(10, 2), nullable=False)
    valor_atual = db.Column(db.Numeric(10, 2), default=0.00)
    prazo = db.Column(db.Date, nullable=True)
    
    # Novos campos para a meta ser completa
    observacoes = db.Column(db.Text, nullable=True) 
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=True)
    
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "valor_alvo": float(self.valor_alvo) if self.valor_alvo else 0.0,
            "valor_atual": float(self.valor_atual) if self.valor_atual else 0.0,
            "prazo": self.prazo.strftime('%Y-%m-%d') if self.prazo else None,
            "observacoes": self.observacoes,
            "usuario_id": self.usuario_id,
            "categoria_id": self.categoria_id
        }