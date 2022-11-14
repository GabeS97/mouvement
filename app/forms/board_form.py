from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    template = SelectField('template', choices=['Untitled', 'Calendar', 'Travel Plans', 'Journal'])
    name = StringField('name')
    description = StringField('description')
    icon= StringField('icon')
