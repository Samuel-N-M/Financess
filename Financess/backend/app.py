import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager # <-- Nova importação

from utils.database import db
from models.usuario_model import Usuario
from models.categoria_model import Categoria
from models.transacao_model import Transacao
from models.meta_model import Meta

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configurações do Banco de Dados
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Configurações de Segurança (JWT)
    app.config['JWT_SECRET_KEY'] = 'uma_chave_super_secreta_para_desenvolvimento'

    # Inicializar os módulos
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app) # <-- Inicializa o gestor de Tokens

    # Rota de Status (Health Check)
    @app.route('/api/status')
    def status():
        try:
            db.engine.connect()
            return jsonify({"status": "Backend rodando e Banco Conectado!"})
        except Exception as e:
            return jsonify({"status": "Erro ao conectar no banco", "erro": str(e)}), 500

    # ==========================================
    # REGISTO DAS ROTAS (BLUEPRINTS)
    # ==========================================
    from routes.auth_routes import auth_bp
    
    # Ao colocar url_prefix='/api/auth', as rotas ficam: /api/auth/register e /api/auth/login
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)