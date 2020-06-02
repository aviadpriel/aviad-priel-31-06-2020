from orator.migrations import Migration
from orator.schema import Blueprint


class Init(Migration):

    def up(self):
        """
        Run the migrations.
        """
        table: Blueprint

        if not self.schema.has_table('messages'):
            with self.schema.create('messages') as table:
                table.big_integer('id', True, True)
                table.big_integer('sender_id', False, True)
                table.big_integer('receiver_id', False, True)

                table.string("subject")

                table.text("content")
                table.boolean("visible_to_sender").default(1)
                table.boolean("visible_to_receiver").default(1)
                table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('messages')
