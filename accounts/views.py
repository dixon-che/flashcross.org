# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from accounts.forms import RegistrationForm

from django.views.generic.edit import FormView

from django.contrib.auth.forms import AuthenticationForm

from django.contrib.auth import login


class RegistrationForm(FormView):
    form_class = RegistrationForm
    success_url = "/"
    template_name = "login/reg_form.html"

    def form_valid(self, form):
        form.save()
        return super(RegistrationForm, self).form_valid(form)

class LoginFormView(FormView):
    form_class = AuthenticationForm

    # Аналогично регистрации, только используем шаблон аутентификации.
    template_name = "login/login.html"

    # В случае успеха перенаправим на главную.
    success_url = "/"

    def form_valid(self, form):
        # Получаем объект пользователя на основе введённых в форму данных.
        self.user = form.get_user()

        # Выполняем аутентификацию пользователя.
        login(self.request, self.user)
        return super(LoginFormView, self).form_valid(form)
