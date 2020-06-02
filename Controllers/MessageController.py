def create_message(sender_id, receiver_id, subject, content):
    from Entities.Message import Message
    return Message.create({
        "sender_id": sender_id,
        'receiver_id': receiver_id,
        'subject': subject,
        "content": content
    })


def delete_message(message_id: int, user_id: int, user_type: str) -> bool:
    from Entities.Message import Message
    msg = Message.find(message_id)
    if msg.receiver_id == user_id and user_type == "receiver":
        msg.visible_to_receiver = False
        msg.save()
    elif msg.sender_id == user_id and user_type == "sent":
        msg.visible_to_sender = False
        msg.save()
    else:
        return False
    return True


def get_user_messages(user_id: int):
    from Entities.Message import Message

    return {
        "sent": Message.query().where("sender_id", "=", user_id).where("visible_to_sender", "=", True).get()
            .serialize(),
        "received": Message.query().where("receiver_id", "=", user_id).where("visible_to_receiver", "=", True).get()
            .serialize()
    }
