# Ficheiro: backend/app.py
import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate

# Importar a instância da base de dados centralizada
from utils.database import db

# Importar os modelos para que o Migrate os reconheça
from models.usuario_model import Usuario
from models.categoria_model import Categoria

def create_app():
    """Factory Function: Cria e configura a aplicação Flask de forma profissional"""
    app = Flask(__name__)
    CORS(app)

    # Configurações do Banco de Dados
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Configurações do JWT (Segurança)
    app.config['JWT_SECRET_KEY'] = 'uma_chave_super_secreta_para_desenvolvimento'

    # Inicializar os módulos com a aplicação
    db.init_app(app)
    Migrate(app, db)

    # Rota de Status (Health Check)
    @app.route('/api/status')
    def status():
        try:
            # Testa se o banco está respondendo
            db.engine.connect()
            return jsonify({"status": "Backend rodando, MVC configurado e Banco de Dados Conectado!"})
        except Exception as e:
            return jsonify({"status": "Erro ao conectar no banco", "erro": str(e)}), 500

    # Futuro: Aqui vamos registar as rotas (Blueprints)
    # from routes.auth_routes import auth_bp
    # app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app

# Inicializa a app
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)