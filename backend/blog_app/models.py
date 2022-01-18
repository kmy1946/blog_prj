#from .accounts import UserAccount
import uuid
from django.db import models
from django.contrib.auth import get_user_model
#from jupyterlab_server import slugify
from django.template.defaultfilters import slugify
User = get_user_model()

class Categories(models.TextChoices):
    NO_CATEGORY = 'カテゴリーなし'
    TECHNOLOGY = 'テクノロジー'
    CULTURE = '文化'
    BUSINESS = 'ビジネス'
    SCIENCE = 'サイエンス'
    LIFE_STYLE = '生活'
    TRAVEL= '旅行'

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.NO_CATEGORY)
    thumbnail = models.ImageField(blank=True, null=True)
    body = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    excerpt = models.CharField(max_length=150, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = Post.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Post.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = Post.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except Post.DoesNotExist:
                pass
        
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title