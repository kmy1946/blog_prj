from sys import exec_prefix
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserAccount
from .serializers import UserSerializer, UserListSerializer

from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

class CustomUserCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):###########################################
        reg_serializer = UserSerializer(data=request.data)
        if reg_serializer.is_valid():
            UserAccount = reg_serializer.save()
            if UserAccount:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer

#############################################↓

class UserListView(ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserListSerializer
    permission_classes = (permissions.AllowAny, )

class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error': 'Password must be at least 6 characters'})
                else:
                    user = User.objects.create_user(email=email, password=password, username=username)

                    user.save()
                    return Response({'success': 'User created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})


class BlacklistTokenUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            exception_deal = 'Black List Token Exception'
            return Response(status=status.HTTP_400_BAD_REQUEST + exception_deal)

###############################################################################


class LoginUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserListSerializer
    def get_object(self):
        return self.request.user #ログインしているユーザーを返す
    #PUTを無効化
    def update(self, request, *args, **kwargs):
        response = {"message": 'PUT method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


###############################################################################