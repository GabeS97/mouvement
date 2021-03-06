from .db import db
from flask_login import login_required

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)
    tasks =  db.Column(db.String(500), nullable=False)
    header = db.Column(db.String(50))
    media = db.Column(db.String(50))
    author = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    board = db.relationship('Board', back_populates='tasks', lazy='subquery')
    # board = db.relationship('Board', back_populates='columns')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'board_id': self.board_id,
            'tasks': self.tasks,
            'board': self.board.name,
            'header': self.header,
            'media': self.media,
            'created_at': self.created_at,
            'author': self.author
        }
