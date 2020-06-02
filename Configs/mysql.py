"""
how to start using

db = DatabaseManager(config)

"""
import os
from orator import Model, DatabaseManager

from dotenv import load_dotenv

load_dotenv()

mysql_config = {

    'default': 'data',
    'data': {
        'driver': os.getenv("DB_DRIVER", "postgres"),
        'host': os.getenv("DB_HOST", "localhost"),
        'database': os.getenv("DB_DATABASE", "data"),
        'user': os.getenv("DB_USER", "user"),
        'password': os.getenv("DB_PASS", "pass"),
        'prefix': ''
    },



}

database = DatabaseManager(mysql_config)
Model.set_connection_resolver(database)
