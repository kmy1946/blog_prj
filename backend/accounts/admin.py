from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAdminCustom(UserAdmin):
  fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': (
        'username',
        'email',
        'password',
        'is_active',
        'is_staff',
        'is_superuser',
      )
    }),
  )

  list_display = (
    'id',
    'username',
    'email',
    'is_active',
  )

  list_filter = ()

  search_fields = ('email',)

  ordering = ('id',)

admin.site.register(User, UserAdminCustom)