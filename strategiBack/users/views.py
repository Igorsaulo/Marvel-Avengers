from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils.password_manager import PasswordManager
from django.shortcuts import get_object_or_404
from .models import User
import dotenv
from datetime import datetime, timedelta
import os
import jwt
from strategiBack.utils.handler_error import handle_exceptions

dotenv.load_dotenv()
class UserView(APIView):
    @handle_exceptions    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = PasswordManager.hash_password(serializer.validated_data['password'])
            serializer.save()
            user = get_object_or_404(User, user=serializer.data['user'])
            response = {
                'user': serializer.data,
                'access_token' : UserAuth.generate_token(user)
            }
            return Response(response, status=status.HTTP_201_CREATED)
        return Response({'message': 'Usuário já cadastrado'}, status=400)
    
class UserAuth(APIView):
    @handle_exceptions
    def post(self, request):
        try:
            user = User.objects.get(user=request.data['user'])
        except User.DoesNotExist:
            return Response({'message': 'Usuário não encontrado'}, status=404)
        if PasswordManager.check_password(user.password, request.data['password']):
            access_token = self.generate_token(user)
            return Response({'access_token': access_token}, status=status.HTTP_200_OK)
        return Response({'message': 'Senha inválida'}, status=400)
    
    @classmethod
    def generate_token(cls, user):
        payload = {
            'id': user.id,
            'user': user.user,
            'exp': datetime.utcnow() + timedelta(days=1),
        }
        access_token = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')
        return access_token
    
    @handle_exceptions
    def get(self, request):
        token = request.headers['Authorization']
        token = token.split(' ')[1]
        payload = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms='HS256')
        return Response(payload, status=status.HTTP_200_OK)