from .settings_common import *
#from .settings_dev import *
from dotenv import (find_dotenv, load_dotenv,)
load_dotenv(find_dotenv())

#SECURITY WARNING: don't run with debug turned on in production!
DEBUG=True
ALLOWED_HOSTS = ['*']#os.environ.get('ALLOWED_HOSTS')
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    'loggers': {
        'django': {
            'handlers':['console'],
            'level':'INFO',
        },
        'backend':{
            'handlers':['console'],
            'level':'DEBUG',
        },
    },
    "handlers": {
        'console': {
            'level':'DEBUG',
            'class':'logging.StreamHandler',
            'formatter':'dev'
        },
    },
    "formatters": {
        "dev": {
            "format": '\t'.join([
                "%(asctime)s",
                "[%(levelname)s]",
                "%(pathname)s(Line:%(Lineno)d)",
                "%(message)s"
                ])
            },
        }
    }
