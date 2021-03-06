"""empty message

Revision ID: 15227b31825e
Revises: d3f7ac54fc5e
Create Date: 2022-06-07 11:21:43.479488

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15227b31825e'
down_revision = 'd3f7ac54fc5e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('boards_name_key', 'boards', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('boards_name_key', 'boards', ['name'])
    # ### end Alembic commands ###
