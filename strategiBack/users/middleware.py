from .utils.authentication_manager import AuthenticationManager
from django.http import JsonResponse
from rest_framework.response import Response


class AuthMiddleware:
    protected_routes = [
        {
            'url': '/heros/',
            'methods': ['GET']
        },
        {
            'url': '/groups/',
            'methods': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        }
    ]

    def __init__(self, get_response):
        self.get_response = get_response

    def is_protected_route(self, request):
        current_route = request.path_info
        current_method = request.method
        for route in self.protected_routes:
            if current_route.startswith(route['url']) and current_method in route['methods']:
                return True
        return False

    def __call__(self, request):
        if self.is_protected_route(request):
            token = request.headers.get('Authorization')
            if not token:
                return JsonResponse({'message': 'Unauthorized'}, status=401)
            else:
                user = AuthenticationManager.checkToken(token)
                if not user:
                    return JsonResponse({'message': 'Unauthorized'}, status=401)

        response = self.get_response(request)

        return response
