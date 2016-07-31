const _$log = new WeakMap();
const _$http = new WeakMap();
const _$q = new WeakMap();
const _Restangular = new WeakMap();

import { GET_EVENTS } from '../constants/endpoints'

export default class EventsService {

    constructor ($log, $http, $q, Restangular) {
        'ngInject';

        // set up params
        _$log.set(this, $log);
        _$http.set(this, $http);
        _$q.set(this, $q);
        _Restangular.set(this, Restangular);

        this.state = {
          events: null
        };

    }

    // Actions

    getEvents() {
        return this.state.events;
    }

    fetchEvents(lat, lng, radius, start, end) {

        let params = {
            lat,
            lng,
            radius,
            start,
            end
        };

        return _Restangular.get(this).all(GET_EVENTS).getList(params);

    }

    setEvents(events) {
        this.state.events = events;
    }


}
