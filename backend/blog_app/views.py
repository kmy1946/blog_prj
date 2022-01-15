from rest_framework import generics, permissions, viewsets
from .models import Post
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostListView(ListAPIView):
    queryset = Post.objects.order_by('created_at')
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

class PostFeaturedView(ListAPIView):
    queryset = Post.objects.all().filter(featured=True)
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

class PostCategoryView(APIView):
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        category = data['category']
        queryset = Post.objects.order_by('created_at').filter(category__iexact=category)

        serializer = PostSerializer(queryset, many=True)

        return Response(serializer.data)



class CreatePost(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]#[permissions.IsAuthenticated]#
    queryset = Post.objects.all()
    serializer_class = PostSerializer