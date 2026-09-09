"""add role and user_id to authors

Revision ID: 002
Revises: 001
Create Date: 2026-08-05
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("authors") as batch_op:
        batch_op.add_column(sa.Column("role", sa.String(150), nullable=True))
        batch_op.add_column(sa.Column("user_id", sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            "fk_authors_user_id_admin_users",
            "admin_users",
            ["user_id"],
            ["id"],
        )
        batch_op.create_unique_constraint("uq_authors_user_id", ["user_id"])


def downgrade() -> None:
    with op.batch_alter_table("authors") as batch_op:
        batch_op.drop_constraint("uq_authors_user_id", type_="unique")
        batch_op.drop_constraint("fk_authors_user_id_admin_users", type_="foreignkey")
        batch_op.drop_column("user_id")
        batch_op.drop_column("role")
