import jwt
import os
from datetime import datetime, timedelta
import dotenv

dotenv.load_dotenv()

class AuthenticationManager:
    @staticmethod
    def checkToken(token):
        token_parts = token.split(' ')
        if len(token_parts) < 2:
            return False
        token = token_parts[1]
        try:
            payload = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False
