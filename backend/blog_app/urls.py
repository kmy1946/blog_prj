from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import PostViewSet
from . import views

router = SimpleRouter()
router.register('', PostViewSet, basename='posts')

urlpatterns = router.urls
urlpatterns = [
    path('', views.PostListView.as_view()),
    path('featured', views.PostFeaturedView.as_view()),
    path('category', views.PostCategoryView.as_view()),
    path('<slug>', views.PostDetailView.as_view()),
    path('admin/create/', views.CreatePost.as_view(), name='createpost'),
]