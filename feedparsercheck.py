import feedparser

# We need to pull feeds separately to ensure we get as far into the future as possible
powerhouse_rss_url = "http://www.trumba.com/calendars/brisbane-powerhouse.rss"
cityhall_rss_url = "http://www.trumba.com/calendars/city-hall.rss"
kinggeorge_rss_url = "http://www.trumba.com/calendars/king-george-square.rss"
museum_rss_url = "http://www.trumba.com/calendars/mob.rss"

powerhouse_feed = feedparser.parse( powerhouse_rss_url )
cityhall_feed = feedparser.parse( cityhall_rss_url )
kinggeorge_feed = feedparser.parse( kinggeorge_rss_url )
museum_feed = feedparser.parse( museum_rss_url )

items = []
urls = [powerhouse_rss_url, cityhall_rss_url, kinggeorge_rss_url, museum_rss_url]
for url in urls:
    for entry in feedparser.parse(url).entries:
        items.append(entry)




