from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class EventInfo(models.Model):
	title = models.TextField()
	description = models.TextField()
	cost = models.TextField()
	timeStart = models.DateTimeField()
	timeStop = models.DateTimeField()
	venue = models.TextField()
	venueAddress = models.TextField()
	location = models.TextField()
	latitude = models.CharField()
	longitude = models.CharField()
	eventImage = models.TextField()
	bookings = models.TextField()
	category = models.TextField()
	weblink = models.TextField()
	age = models.TextField()
	meetingPoint = models.TextField()
	requirements = models.TextField()
	showType = models.TextField()
	schedule = models.TextField()
