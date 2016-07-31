import json
import haversine

from django.shortcuts import render
from django.http import HttpResponse

from .models import EventInfo
from .utilities import *

# Create your views here.
def index(request):
    
    return render(request, 'index.html')

def db(request):

    newData = EventInfo()
    newData.title = "TestOne"
    newData.save()

    dbData = EventInfo.objects.all()
    
    return render(request, 'db.html', {'eventinfo': dbData})

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

def events(request):

    body = request.GET

    lat = float(body['lat'])
    lng = float(body['lng'])
    current_location = (lat,lng)
    
    radius = float(body['radius'])
    timeStart = body['start']
    timeStop = body['end']

    # run function to retrieve from db and filter based on these
    # then return the results in a HttpResponse(json.dumps list

    allEvents = EventInfo.objects.all()
    selectedEvents = []

    for event in allEvents:
        event_location = findOrCreateLatLong(event.venueAddress)
        
        if(event.timeStart.isoformat() >= timeStart and
           event.timeStop.isoformat() <= timeStop and
           haversine.haversine(event_location, current_location) < radius):

            selectedEvents.append({"title": event.title,
                                   "description": event.description,
                                   "cost": event.cost,
                                   "timeStart": event.timeStart.isoformat(),
                                   "timeStop": event.timeStop.isoformat(),
                                   "venue": event.venue,
                                   "address": event.venueAddress,
                                   "lat": event_location[0],
                                   "lng": event_location[1],
                                   "image": event.eventImage,
                                   "bookings": event.bookings,
                                   "category": event.category,
                                   "weblink": event.weblink,
                                   "age": event.age,
                                   "meetingPoint": event.meetingPoint,
                                   "requirements": event.requirements,
                                   "showType": event.showType,
                                   "schedule": event.schedule,
                                   "outdoors": event.outdoors,
                                   })

    response = HttpResponse(json.dumps(selectedEvents))
    response["Access-Control-Allow-Origin"] = "*"  
    response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"  
    response["Access-Control-Max-Age"] = "1000"  
    response["Access-Control-Allow-Headers"] = "*"  
    return response
    
def allEvents(request):

    allEvents = EventInfo.objects.all()
    selectedEvents = []

    for event in allEvents:
        selectedEvents.append({"title": event.title,
                               "description": event.description,
                               "cost": event.cost,
                               "timeStart": event.timeStart.isoformat(),
                               "timeStop": event.timeStop.isoformat(),
                               "venue": event.venue,
                               "address": event.venueAddress,
                               "lat": event_location[0],
                               "lng": event_location[1],
                               "image": event.eventImage,
                               "bookings": event.bookings,
                               "category": event.category,
                               "weblink": event.weblink,
                               "age": event.age,
                               "meetingPoint": event.meetingPoint,
                               "requirements": event.requirements,
                               "showType": event.showType,
                               "schedule": event.schedule,
                               "outdoors": event.outdoors,
                               })
        
    response = HttpResponse(json.dumps(selectedEvents))
    response["Access-Control-Allow-Origin"] = "*"  
    response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"  
    response["Access-Control-Max-Age"] = "1000"  
    response["Access-Control-Allow-Headers"] = "*"  
    return response
    
