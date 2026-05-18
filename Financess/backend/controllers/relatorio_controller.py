from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import func
from models.transacao_model import Transacao
from utils.database import db

def obter_resumo():
    """Calcula o total de receitas, despesas e o saldo final do utilizador."""
    usuario_id = get_jwt_identity()

    # 1. Somar todas as Receitas
    # .scalar() pega o resultado direto da soma em vez de uma lista
    total_receitas = db.session.query(func.sum(Transacao.valor)).filter(
        Transacao.usuario_id == usuario_id,
        Transacao.tipo == 'receita'
    ).scalar()
    
    # Se não houver receitas, define como 0.0
    total_receitas = float(total_receitas) if total_receitas else 0.0

    # 2. Somar todas as Despesas
    total_despesas = db.session.query(func.sum(Transacao.valor)).filter(
        Transacao.usuario_id == usuario_id,
        Transacao.tipo == 'despesa'
    ).scalar()
    
    total_despesas = float(total_despesas) if total_despesas else 0.0

    # 3. Calcular o Saldo Atual
    saldo_total = total_receitas - total_despesas

    # Retornar o JSON formatado para o Frontend usar no Dashboard
    return jsonify({
        "total_receitas": total_receitas,
        "total_despesas": total_despesas,
        "saldo_total": saldo_total
    }), 200