from flask_login import login_required
from flask import Blueprint, jsonify, request
from app.models import db, Board
from app.forms import BoardForm

board_routes = Blueprint('boards', __name__)

@board_routes.route('/', methods=['GET'])
def all_default_boards():
    boards = Board.query.all()
    return jsonify([board.to_dict() for board in boards])

@board_routes.route('/<int:id>', methods=['GET'])
def get_one_board(id):
    boards = Board.query.get(id)
    return boards.to_dict()

@board_routes.route('/', methods=['POST'])
def post_new_board():
    form=BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_board=Board()
        form.populate_obj(new_board)
        db.session.add(new_board)
        db.session.commit()

        return new_board.to_dict()

@board_routes.route('/<int:id>', methods=['DELETE'])
def delete_board(id):
    board_deleted = Board.query.get(id)
    db.session.delete(board_deleted)
    db.session.commit()
    return board_deleted.to_dict()

@board_routes.route('/<int:id>', methods=['PUT'])
def edit_board(id):
    form=BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board_edited = Board.query.get(id)
        form.populate_obj(board_edited)
        db.session.commit()
        return board_edited.to_dict()
