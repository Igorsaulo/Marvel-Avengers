from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Hero, Group
from .serializers import HeroSerializer, GroupSerializer, GroupCreateSerializer, GroupCreateWithHerosSerializer, GroupPutSerializer
from django.core.paginator import Paginator
from users.utils.authentication_manager import AuthenticationManager
import random
from django.shortcuts import get_object_or_404
from strategiBack.utils.handler_error import handle_exceptions
from django.http import Http404
from rest_framework.generics import UpdateAPIView


class HeroView(APIView):
    @handle_exceptions
    def get(self, request):
        token = request.headers.get('Authorization')
        user = None

        if token:
            user = AuthenticationManager.checkToken(token)

        heros, total_pages = self.paginate_heros(self.get_heros_for_user(user), request)

        response_data = {
            'heros': HeroSerializer(heros, many=True).data
        }

        if total_pages is not None:
            response_data['totalPages'] = total_pages

        return Response(response_data, status=status.HTTP_200_OK)

    def get_heros_for_user(self, user):
        if user and 'id' in user:
            user_group_ids = Group.objects.filter(
                user_id=user['id']).values_list('id', flat=True)
            return Hero.objects.exclude(groups__id__in=user_group_ids)
        else:
            return Hero.objects.all()

    def paginate_heros(self, heros, request):
        offset = request.query_params.get('offset')
        limit = request.query_params.get('limit')

        if offset and limit:
            paginator = Paginator(heros, limit)
            page = int(offset) // int(limit) + 1
            total_pages = paginator.num_pages
            return paginator.get_page(page), total_pages
        else:
            return heros, None


class GroupView(APIView):
    @handle_exceptions
    def post(self, request):
        token = request.headers.get('Authorization')
        user = None

        if token:
            user = AuthenticationManager.checkToken(token)
            print(user)
        if user and 'id' in user:
            self.prepare_request_data(request, user)
            serializer = self.get_serializer(request)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def prepare_request_data(self, request, user):
        request.data['user'] = user['id']
        request.data['id'] = random.randint(1, 1000000)

    def get_serializer(self, request):
        if 'heros' in request.data:
            return GroupCreateWithHerosSerializer(data=request.data)
        else:
            return GroupCreateSerializer(data=request.data)

    @handle_exceptions
    def get(self, request):
        user = AuthenticationManager.checkToken(
            request.headers.get('Authorization'))

        if user:
            groups, total_pages = self.get_groups(request, user)
            response_data = {
                'groups': GroupSerializer(groups, many=True).data
            }

            if total_pages is not None:
                response_data['totalPages'] = total_pages

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def get_groups(self, request, user):
        group_id = request.query_params.get('groupId')

        if group_id:
            return self.get_single_group(group_id), None
        else:
            return self.get_user_groups(request, user)

    def get_single_group(self, group_id):
        try:
            return Group.objects.filter(id=group_id)
        except Group.DoesNotExist:
            raise Http404

    def get_user_groups(self, request, user):
        user_group_ids = Group.objects.filter(
            user_id=user['id']).values_list('id', flat=True)
        groups = Group.objects.filter(id__in=user_group_ids)

        offset = request.query_params.get('offset')
        limit = request.query_params.get('limit')

        if offset and limit:
            paginator = Paginator(groups, limit)
            page = int(offset) // int(limit) + 1
            total_pages = paginator.num_pages
            return paginator.get_page(page), total_pages
        return groups, None



    @handle_exceptions
    def patch(self, request, groupId):
        user = AuthenticationManager.checkToken(
            request.headers.get('Authorization'))
        group = get_object_or_404(Group, id=groupId)
        if group.user.id != user['id']:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        heros_data = request.data.get('heros', [])
        for hero_id in heros_data:
            hero = get_object_or_404(Hero, id=hero_id)
            group.heros.add(hero)

        return Response({'detail': 'Heroes added successfully.'}, status=status.HTTP_200_OK)

class GroupUpdateView(UpdateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupPutSerializer

    @handle_exceptions
    def put(self, request, pk):
        instance = self.get_object()
        heros_data = request.data.pop('heros')

        serializer = GroupPutSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        instance.heros.clear()

        for hero_data in heros_data:
            hero_id = hero_data['id']
            hero = get_object_or_404(Hero, id=hero_id)
            instance.heros.add(hero)

        return Response({'detail': 'Group updated successfully.'}, status=status.HTTP_200_OK)


