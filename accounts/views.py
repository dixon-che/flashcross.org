# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from accounts.forms import RegistrationForm

from django.views.generic.edit import FormView


class RegistrationForm(FormView):
    form_class = RegistrationForm
    success_url = "/"
    template_name = "login/reg_form.html"

    def form_valid(self, form):
        form.save()
        return super(RegistrationForm, self).form_valid(form)


