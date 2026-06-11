from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models.usuario_model import Usuario
from models.categoria_model import Categoria  # <-- IMPORTAÇÃO OBRIGATÓRIA AQUI
from utils.database import db

# ===== Função para registar um novo utilizador no sistema. ===== #

def registrar_usuario():
    dados = request.get_json()
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')

    if not nome or not email or not senha:
        return jsonify({"erro": "Nome, email e senha são campos obrigatórios."}), 400
    
    usuario_existente = Usuario.query.filter_by(email=email).first()
    if usuario_existente:
        return jsonify({"erro": "Este email já está registado."}), 409

    senha_hash = generate_password_hash(senha)

    # 1. Cria o utilizador
    novo_usuario = Usuario(nome=nome, email=email, senha_hash=senha_hash)
    db.session.add(novo_usuario)
    db.session.commit() # Tem de fazer commit aqui para o utilizador ganhar um 'id'

    # 2. Cria as categorias associadas ao ID do novo utilizador
    categorias_padrao = [
        {"nome": "Alimentação", "tipo": "despesa"},
        {"nome": "Moradia", "tipo": "despesa"},
        {"nome": "Transporte", "tipo": "despesa"},
        {"nome": "Lazer", "tipo": "despesa"},
        {"nome": "Saúde", "tipo": "despesa"},
        {"nome": "Salário", "tipo": "receita"},
        {"nome": "Freelance", "tipo": "receita"},
        {"nome": "Investimentos", "tipo": "receita"}
    ]

    try:
        for cat in categorias_padrao:
            nova_categoria = Categoria(nome=cat["nome"], tipo=cat["tipo"], usuario_id=novo_usuario.id)
            db.session.add(nova_categoria)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        # Imprime o erro real no terminal do Docker para sabermos o que falhou
        print(f"ERRO CRÍTICO NA BASE DE DADOS: {str(e)}") 
        return jsonify({
            "erro": "Utilizador criado, mas falhou a geração das categorias padrão.",
            "detalhes": str(e)
        }), 500

    return jsonify({"mensagem": "Conta e categorias criadas com sucesso!"}), 201


# ===== Função para autenticar o utilizador e gerar o token JWT. ===== #

def login_usuario():
    dados = request.get_json()
    email = dados.get('email')
    senha = dados.get('senha')

    usuario = Usuario.query.filter_by(email=email).first()

    if not usuario or not check_password_hash(usuario.senha_hash, senha):
        return jsonify({"erro": "Email ou senha incorretos."}), 401

    token = create_access_token(identity=str(usuario.id))

    return jsonify({
        "mensagem": "Login efetuado com sucesso!",
        "token": token,
        "usuario": usuario.to_dict()
    }), 200