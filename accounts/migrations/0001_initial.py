# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 20:16
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('adress', models.CharField(default=None, max_length=100)),
                ('phone', models.IntegerField(default=0)),
                ('gander', models.CharField(choices=[('Male', 'M'), ('Female', 'F')], max_length=6)),
                ('skype', models.CharField(max_length=30)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
