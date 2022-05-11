from .db import db

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    template = db.Column(db.String(50))
    name = db.Column(db.String(50), unique=True)
    description = db.Column(db.String(500))
    # This will be saved for after graduation
    # image_cover = db.Column(db.String(5000))
    icon = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'template': self.template,
            'description': self.description,
            'name': self.name,
            'icon': self.icon
            # This will be saved for after graduation
            # 'image_cover': self.image_cover,
        }
