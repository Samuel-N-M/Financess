import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Puxa a URL do banco que o Docker injetou nas variáveis de ambiente
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/api/status')
def status():
    try:
        # Testa se o banco está respondendo
        db.engine.connect()
        return jsonify({"status": "Backend rodando e Banco de Dados Conectado!"})
    except Exception as e:
        return jsonify({"status": "Erro ao conectar no banco", "erro": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)