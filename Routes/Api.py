
from flask import Blueprint, request
from Configs.LoggingConfing import loggerFile

from Helpers.ResponseHandler import build_response, validate_required_keys


api_pages = Blueprint('api', __name__)


@api_pages.route('/api/test', methods=['GET'])
def create_new_article_route():
    return build_response(200, {"msg": "server error"})


@api_pages.route('/api/create-message', methods=['POST'])
def create_massage_route():
    from Controllers.MessageController import create_message
    from Entities.Message import Message
    form_data = request.form
    required_keys = [('content', str), ('subject', str), ('sender_id', int), ('receiver_id', int)]

    if not validate_required_keys(required_keys, form_data):
        return build_response(400, {'status': False, 'error': 'input error  missing required keys'})

    try:

        message = create_message(int(form_data['sender_id']), int(form_data['receiver_id']), form_data['subject'],
                                 form_data['content'])
        if isinstance(message, Message):
            return build_response(201, {"message": message.to_dict()})
    except Exception as error:
        loggerFile.exception(error)
        return build_response(500, {"error": 'error on create massage'})


@api_pages.route("/api/delete-message", methods=['POST'])
def delete_massage_route():
    from Controllers.MessageController import delete_message
    form_data = request.form
    required_keys = [('message_id', int), ('user_id', int), ('user_type', str)]

    if not validate_required_keys(required_keys, form_data):
        return build_response(400, {'status': False, 'error': 'input error  missing required keys'})
    message_id = form_data['message_id']
    user_id = form_data['user_id']
    user_type = form_data['user_type']
    try:
        delete_message(int(message_id), int(user_id), user_type)
        return build_response(200, {"status": True})
    except Exception as error:
        loggerFile.exception(error)
        return build_response(500, {"error": 'error on delete massage {}'.format(message_id)})


@api_pages.route("/api/get-messages", methods=['POST'])
def get_user_messages_route():
    from Controllers.MessageController import get_user_messages
    form_data = request.form
    required_keys = [('user_id', int)]

    if not validate_required_keys(required_keys, form_data):
        return build_response(400, {'error': 'input error  missing required keys'})
    user_id = form_data['user_id']
    try:
        data = get_user_messages(int(user_id))
        return build_response(200, data)
    except Exception as error:
        loggerFile.exception(error)
        return build_response(500, {"error": 'error on get user  massages {}'.format(user_id)})
