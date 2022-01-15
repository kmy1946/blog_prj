from pyexpat import model
from attr import field, validate
from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth.hashers import make_password#パスワードのハッシュ化

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserAccount
    fields = ('id', 'username','email', 'password')#password追加した
    extra_kwargs = {'password': {'write_only': True}}#


    

##########################################################
    def create(self, validated_data):
      password = validated_data.pop('password', None)
      instance = self.Meta.model(**validated_data)
      if password is not None:
        instance.set_password(password)
      instance.save()
      return instance

    def validate_password(self,value:str) ->str:#ハッシュ値に変換
        return make_password(value)