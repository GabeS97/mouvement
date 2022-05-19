from flask_login import login_required
from flask import Blueprint, jsonify, request
from app.models import db, Board
from app.forms import BoardForm

board_routes = Blueprint('boards', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@board_routes.route('/<int:user_id>', methods=['GET'])
def all_default_boards(user_id):
    boards = Board.query.filter(Board.user_id == user_id).all()
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
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


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
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
