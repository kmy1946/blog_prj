from .settings import *
#SECURITY WARNING: don't run with debug turned on in production!
DEBUG=True
ALLOWED_HOSTS = []
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
                "%(pathname)s(Line:%(lineno)d)",
                "%(message)s"
                ])
            },
        }
    }

STATIC_URL = '/static/'
#STATICFILES_ROOT = ( os.path.join(BASE_DIR, 'static'),)#local

STATIC_URL = '/usr/share/nginx/html/static/'

MEDIA_URL = '/media/'
#MEDIA_ROOT = os.path.join(BASE_DIR, 'media')#local
MEDIA_ROOT='/usr/share/nginx/html/media/'
