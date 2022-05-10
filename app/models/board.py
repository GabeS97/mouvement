from .db import db
from flask_login import login_required

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    type = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(300))
    image_cover = db.Column(db.String(5000))
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


    def to_dict(self):
        return {
            'user_id': self.user_id,
            'type': self.type,
            'description': self.description,
            'image_cover': self.image_cover
        }
