from django.shortcuts import render
from django.http import HttpResponse

from .models import Greeting
from .models import EventInfo

# Create your views here.
def index(request):
    
    newData = EventInfo()
    newData.title = "TestOne"
    newData.save()

    dbData = EventInfo.objects.all()
    
    return render(request, 'db.html', {'greetings': dbdata})
    #return render(request, 'index.html')


def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

