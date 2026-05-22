from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from datetime import datetime
from models.meta_model import Meta
from utils.database import db

def listar_metas():
    """Lista todos os objetivos financeiros do utilizador."""
    usuario_id = get_jwt_identity()
    metas = Meta.query.filter_by(usuario_id=usuario_id).all()
    
    return jsonify([m.to_dict() for m in metas]), 200

def criar_meta():
    """Cria um novo objetivo financeiro."""
    usuario_id = get_jwt_identity()
    dados = request.get_json()

    # O backend agora aceita o valor inicial (valor_atual)
    titulo = dados.get('titulo')
    valor_alvo = dados.get('valor_alvo')
    valor_atual = dados.get('valor_atual', 0.00) 
    prazo_str = dados.get('prazo') # Formato 'YYYY-MM-DD' (Opcional)

    if not titulo or not valor_alvo:
        return jsonify({"erro": "O título e o valor alvo são obrigatórios."}), 400

    prazo = None
    if prazo_str:
        try:
            prazo = datetime.strptime(prazo_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"erro": "Formato de data inválido. Use YYYY-MM-DD."}), 400

    nova_meta = Meta(
        titulo=titulo,
        valor_alvo=abs(float(valor_alvo)),
        valor_atual=abs(float(valor_atual)), # Guarda o valor inicial se foi preenchido
        prazo=prazo,
        usuario_id=usuario_id
    )
    
    db.session.add(nova_meta)
    db.session.commit()

    return jsonify({"mensagem": "Meta criada com sucesso!", "meta": nova_meta.to_dict()}), 201

def contribuir_meta(id):
    """Adiciona um valor ao saldo atual da meta."""
    usuario_id = get_jwt_identity()
    dados = request.get_json()
    
    valor_contribuicao = dados.get('valor')

    if not valor_contribuicao or float(valor_contribuicao) <= 0:
        return jsonify({"erro": "O valor da contribuição deve ser maior que zero."}), 400

    meta = Meta.query.filter_by(id=id, usuario_id=usuario_id).first()
    
    if not meta:
        return jsonify({"erro": "Meta não encontrada ou acesso negado."}), 404

    meta.valor_atual = float(meta.valor_atual) + float(valor_contribuicao)
    db.session.commit()

    return jsonify({"mensagem": "Contribuição adicionada com sucesso!", "meta": meta.to_dict()}), 200