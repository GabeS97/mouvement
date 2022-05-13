# from .db import db

# class Column(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(25), nullable=False)
#     task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
#     board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)

#     board = db.relationship('Board', back_populates='columns')
#     tasks = db.relationship('Task', back_populates='board')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'title': self.title,
#             'task_id': self.task_id,
#             'board_id': self.board_id
#         }
