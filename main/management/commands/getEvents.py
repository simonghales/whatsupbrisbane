from django.core.management.base import BaseCommand, CommandError
from main.models import *

class Command(BaseCommand):
	args = 'None'
	help = 'Retrieves events from the BCC RSS feeds'
	
	def handle(self, *args, **options):
		pass