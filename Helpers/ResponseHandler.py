from typing import List, Tuple

from flask import make_response
from flask import jsonify


def build_response(status: int, data: dict):
    if not isinstance(data, dict):
        data = {}
    data['status_code'] = status
    return make_response(jsonify(data), status)


def validate_required_keys(required_keys: List[Tuple], form_data: dict) -> bool:
    # noinspection PyBroadException
    try:
        for data in required_keys:
            key = data[0]
            instance = data[1]

            instance(form_data[key])
    except:
        return False
    return True
