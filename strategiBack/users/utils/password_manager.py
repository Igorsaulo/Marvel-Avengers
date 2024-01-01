import hashlib
import secrets

class PasswordManager:
    @staticmethod
    def hash_password(password):
        salt = secrets.token_hex(16)
        return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt

    @staticmethod
    def check_password(hashedPassword, userPassword):
        password, salt = hashedPassword.split(':')
        return password == hashlib.sha256(salt.encode() + userPassword.encode()).hexdigest()