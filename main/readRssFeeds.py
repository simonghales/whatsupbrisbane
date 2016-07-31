#Gets RSS feeds and fills a list of dictionaries.
from bs4 import BeautifulSoup

from urllib import request

eventSchemaTemplate = {
		"title" : "",
		"description" : "",
		"cost" : "",
		"timeStart" : "",
		"timeStop" : "",
		"venue" : "",
		"venueAddress" : "",
		"eventImage" : "",
		"bookings" : "",
		"category" : "",
		"weblink" : "",
		"age" : "",
		"meetingPoint" : "",
		"requirements" : "",
		"showType" : "",
		"schedule" : "",
		"outdoors" : ""
		}

def readRSSFeeds():
	eventList=[]
	response = request.urlopen("http://www.trumba.com/calendars/events-in-brisbane.rss")
	bulktext = response.read().decode("utf-8")

	#Splits the events up into a list
	items = bulktext.split("<item>")
	items.pop(0) #Not an event
	totalEventCount=0



	for event in items:
		#if totalEventCount==1:
		#	break
		eventSoup=BeautifulSoup(event, "html.parser")
		#check whether event is already captured
		captured=False
		for element in eventSoup:
			if element.name=="x-trumba:localstart":
				startTime=element.string
		eventTitle=eventSoup.title.string
		
		for i in range(len(eventList)):
			if eventList[i]['title']==eventTitle:
				if eventList[i]['timeStart']==startTime:
					captured=True
					print(False," ",totalEventCount, eventTitle)
					break
		
		if captured==False:
			eventList.append(eventPopulate(eventSoup))
			totalEventCount+=1

	return eventList

def eventPopulate(eventSoup):
	eventSchema=eventSchemaTemplate.copy()
	ignore=["category","description","link","x-trumba:ealink","guid",
		"x-trumba:masterid","xcal:summary","xcal:location","xcal:dtstart",
		"x-trumba:formatteddatetime","xcal:dtend","x-microsoft:cdo-alldayevent",
		"xcal:uid","Image","Event Type","Programs","Boat ramp information",
		"Boat ramp facilities","Community hall"]
	for element in eventSoup:
		if element.name=="x-trumba:localstart":
			eventSchema["timeStart"]=element.string
		elif element.name=="x-trumba:localend":
			eventSchema["timeStop"]=element.string
		elif element.name=="title":
			eventSchema['title']=element.string
		elif element.name=="xcal:description":
			eventSchema['description']=element.string
		elif element.name=="x-trumba:weblink":
			eventSchema["weblink"]=element.string
		elif element.name=="x-trumba:categorycalendar":
			eventSchema["category"]=element.string.split("|")[1]
		elif element.name=="x-trumba:customfield":
			elementName=element.attrs["name"]
			if elementName=="Event image":
				eventSchema["eventImage"]=element.string
			elif elementName=="Schedule":
				eventSchema["schedule"]=element.string
			elif elementName=="Cost":
				eventSchema["cost"]=element.string
			elif elementName=="Venue":
				eventSchema["venue"]=element.string
			elif elementName=="Venue address":
				eventSchema["venueAddress"]=element.string
			elif elementName=="Bookings":
				eventSchema["bookings"]=element.string
			elif elementName=="Meeting point":
				eventSchema["meetingPoint"]=element.string
			elif elementName=="Requirements":
				eventSchema["requirements"]=element.string
			elif elementName=="Age":
				eventSchema["age"]=element.string
			elif elementName=="Show type":
				eventSchema["showType"]=element.string
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
		for i in eventSchema:
			if eventSchema[i] == None:
				eventSchema[i]=""
	return eventSchema

"""
x=readRSSFeeds()
for i in x:
	print(i["title"])
	for f in i:
		print(len(i[f]))
""