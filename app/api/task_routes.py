from flask_login import login_required
from flask import Blueprint, jsonify, request
from app.models import db, Task
from app.forms import TaskForm

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/boards/<int:board_id>/', methods=['GET'])
def get_all_tasks(board_id):
    tasks = Task.query.filter(Task.board_id == board_id).all()
    return jsonify([task.to_dict() for task in tasks])

@task_routes.route('/boards/<int:board_id>', methods=['POST'])
def post_task(board_id):
    form=TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task()
        form.populate_obj(task)

        db.session.add(task)
        db.session.commit()
        return task.to_dict()

@task_routes.route('/boards/<int:board_id>/<int:id>', methods=['DELETE'])
def delete_task(board_id, id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return task.to_dict()
