from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash

USERNAME = "USERNAME"
PASSWORD = "PASSWORD"

auth = HTTPBasicAuth()


@auth.get_password
def get_password(username):
    if username == USERNAME:
        return PASSWORD
    return None


@auth.error_handler
def unauthorized():
    from Helpers.ResponseHandler import build_response
    return build_response(403, {'error': 'Unauthorized access'})
