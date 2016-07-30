from django.db import models

def text_default():
        return ""

class EventInfo(models.Model):
        
	title = models.TextField(default=text_default)
	description = models.TextField(default=text_default)
	cost = models.TextField(default=text_default)
	timeStart = models.DateTimeField(null=True, blank=True)
	timeStop = models.DateTimeField(null=True, blank=True)
	venue = models.TextField(default=text_default)
	venueAddress = models.TextField(default=text_default)
	latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
	longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
	eventImage = models.TextField(default=text_default)
	bookings = models.TextField(default=text_default)
	category = models.TextField(default=text_default)
	weblink = models.TextField(default=text_default)
	age = models.TextField(default=text_default)
	meetingPoint = models.TextField(default=text_default)
	requirements = models.TextField(default=text_default)
	showType = models.TextField(default=text_default)
	schedule = models.TextField(default=text_default)
	outdoors = models.NullBooleanField()
	imageURL = models.TextField(default=text_default)

class AddressLocation(models.Model):

        address = models.TextField(default=text_default)
        latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
        longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
        
