from flask import Blueprint
from controllers.auth_controller import registrar_usuario, login_usuario

# Criamos um "Blueprint", que é uma forma de agrupar rotas no Flask
auth_bp = Blueprint('auth_bp', __name__)

# Definimos os endpoints (URLs) e associamos às funções do controlador
auth_bp.route('/register', methods=['POST'])(registrar_usuario)
auth_bp.route('/login', methods=['POST'])(login_usuario)