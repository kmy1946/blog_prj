from unicodedata import category
from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Post

class PostAdmin(SummernoteModelAdmin):
  #exclude = ('slug', )
  list_display = ('id', 'title', 'category', 'created_at')#, 'category'
  list_display_links = ('id', 'title')
  search_fields = ('title', )
  list_per_page = 25
  summernote_fields = ('body', )

admin.site.register(Post, PostAdmin)