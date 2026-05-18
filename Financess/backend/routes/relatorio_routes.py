from flask import Blueprint
from flask_jwt_extended import jwt_required
from controllers.relatorio_controller import obter_resumo

relatorio_bp = Blueprint('relatorio_bp', __name__)

# Rota para obter o resumo (Ex: /api/relatorios/resumo)
relatorio_bp.route('/resumo', methods=['GET'], strict_slashes=False)(jwt_required()(obter_resumo))