from .settings_common import *
#from .settings_dev import *

#SECURITY WARNING: don't run with debug turned on in production!
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
