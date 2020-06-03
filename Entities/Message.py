from orator import Model

import Configs.mysql


class Message(Model):
    receiver_id: int
    sender_id: int
    visible_to_sender: bool
    visible_to_receiver: bool

    __table__ = 'messages'
    __fillable__ = ['subject', 'content', 'receiver_id', 'sender_id', 'visible_to_sender', 'visible_to_receiver']
    __timestamps__ = True
    __casts__ = {
        'visible_to_sender': 'bool',
        'visible_to_receiver': "bool"
    }

