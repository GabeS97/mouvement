from app.models import db, Board

# This will be saved for after graduation

def seed_boards():
    # board_one = Board(
    #     user_id= 1,
    #     template=None,
    #     name='Getting Started on Mobile',
    #     description='👋 Welcome to Notion!',
    #     # image_cover=None,
    #     icon= None,
    # )
    board_two = Board(
        user_id= 1,
        template='Quick Note',
        name='Quick Note',
        description='Quickly create a rich document.',
        # image_cover=None,
        icon= '📌',
    )
    board_three = Board(
        user_id= 1,
        template='Task List',
        name='Task List',
        description='Use this template to track your personal tasks.',
        # image_cover=None,
        icon='✔️',
    )
    board_four = Board(
        user_id= 1,
        template='Reading List',
        name='Reading List',
        description='📚 The modern day reading list includes more than just books. We\'ve created a dashboard to help you track books, articles, podcasts, and videos. Each media type has its own view based on the Type property. Change your views to sort content by status, author, type, or publisher ✓Rate content out of 5 stars ✓',
        # image_cover=None,
        icon='📕',
    )
    board_five = Board(
    user_id= 1,
        template='Journal',
        name='Journal',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. Categorize entries with tags and automatically capture the date.',
        # image_cover=None,
        icon='📓',
    )
    board_six= Board(
        user_id= 1,
        template='Personal Home',
        name='Personal Home',
        description='Organize everything in your life in one place.',
        # image_cover=None,
        icon='🏡',
    )

    db.session.add_all([board_two, board_three, board_four, board_five, board_six])
    db.session.commit()

def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
