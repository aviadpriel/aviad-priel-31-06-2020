import logging.config
import logging

import yaml

with open('Configs/log.yaml', 'r') as f:
    config = yaml.safe_load(f.read())
    logging.config.dictConfig(config)

loggerConsole = logging.getLogger(__name__)

loggerFile = logging.getLogger('fileLogger')


"""
loggerFile.debug("")
logging.warning()
logging.error()
logging.critical()
"""
