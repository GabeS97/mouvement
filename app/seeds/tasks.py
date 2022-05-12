from app.models import db, Task


def seed_tasks():
    task_one = Task(
        user_id=1,
        board_id=1,
        tasks='Finish first CRUD feature',
    )
    task_two = Task(
        user_id=1,
        board_id=1,
        tasks='Finish second CRUD feature',
    )
    task_three = Task(
        user_id=1,
        board_id=1,
        tasks='Styling and finalize features',
    )

    db.session.add_all([task_one, task_two, task_three])
    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
