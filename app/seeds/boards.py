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
        description='📚 Tell us what you are reading? Now days, reading can be done in so many differnet medias; books, articles, podcasts, media, and more.... tell us all about it! Hover down to where it says "What are you reading," through that you will find that a + button will appear, this will let you create a list... Hover over the list items and notice there is a button on the right side of your list item, that prompt your to confirm either a delete or an edit to your entry',
        # image_cover=None,
        icon='📕',
    )
    board_five = Board(
    user_id= 1,
        template='Journal',
        name='Journal',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. ].',
        # image_cover=None,
        icon='📓',
    )
    board_six = Board(
    user_id= 1,
        template='Journal',
        name='Journals',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. ].',
        # image_cover=None,
        icon='🐢',
    )
    board_seven = Board(
    user_id= 1,
        template='Journal',
        name='Journalss',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. ].',
        # image_cover=None,
        icon='🦖',
    )
    board_eight = Board(
    user_id= 1,
        template='Journal',
        name='Journalsss',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. ].',
        # image_cover=None,
        icon='🦁',
    )
    board_nine = Board(
    user_id= 1,
        template='Journal',
        name='Journaling',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. ].',
        # image_cover=None,
        icon='🐬',
    )
    board_ten = Board(
    user_id= 1,
        template='Journal',
        name='Journalssssss',
        description='Document your life - daily happenings, special occasions, and reflections on your goals. ].',
        # image_cover=None,
        icon='🐪',
    )
    # board_six= Board(
    #     user_id= 1,
    #     template='Personal Home',
    #     name='Personal Home',
    #     description='Organize everything in your life in one place.',
    #     # image_cover=None,
    #     icon='🏡',
    # )

    db.session.add_all([board_two, board_four,  board_five, board_six, board_seven, board_eight, board_nine, board_ten])
    db.session.commit()

def undo_boards():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
