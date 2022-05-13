from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm

class TaskForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    board_id = IntegerField('board_id', validators=[DataRequired()])
    tasks = StringField('tasks')
    header = StringField('header')
