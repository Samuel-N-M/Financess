from utils.database import db
from datetime import datetime

class Transacao(db.Model):
    __tablename__ = 'transacoes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    descricao = db.Column(db.String(255), nullable=False)
    # db.Numeric(10, 2) significa um número com até 10 dígitos, sendo 2 casas decimais
    valor = db.Column(db.Numeric(10, 2), nullable=False)
    tipo = db.Column(db.String(20), nullable=False) # 'receita' ou 'despesa'
    data_ocorrencia = db.Column(db.Date, nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    # Chaves Estrangeiras (Relações)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "descricao": self.descricao,
            "valor": float(self.valor), # Converte para float para o JSON
            "tipo": self.tipo,
            "data_ocorrencia": self.data_ocorrencia.isoformat(),
            "usuario_id": self.usuario_id,
            "categoria_id": self.categoria_id
        }