#Gets RSS feeds and fills a list of dictionaries.
from bs4 import BeautifulSoup

from urllib import request

def readRSSFeeds():
	eventSchema = {
		"title" : [],
		"description" : [],
		"cost" : [],
		"timeStart" : [],
		"timeStop" : [],
		"venue" : [],
		"venueAddress" : [],
		"latitude" : [],
		"longitude" : [],
		"eventImage" : [],
		"bookings" : [],
		"category" : [],
		"weblink" : [],
		"age" : [],
		"meetingPoint" : [],
		"requirements" : [],
		"showType" : [],
		"schedule" : [],
		"outdoors" : []
		}

	response = request.urlopen("http://www.trumba.com/calendars/events-in-brisbane.rss")
	bulktext = response.read().decode("utf-8")

	#Splits the events up into a list
	items = bulktext.split("<item>")
	items.pop(0) #Not an event
	totalEventCount=0

	for event in items:
		#if totalEventCount==50:
		#	break
		eventSoup=BeautifulSoup(event, "html.parser")
		#check whether event is already captured
		captured=False
		for element in eventSoup:
			if element.name=="x-trumba:localstart":
				startTime=element.string
		eventTitle=eventSoup.title.string
		for i in range(len(eventSchema['title'])):
			if eventSchema['title'][i]==eventTitle:
				if eventSchema['timeStart'][i]==startTime:
					captured=True
					break

		if captured==False:
			eventSchema=eventAdd(eventSchema,eventSoup)
			totalEventCount+=1

	return eventSchema

def eventAdd(eventSchema,eventSoup):
	for key in eventSchema:
		eventSchema[key].append("")
	ignore=["category","description","link","x-trumba:ealink","guid",
		"x-trumba:masterid","xcal:summary","xcal:location","xcal:dtstart",
		"x-trumba:formatteddatetime","xcal:dtend","x-microsoft:cdo-alldayevent",
		"xcal:uid","Image","Event Type","Programs","Boat ramp information",
		"Boat ramp facilities","Community hall"]
	for element in eventSoup:
		if element.name=="x-trumba:localstart":
			eventSchema["timeStart"][-1]=element.string
		elif element.name=="x-trumba:localend":
			eventSchema["timeStop"][-1]=element.string
		elif element.name=="title":
			eventSchema['title'][-1]=element.string
		elif element.name=="xcal:description":
			eventSchema['description'][-1]=element.string
		elif element.name=="x-trumba:weblink":
			eventSchema["weblink"][-1]=element.string
		elif element.name=="x-trumba:categorycalendar":
			eventSchema["category"][-1]=element.string.split("|")[1]
		elif element.name=="x-trumba:customfield":
			elementName=element.attrs["name"]
			if elementName=="Event image":
				eventSchema["eventImage"][-1]=element.string
			elif elementName=="Schedule":
				eventSchema["schedule"][-1]=element.string
			elif elementName=="Cost":
				eventSchema["cost"][-1]=element.string
			elif elementName=="Venue":
				eventSchema["venue"][-1]=element.string
			elif elementName=="Venue address":
				eventSchema["venueAddress"][-1]=element.string
			elif elementName=="Bookings":
				eventSchema["bookings"][-1]=element.string
			elif elementName=="Meeting point":
				eventSchema["meetingPoint"][-1]=element.string
			elif elementName=="Requirements":
				eventSchema["requirements"][-1]=element.string
			elif elementName=="Age":
				eventSchema["age"][-1]=element.string
			elif elementName=="Show type":
				eventSchema["showType"][-1]=element.string
			elif elementName=="":
				eventSchema[""][-1]=element.string
			elif elementName in ignore:
				continue
			else:
				print(eventSoup.title)
				print("Capture Me Customfield:\n",elementName,element.string,"\n")
		elif element.name in ignore:
			continue
		else:
			if type(element.name) == type(""):
				print(eventSoup.title)
				print("Capture Me :",element.name,"\n")
	return eventSchema

#x=readRSSFeeds()
#print(x["schedule"])