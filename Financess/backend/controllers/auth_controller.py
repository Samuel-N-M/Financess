from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models.usuario_model import Usuario
from models.categoria_model import Categoria
from utils.database import db

# ===== Função para registar um novo utilizador no sistema. ===== #

def registrar_usuario():
    # Recebe os dados em formato JSON vindos do frontend
    dados = request.get_json()
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')

    # 1. Validação Básica
    if not nome or not email or not senha:
        return jsonify({"erro": "Nome, email e senha são campos obrigatórios."}), 400
    
    # 2. Verificar se o email já existe no banco de dados
    usuario_existente = Usuario.query.filter_by(email=email).first()
    if usuario_existente:
        return jsonify({"erro": "Este email já está registado."}), 409

    # 3. Criptografar a senha (Segurança!)
    senha_hash = generate_password_hash(senha)

    # 4. Criar e guardar o novo utilizador
    novo_usuario = Usuario(nome=nome, email=email, senha_hash=senha_hash)
    db.session.add(novo_usuario)
    db.session.commit()

    # 5. SEED AUTOMÁTICO DE CATEGORIAS PADRÃO
    # Cria a lista essencial de categorias diretamente vinculadas a este novo utilizador
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
        for nome_categoria in categorias_padrao:
            nova_categoria = Categoria(nome=nome_categoria, usuario_id=novo_usuario.id)
            db.session.add(nova_categoria)
        
        db.session.commit()
    except Exception as e:
        # Em caso de falha nas categorias, faz o rollback para não corromper a sessão
        db.session.rollback()
        return jsonify({"erro": "Utilizador criado, mas falhou a geração das categorias padrão.", "detalhes": str(e)}), 500

    return jsonify({"mensagem": "Utilizador registado com sucesso!"}), 201


# ===== Função para autenticar o utilizador e gerar o token JWT. ===== #

def login_usuario():
    dados = request.get_json()
    email = dados.get('email')
    senha = dados.get('senha')

    # 1. Procurar o utilizador pelo email
    usuario = Usuario.query.filter_by(email=email).first()

    # 2. Validar o utilizador e a senha criptografada
    if not usuario or not check_password_hash(usuario.senha_hash, senha):
        return jsonify({"erro": "Email ou senha incorretos."}), 401

    # 3. Gerar o Token JWT (o "crachá" de acesso)
    # Convertendo o id do usuário para string, pois o JWT prefere strings
    token = create_access_token(identity=str(usuario.id))

    # 4. Retornar os dados e o token
    return jsonify({
        "mensagem": "Login efetuado com sucesso!",
        "token": token,
        "usuario": usuario.to_dict()
    }), 200