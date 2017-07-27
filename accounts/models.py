# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.contrib.auth.models import User

from django.db.models.signals import post_save


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    adress = models.CharField(max_length=100, default=None)
    phone = models.IntegerField(default=0)
    GANDER_CHOISE =(
		('Male', 'M'),
		('Female', 'F')
		)
    gander = models.CharField(max_length=6, choices=GANDER_CHOISE)
    skype = models.CharField(max_length=30)


    def __str__(self):
        return self.user.username


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])
