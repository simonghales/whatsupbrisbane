import json

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

def test(request):

    response = HttpResponse(json.dumps([{"name": "value", "lat": 333, "lng": 460, "description": "This is a nonsense response"}
                                        ,{"name": "value", "lat": 333, "lng": 460, "description": "This is a nonsense response"}
                                        ,{"name": "value", "lat": 333, "lng": 460, "description": "This is a nonsense response"}
                                        ,{"name": "value", "lat": 333, "lng": 460, "description": "This is a nonsense response"}
                                        ,{"name": "value", "lat": 333, "lng": 460, "description": "This is a nonsense response"}]))  
    response["Access-Control-Allow-Origin"] = "*"  
    response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"  
    response["Access-Control-Max-Age"] = "1000"  
    response["Access-Control-Allow-Headers"] = "*"  
    return response

