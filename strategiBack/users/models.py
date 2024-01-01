from django.db import models

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)