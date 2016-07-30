#Gets the latitude and longitude for the given string
#do NOT let it run heaps
#run some test cases before unleashing it to populate the whole RSS feed
import googlemaps
def addressToLatLong(address):
	gmaps = googlemaps.Client(key="AIzaSyA3U5sV5yEg7KY_Inl1iSaxVdFTXLb7aAk")
	geocode = gmaps.geocode(address)
	latitude = geocode[0]['geometry']['location']['lat']
	longitude = geocode[0]['geometry']['location']['lng']
	return latitude, longitude
