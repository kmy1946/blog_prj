from pyexpat import model
from attr import field, validate
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import UserAccount


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'




class UserSerializer(serializers.ModelSerializer):


##################################################################################

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token


##################################################################################

    def create(self, validated_data):
      password = validated_data.pop('password', None)
      instance = self.Meta.model(**validated_data)
      if password is not None:
        instance.set_password(password)
      instance.save()
      return instance



##########################################################
    class Meta:
      model = UserAccount
      fields = ('id', 'username','email', 'password')#password追加した
      extra_kwargs = {'password': {'write_only': True}}#


