from flask_login import login_required
from flask import Blueprint, jsonify, request
from app.models import Board

board_routes = Blueprint('boards', __name__)

@board_routes.route('/', methods=['GET'])
def all_default_boards():
    boards = Board.query.all()
    return jsonify([board.to_dict() for board in boards])
