from unicodedata import name
from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UserViewSet
from . import views

router = SimpleRouter()
router.register('', UserViewSet, basename='users')

urlpatterns = router.urls



urlpatterns = [
  path('', views.UserListView.as_view()),
  path('signup', views.SignupView.as_view()),
  path('register/', views.CustomUserCreate.as_view(), name="create_user"),#############
  path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(), name="blacklist"),
  path('loginuser/',views.LoginUserView.as_view(),name='loginuser'),
  path('authenticated', views.CheckAuthenticatedView.as_view(), name='authenticated'),
]