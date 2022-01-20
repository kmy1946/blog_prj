from rest_framework import serializers
from .models import Post
from accounts.serializers import UserListSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class PostSerializer(serializers.ModelSerializer):
    author = UserListSerializer(read_only=True)
    author_user = serializers.PrimaryKeyRelatedField(source="author", queryset=User.objects.all(), write_only=True)
    class Meta:
        model = Post
        fields = ('id', 'author', 'author_user', 'title', 'slug', 'category', 'thumbnail', 'body', 'featured', 'excerpt', 'created_at', 'updated_at',)#'__all__'
        lookup_field = 'slug'

    def create(self, validated_data):
        return Post.objects.create(**validated_data)