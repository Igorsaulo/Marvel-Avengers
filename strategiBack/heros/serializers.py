from rest_framework import serializers
from .models import Hero, Group
from users.models import User

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ['id', 'name', 'image', 'description']

class GroupSerializer(serializers.ModelSerializer):
    heros = HeroSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = ['id','name', 'description', 'user', 'heros']

class GroupCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Group
        fields = ['name', 'description', 'user']
        


class GroupCreateWithHerosSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    heros = serializers.PrimaryKeyRelatedField(queryset=Hero.objects.all(), many=True , write_only=True)

    class Meta:
        model = Group
        fields = ['id','name', 'description', 'user', 'heros']

# serializers.py
class GroupPutSerializer(serializers.ModelSerializer):
    heros = HeroSerializer(many=True)
    
    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'user', 'heros']
        extra_kwargs = {
            'id': {'required': True},
            'name': {'required': True},
            'description': {'required': True},
            'user': {'required': True},
            'heros': {'required': True},
        }

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        instance.heros.clear()

        return instance