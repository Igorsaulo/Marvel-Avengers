# Generated by Django 5.0 on 2023-12-23 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('heros', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hero',
            name='age',
        ),
        migrations.RemoveField(
            model_name='hero',
            name='alias',
        ),
        migrations.AddField(
            model_name='hero',
            name='description',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='hero',
            name='image',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]