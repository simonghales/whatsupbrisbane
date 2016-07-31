from django.core.management.base import BaseCommand, CommandError
from main.models import *
from main.readRssFeeds import *
from main.utilities import *
from datetime import datetime as dt

class Command(BaseCommand):
	args = 'None'
	help = 'Retrieves events from the BCC RSS feeds'
	
	def handle(self, *args, **options):
		# access RSS feeds
		allData = readRSSFeeds()

		for event in allData:
                        # event is a dictionary describing that event
                        newDBEvent = EventInfo()
                        newDBEvent.title = event['title']
                        newDBEvent.description = event['description']
                        newDBEvent.cost = event['cost']
                        newDBEvent.timeStart = dt.strptime(event['timeStart'],'%Y-%m-%dT%H:%M:%S')
                        newDBEvent.timeStop = dt.strptime(event['timeStop'],'%Y-%m-%dT%H:%M:%S')
                        newDBEvent.venue = event['venue']
                        newDBEvent.venueAddress = event['venueAddress']
                        newDBEvent.eventImage = event['eventImage']
                        newDBEvent.bookings = event['bookings']
                        newDBEvent.category = event['category']
                        newDBEvent.weblink = event['weblink']
                        newDBEvent.age = event['age']
                        newDBEvent.meetingPoint = event['meetingPoint']
                        newDBEvent.requirements = event['requirements']
                        newDBEvent.showType = event['showType']
                        newDBEvent.schedule = event['schedule']
                        newDBEvent.outdoors = event['outdoors']

                        # also add the lat, lng to the other table
                        createLatLong(newDBEvent.venueAddress)

                        newDBEvent.save()


