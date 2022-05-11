# from .db import db
# from flask_login import login_required

# class Task(db.Model):
#     __tablename__ = 'tasks'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)
#     header = db.Column(db.String(255)
#     tasks =  db.Column(db.String(500), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


#     def to_dict(self):
#         return {
#             'user_id': self.user_id,
#             'board_id': self.board_id,
#             'tasks': self.tasks
#         }
