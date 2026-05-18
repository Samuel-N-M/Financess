from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from datetime import datetime
from models.transacao_model import Transacao
from models.categoria_model import Categoria
from utils.database import db

def listar_transacoes():
    """Lista as transações do utilizador autenticado."""
    usuario_id = get_jwt_identity()
    
    # Procura apenas as transações deste utilizador
    transacoes = Transacao.query.filter_by(usuario_id=usuario_id).order_by(Transacao.data_ocorrencia.desc()).all()
    
    return jsonify([t.to_dict() for t in transacoes]), 200


def criar_transacao():
    """Adiciona uma nova receita ou despesa."""
    usuario_id = get_jwt_identity()
    dados = request.get_json()

    # Extrair os dados recebidos
    descricao = dados.get('descricao')
    valor = dados.get('valor')
    tipo = dados.get('tipo')
    data_str = dados.get('data_ocorrencia') # Esperado no formato 'YYYY-MM-DD'
    categoria_id = dados.get('categoria_id')

    # Validação Básica
    if not descricao or valor is None or not tipo or not data_str or not categoria_id:
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    # Validar se a categoria existe e pertence a este utilizador
    categoria = Categoria.query.filter_by(id=categoria_id, usuario_id=usuario_id).first()
    if not categoria:
        return jsonify({"erro": "Categoria inválida ou não pertence ao utilizador."}), 404

    # Converter a string da data para um objeto Date do Python
    try:
        data_ocorrencia = datetime.strptime(data_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"erro": "Formato de data inválido. Use YYYY-MM-DD."}), 400

    # Garantir que o valor é positivo no banco de dados (o tipo diz se soma ou subtrai depois)
    valor_absoluto = abs(float(valor))

    # Criar e guardar a transação
    nova_transacao = Transacao(
        descricao=descricao,
        valor=valor_absoluto,
        tipo=tipo,
        data_ocorrencia=data_ocorrencia,
        categoria_id=categoria.id,
        usuario_id=usuario_id
    )
    
    db.session.add(nova_transacao)
    db.session.commit()

    return jsonify({"mensagem": "Transação criada com sucesso!", "transacao": nova_transacao.to_dict()}), 201


def apagar_transacao(id):
    """Apaga uma transação específica (Garantindo que pertence ao utilizador)."""
    usuario_id = get_jwt_identity()
    
    # Procura a transação pelo ID e pelo Dono (Segurança Dupla)
    transacao = Transacao.query.filter_by(id=id, usuario_id=usuario_id).first()
    
    if not transacao:
        return jsonify({"erro": "Transação não encontrada ou acesso negado."}), 404

    db.session.delete(transacao)
    db.session.commit()

    return jsonify({"mensagem": "Transação apagada com sucesso!"}), 200


def atualizar_transacao(id):
    """Atualiza os dados de uma transação."""
    usuario_id = get_jwt_identity()
    dados = request.get_json()

    transacao = Transacao.query.filter_by(id=id, usuario_id=usuario_id).first()
    if not transacao:
        return jsonify({"erro": "Transação não encontrada ou acesso negado."}), 404

    # Atualiza os campos apenas se eles tiverem sido enviados no JSON
    if 'descricao' in dados:
        transacao.descricao = dados['descricao']
    if 'valor' in dados:
        transacao.valor = abs(float(dados['valor']))
    if 'tipo' in dados:
        transacao.tipo = dados['tipo']
    if 'data_ocorrencia' in dados:
        transacao.data_ocorrencia = datetime.strptime(dados['data_ocorrencia'], '%Y-%m-%d').date()
    if 'categoria_id' in dados:
        transacao.categoria_id = dados['categoria_id']

    db.session.commit()

    return jsonify({"mensagem": "Transação atualizada com sucesso!", "transacao": transacao.to_dict()}), 200