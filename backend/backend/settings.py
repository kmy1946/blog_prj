from .settings_common import *
from dotenv import (find_dotenv, load_dotenv,)
load_dotenv(find_dotenv())
#from .settings_dev import *

#SECURITY WARNING: don't run with debug turned on in production!

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG=False
ALLOWED_HOSTS = [os.environ.get('ALLOWED_HOSTS')]
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    'loggers': {
        'django': {
            'handlers':['file'],
            'level':'INFO',
        },
        'backend':{
            'handlers':['file'],
            'level':'INFO',
        },
    },
    "handlers": {
        'file': {
            'level':'INFO',
            'class':'logging.handlers.TimedRotatingFileHandler',
            'filename':os.path.join(BASE_DIR, 'backend/logs/django.log'),
            'formatter':'prod',
            'when':'D',
            'interval':1,
            'backupCount':7,
        },
    },
    "formatters": {
        "prod": {
            "format": '\t'.join([
                "%(asctime)s",
                "[%(levelname)s]",
                "%(pathname)s(Line:%(lineno)d)",
                "%(message)s"
                ])
            },
        }
    }
