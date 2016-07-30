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
