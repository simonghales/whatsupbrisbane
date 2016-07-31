import { createEventMarker } from '../utilities/events';

const _$log = new WeakMap();

export default class MapsService {

    constructor ($log) {
        'ngInject';

        // set up params
        _$log.set(this, $log);

        this.state = {
            eventMarkers: [],
            origin: null,
            radius: null,
        };

    }

    createAndSetEventMarkers(events) {

        let markers = [];

        for(let i = 0, len = events.length; i < len; i++) {
            let event = events[i];
            let marker = createEventMarker(event, i);
            markers.push(marker);
        }

        this.setEventMarkers(markers);

    }

    getEventMarkers() {
        return this.state.eventMarkers
    }

    getOrigin() {
        return this.state.origin;
    }

    getRadius() {
        return this.state.radius;
    }

    setEventMarkers(eventMarkers) {
        this.state.eventMarkers = eventMarkers;
    }

    setOrigin(latitude, longitude) {
        this.state.origin = {
            latitude,
            longitude
        };
    }

    setRadius(radius) {
        this.state.radius = radius;
    }


}
