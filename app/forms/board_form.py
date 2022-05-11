from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    template = SelectField('template', choices=['Quick Note', 'Task List', 'Reading List', 'Journal', 'Personal Home'])
    name = StringField('name')
    description = StringField('description')
    icon= StringField('icon')
