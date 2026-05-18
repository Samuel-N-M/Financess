from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from models.categoria_model import Categoria
from utils.database import db

def listar_categorias():
    """Lista as categorias do utilizador autenticado."""
    # Descobre quem é o utilizador pelo token JWT
    usuario_id = get_jwt_identity()
    
    # Permite filtrar por tipo na URL (ex: /api/categorias?tipo=receita)
    tipo_filtro = request.args.get('tipo')

    # Começa a montar a procura na base de dados
    query = Categoria.query.filter_by(usuario_id=usuario_id)
    
    # Se o utilizador pediu um filtro, aplicamos
    if tipo_filtro in ['receita', 'despesa']:
        query = query.filter_by(tipo=tipo_filtro)

    categorias = query.all()
    
    # Transforma a lista de objetos Python numa lista de dicionários (JSON)
    return jsonify([categoria.to_dict() for categoria in categorias]), 200


def criar_categoria():
    """Cria uma nova categoria associada ao utilizador logado."""
    usuario_id = get_jwt_identity()
    dados = request.get_json()

    nome = dados.get('nome')
    tipo = dados.get('tipo')

    # Validação básica
    if not nome or tipo not in ['receita', 'despesa']:
        return jsonify({"erro": "O nome é obrigatório e o tipo deve ser 'receita' ou 'despesa'."}), 400

    # Criar a categoria na base de dados
    nova_categoria = Categoria(nome=nome, tipo=tipo, usuario_id=usuario_id)
    db.session.add(nova_categoria)
    db.session.commit()

    return jsonify({
        "mensagem": "Categoria criada com sucesso!",
        "categoria": nova_categoria.to_dict()
    }), 201