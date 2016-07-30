from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import main.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', main.views.index, name='index'),
    url(r'^db', main.views.db, name='db'),
    url(r'^test', main.views.test, name='test'),
    url(r'^events', main.views.events, name='events'),
    url(r'^allEvents', main.views.allEvents, name='allEvents'),
    url(r'^admin/', include(admin.site.urls)),
]
