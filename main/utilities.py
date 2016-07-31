#Gets the latitude and longitude for the given string
#do NOT let it run heaps
#run some test cases before unleashing it to populate the whole RSS feed
import googlemaps 
from .models import AddressLocation

def addressToLatLong(address):

        gmaps = googlemaps.Client(key="AIzaSyA3U5sV5yEg7KY_Inl1iSaxVdFTXLb7aAk")
        geocode = gmaps.geocode(address)

        if(len(geocode) != 0):
                latitude = geocode[0]['geometry']['location']['lat']
                longitude = geocode[0]['geometry']['location']['lng']

                return float(latitude), float(longitude)
        else:
                return None,None

def findOrCreateLatLong(addressInput):
                
        try:
            address = AddressLocation.objects.get(address=addressInput)
            if(address.latitude == None or address.longitude == None):
                    return None,None
            else:
                    return (float(address.latitude),float(address.longitude))
        except AddressLocation.DoesNotExist:
            # if it doesn't exist, convert address to lat and lng and add it
            lat,lng = addressToLatLong(addressInput)

            address = AddressLocation()
            address.address = addressInput
            address.latitude = lat
            address.longitude = lng
            address.save()

            return (address.latitude,address.longitude)

def createLatLong(addressInput):

        try:
            address = AddressLocation.objects.get(address=addressInput)
        except AddressLocation.DoesNotExist:
            lat,lng = addressToLatLong(addressInput)

            address = AddressLocation()
            address.address = addressInput
            address.latitude = lat
            address.longitude = lng
            address.save()

        return
