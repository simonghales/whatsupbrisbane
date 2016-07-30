#Gets the latitude and longitude for the given string
#do NOT let it run heaps
#run some test cases before unleashing it to populate the whole RSS feed
import googlemaps
from .models import AddressLocation

def addressToLatLong(address):

        gmaps = googlemaps.Client(key="AIzaSyA3U5sV5yEg7KY_Inl1iSaxVdFTXLb7aAk")
        geocode = gmaps.geocode(address)
        latitude = geocode[0]['geometry']['location']['lat']
        longitude = geocode[0]['geometry']['location']['lng']

        return latitude, longitude

def findOrCreateLatLong(address_input):
                
        try:
            address = AddressLocation.objects.get(address=address_input)
            return (address.lat,address.lng)
        except AddressLocation.DoesNotExist:
            # if it doesn't exist, convert address to lat and lng and add it
            lat,lng = addressToLatLong(address_input)

            address = AddressLocation()
            address.address = event.venueAddress
            address.lat = lat
            address.lng = lng
            address.save()

            return (address.lat,address.lng)
