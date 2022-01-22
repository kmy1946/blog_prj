import os
from pathlib import Path
from datetime import timedelta
from dotenv import (find_dotenv, load_dotenv,)
load_dotenv(find_dotenv())

BASE_DIR = Path(__file__).resolve().parent.parent

##SECRET_KEY = None#os.environ.get('SECRET_KEY')
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django_summernote',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',

    'rest_framework_simplejwt.token_blacklist',
    'rest_auth',
    'rest_auth.registration',
    #'rest_framework_simplejwt',
    'djoser',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    'accounts',
    'blog_app.apps.BlogAppConfig',
]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',#
    'django.middleware.common.CommonMiddleware',#
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

SUMMERNOTE_THEME = 'bs4'

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000'
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],#'DIRS': [os.path.join(BASE_DIR), 'build'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',#django.db.backends.postgresql
    'NAME': os.environ.get('DB_NAME'),
    'USER': os.environ.get('DB_USER'),
    'PASSWORD': os.environ.get('DB_PASSWORD'),
    'HOST': os.environ.get('HOST'),
    'PORT': os.environ.get('PORT'),
  }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_PORT = os.environ.get('EMAIL_PORT')
EMAIL_HOST_USER = os.environ.get('EMAIL_ADDRESS')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD')
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = os.environ.get('EMAIL_ADDRESS')

STATIC_URL = '/static/'
STATICFILES_ROOT = (
    os.path.join(BASE_DIR, 'static'),
)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_USE_JWT = True
REST_SESSION_LOGIN = True
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        #'rest_framework.permissions.IsAdminUser'
        'rest_framework.permissions.IsAuthenticated',
        #'rest_framework.permissions.AllowAny'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.BasicAuthentication',# HTTPヘッダにセッションIDを付与してAPIに渡す
        'rest_framework.authentication.SessionAuthentication',# ブラウザにログイン・ログアウトの機能を提供する
        'rest_framework.authentication.TokenAuthentication',# トークン認証の機能を提供する
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    #'PAGE_SIZE': 3,#react側でmap処理に影響
    'NON_FIELD_ERRORS_KEY': 'detail', # 変更
    'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'accounts.serializers.UserSerializer'
}
CORS_ORIGIN_ALLOW_ALL = True

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=50),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,#
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': '',##SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('JWT',),#'Bearer'
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

DJOSER = {
    'LOGIN_FIELD': 'email',
    'SEND_ACTIVATION_EMAIL': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'USERNAME_RESET_CONFIRM_URL': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'SET_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'SERIALIZERS': {
        'user_create': 'accounts.serializers.UserSerializer',
        'user': 'accounts.serializers.UserSerializer',
        'current_user': 'accounts.serializers.UserSerializer',
    },
    'EMAIL': {
        'activation': 'accounts.email.ActivationEmail',
        'confirmation': 'accounts.email.ConfirmationEmail',
        'password_reset': 'accounts.email.PasswordResetEmail',
        'password_changed_confirmation': 'accounts.email.PasswordChangedConfirmationEmail',
        'username_reset': 'accounts.email.UsernameResetEmail',
        'username_change_confirmation': 'accounts.email.UsernameChangedConfirmationEmail',
    }
}
AUTH_USER_MODEL = 'accounts.UserAccount'

FILE_UPLOAD_PERMISSIONS = 0o640
