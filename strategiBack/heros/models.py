from django.db import models
from users.models import User

class Hero(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=60)
    image = models.CharField(max_length=200)
    description = models.TextField()


class Group(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    # relational fields
    heros = models.ManyToManyField(Hero, related_name="groups")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="groups")
