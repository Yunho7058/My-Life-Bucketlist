"""delete title column in post table

Revision ID: 4ca9c410009e
Revises: 277a255d338d
Create Date: 2022-05-17 14:23:31.477832

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4ca9c410009e'
down_revision = '277a255d338d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posts', 'title')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('title', mysql.VARCHAR(length=100), nullable=True))
    # ### end Alembic commands ###
