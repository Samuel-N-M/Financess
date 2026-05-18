from flask import Blueprint
from flask_jwt_extended import jwt_required
from controllers.meta_controller import listar_metas, criar_meta, contribuir_meta

meta_bp = Blueprint('meta_bp', __name__)

meta_bp.route('', methods=['GET'], strict_slashes=False)(jwt_required()(listar_metas))
meta_bp.route('', methods=['POST'], strict_slashes=False)(jwt_required()(criar_meta))

# Rota específica para a ação de contribuir dinheiro para a meta
meta_bp.route('/<int:id>/contribuir', methods=['POST'], strict_slashes=False)(jwt_required()(contribuir_meta))