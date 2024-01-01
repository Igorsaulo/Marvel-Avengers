from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from heros.views import HeroView
from users.views import UserView , UserAuth
from heros.views import HeroView, GroupView, GroupUpdateView

schema_view = get_schema_view(
    openapi.Info(
        title="Strategi API",
        default_version='v1',
        description="Strategi API",
        terms_of_service="https://www.google.com/policies/terms/",
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('heros/', HeroView.as_view()),
    path('users/', UserView.as_view()),
    path('auth/', UserAuth.as_view()),
    path('groups/', GroupView.as_view()),
    path('groups/<int:groupId>', GroupView.as_view()),
    path('group/<int:pk>', GroupUpdateView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
