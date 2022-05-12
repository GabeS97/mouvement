from flask_login import login_required
from flask import Blueprint, jsonify, request
from app.models import db, Task

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/boards/<int:board_id>', methods=['GET'])
def get_all_tasks(board_id):
    tasks = Task.query.filter(Task.board_id == board_id).all()
    return jsonify([task.to_dict() for task in tasks])
