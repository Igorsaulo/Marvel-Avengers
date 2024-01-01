# heros/management/commands/run_custom_server.py
from django.core.management.commands.runserver import Command as RunServerCommand
from django.core.signals import request_started
from django.dispatch import receiver
from heros.models import Hero
import httpx
import sys
from dotenv import load_dotenv
import os
from heros.utils.generate_md5_hash import generate_md5_hash
import asyncio

load_dotenv()


class Command(RunServerCommand):

    PRIVATE_KEY = os.getenv("PRIVATE_KEY")
    PUBLIC_KEY = os.getenv("PUBLIC_KEY")

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS(
            "Buscando heróis..."))

        hash = generate_md5_hash("1" + self.PRIVATE_KEY + self.PUBLIC_KEY)
        heros = asyncio.run(self.getHeros(hash))
        heros = self.filterHeros(heros)

        for hero_data in heros:
            hero_obj, created = Hero.objects.get_or_create(
                id=hero_data['id'],
                defaults={
                    'name': hero_data['name'],
                    'image': hero_data['thumbnail']['path'] + '.' + hero_data['thumbnail']['extension'],
                    'description': hero_data['description'],
                }
            )

            if not created:
                hero_obj.name = hero_data['name']
                hero_obj.image = hero_data['thumbnail']['path'] + \
                    '.' + hero_data['thumbnail']['extension']
                hero_obj.description = hero_data['description']
                hero_obj.save()

        self.stdout.write(self.style.SUCCESS(
            "Heróis carregados com sucesso!"))
        sys.exit()

    async def getHeros(self, hash):
        ofsset = 0
        heros = []
        async with httpx.AsyncClient() as client:
            while True:
                url = f"https://gateway.marvel.com/v1/public/characters?limit=100&offset={ofsset}&ts=1&apikey={self.PUBLIC_KEY}&hash={hash}"
                response = await client.get(url, timeout=None)
                data = response.json()
                data_hero = data['data']['results']
                heros.extend(data_hero)
                ofsset += 100
                if len(data_hero) < 100:
                    break
        return heros
    
    def filterHeros(self, heros):
        heros = list(filter(
            lambda hero: hero['description'] 
            != '' and hero['thumbnail']['path'] 
            != '' and hero['name'] != '', heros
            ))
        heros = list(filter(
            lambda hero: "image_not_available" 
            not in hero['thumbnail']['path'], heros
            ))
        
        return heros

