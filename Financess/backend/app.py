import os
from flask import Flask, jsonify
from dotenv import load_dotenv

# 1. Carregar as variáveis de ambiente do ficheiro .env
load_dotenv()

# 2. Inicializar a aplicação Flask
app = Flask(__name__)

# 3. Configurações da Base de Dados
# Lemos a DATABASE_URL que foi injetada pelo docker-compose
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 4. Rota de Teste (Health Check)
@app.route('/api/status', methods=['GET'])
def status():
    """
    Endpoint simples para verificar se a API está online.
    Retorna um JSON de confirmação.
    """
    return jsonify({
        "status": "online",
        "message": "A API Financess está a funcionar corretamente!",
        "version": "1.0.0"
    }), 200

# 5. Arranque do Servidor
if __name__ == '__main__':
    # host='0.0.0.0' é necessário no Docker para expor a porta para a tua máquina real
    app.run(host='0.0.0.0', port=5000, debug=True)