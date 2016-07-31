

export function createEventMarker(event, index) {

    console.log("provded event", event);

    let marker = {
        latitude: event.lat,
        longitude: event.lng,
        title: event.title,
        id: index
    };

    return marker;

}