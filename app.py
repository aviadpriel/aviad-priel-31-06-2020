"""server/app.py - main api app declaration"""
from flask import Flask, send_from_directory
from flask_cors import CORS
import Configs.mysql as mysql_conf
from dotenv import load_dotenv
import os


def run_app():
    load_dotenv()
    '''Main wrapper for app creation'''
    app = Flask(__name__, static_folder='client/build/')
    CORS(app)

    app.config['ORATOR_DATABASES'] = mysql_conf.mysql_config

    from Routes.Api import api_pages

    ##
    # register routes
    ##

    app.register_blueprint(api_pages)

    ##
    # client static  routes
    ##
    @app.route('/static/<path:path>')
    def send_js(path):
        return send_from_directory(app.static_folder + "/static/", path)

    @app.route('/assets/<path:path>')
    def send_assets(path):
        print(path)

        return send_from_directory(app.static_folder + "/assets/", path)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        """Return index.html for all non-api routes"""

        return send_from_directory(app.static_folder, 'index.html')

    return app


if __name__ == '__main__':
    FLASK_PORT = os.getenv("FLASK_PORT", None)

    run_app().run(port=FLASK_PORT)
