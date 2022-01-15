from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'#('id', 'author', 'title', 'slug', 'category', 'thumbnail', 'body', 'featured', 'created_at', 'updated_at',)
        lookup_field = 'slug'