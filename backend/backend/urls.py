from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,

    TokenVerifyView,##################################################################################################################
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('accounts.urls')),#Accounts/signup(Postman)
    path('api/posts/', include('blog_app.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/rest-auth/', include('rest_auth.urls')),
    #path('api/rest-auth/registration/', include('rest_auth.registration.urls')),
    #path('api/rest-auth/', include('rest_auth.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('summernote/', include('django_summernote.urls')),
    #path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),#Accounts/Accounts Signup Successfully(Postman)

    path('api/token/verify/', TokenVerifyView.as_view(),name='token_verify'),#############################################################################################
    
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('api/accounts/', include('accounts.urls'))
] +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]