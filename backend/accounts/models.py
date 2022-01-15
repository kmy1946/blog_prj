from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
  def create_user(self, email, username, password=None):
    if not email:
      raise ValueError('メールアドレスは必須です')

    email = self.normalize_email(email)
    email = email.lower()

    user = self.model(email=email, username=username)

    user.set_password(password)
    user.save()

    return user

  def create_superuser(self, email, username, password):
    user = self.create_user(email, username, password)

    #user.is_admin = True
    user.is_superuser = True
    user.is_staff = True
    user.save()

    return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=255, unique=True)
  username = models.CharField(max_length=255)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  def get_full_name(self):
    return self.username

  def get_short_name(self):
    return self.username

  def __str__(self):
    return self.email 