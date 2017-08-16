from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from flashcross import views

from account import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url('^auth/', include('social.apps.django_app.urls', namespace='social')),
    url(r'^$', views.login, name='login'),
    url('^', include('django.contrib.auth.urls')),
    url(r'^accounts/', include('account.urls', namespace='account')),
    url(r'^accounts/', include('registration.backends.default.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)