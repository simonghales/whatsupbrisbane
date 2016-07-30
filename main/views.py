from django.shortcuts import render
from django.http import HttpResponse

from .models import EventInfo

# Create your views here.
def index(request):
    
    return render(request, 'index.html')

def db(request):

    newData = EventInfo()
    newData.title = "TestOne"
    newData.save()

    dbData = EventInfo.objects.all()
    
    return render(request, 'db.html', {'eventinfo': dbdata})

