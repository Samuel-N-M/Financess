from flask import Blueprint
from flask_jwt_extended import jwt_required
from controllers.categoria_controller import listar_categorias, criar_categoria

categoria_bp = Blueprint('categoria_bp', __name__)

# O parâmetro strict_slashes=False diz ao Flask: "Aceita tanto /api/categorias como /api/categorias/"
categoria_bp.route('', methods=['GET'], strict_slashes=False)(jwt_required()(listar_categorias))
categoria_bp.route('', methods=['POST'], strict_slashes=False)(jwt_required()(criar_categoria))