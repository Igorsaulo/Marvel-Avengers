# Generated by Django 5.0 on 2023-12-23 14:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heros', '0003_alter_hero_id'),
        ('users', '0003_rename_username_user_user_remove_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=200)),
                ('heros', models.ManyToManyField(related_name='groups', to='heros.hero')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='users.user')),
            ],
        ),
    ]
