from flask import Blueprint
from flask_jwt_extended import jwt_required
from controllers.transacao_controller import listar_transacoes, criar_transacao, atualizar_transacao, apagar_transacao

transacao_bp = Blueprint('transacao_bp', __name__)

# Rotas sem ID (Listar Todas e Criar Nova)
transacao_bp.route('', methods=['GET'], strict_slashes=False)(jwt_required()(listar_transacoes))
transacao_bp.route('', methods=['POST'], strict_slashes=False)(jwt_required()(criar_transacao))

# Rotas com ID (Atualizar e Apagar Específica)
# O <int:id> diz ao Flask para capturar o número que vem no URL e passar para a função
transacao_bp.route('/<int:id>', methods=['PUT'], strict_slashes=False)(jwt_required()(atualizar_transacao))
transacao_bp.route('/<int:id>', methods=['DELETE'], strict_slashes=False)(jwt_required()(apagar_transacao))