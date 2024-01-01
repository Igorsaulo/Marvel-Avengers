from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(e)
            return Response({'error': 'Error inesperado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return wrapper
