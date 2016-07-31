
import { SIDEBAR_TAB_INTRO, SIDEBAR_TAB_RESULTS } from '../../constants/sidebar';
import { createEventMarker } from '../../utilities/events'

const _$log = new WeakMap();
const _$scope = new WeakMap();
const _DateService = new WeakMap();
const _EventsService = new WeakMap();
const _MapsService = new WeakMap();
const _PlacesService = new WeakMap();
const _uiGmapGoogleMapApi = new WeakMap();

export default class SidebarController {
    constructor ($log, $scope, DateService, EventsService, MapsService, PlacesService, uiGmapGoogleMapApi) {
        'ngInject';

        _$log.set(this, $log);
        _$scope.set(this, $scope);
        _DateService.set(this, DateService);
        _EventsService.set(this, EventsService);
        _MapsService.set(this, MapsService);
        _PlacesService.set(this, PlacesService);
        _uiGmapGoogleMapApi.set(this, uiGmapGoogleMapApi);

        this.config = {
          slider: {
              options: {
                  floor: 1,
                  ceil: 10,
                  onChange: this.updateRadius.bind(this)
              }
          }
        };

        this.data = {
            events: [],
            location: {
                details: null
            },
            latitude: null,
            longitude: null,
        };

        this.models = {
            endDate: _DateService.get(this).getDefaultEndingDate(),
            location: '',
            radius: 3,
            startDate: _DateService.get(this).getDefaultStartingDate()
        };

        this.tabs = {
            intro: SIDEBAR_TAB_INTRO,
            results: SIDEBAR_TAB_RESULTS
        };

        this.states = {
            currentTab: SIDEBAR_TAB_INTRO,
            endDateDisabled: false,
            fetchingEvents: false,
            startDateDisabled: false
        };

        this.activate();

    }

    activate() {

        _$scope.get(this).$watch(() => {
            return this.data.location.details;
        }, (newVal, oldVal) => {
            console.log("newval", newVal);
            console.log("oldval", oldVal);

            if(newVal) {

                const latitude = newVal.geometry.location.lat();
                const longitude = newVal.geometry.location.lng();
                this.data.latitude = latitude;
                this.data.longitude = longitude;
                this.updateOrigin(latitude, longitude);

            }


        })

        this._watchStates();

        this.updateRadius();

    }

    canFindEvents() {
        let valid = true;

        if(!this.data.latitude || !this.data.longitude) valid = false;

        return valid;
    }

    findEvents() {

        if(this.states.fetchingEvents) return;
        this.states.fetchingEvents = true;

        this._loadEvents();

    }

    navigatePrevious() {
        this.states.currentTab = SIDEBAR_TAB_INTRO;
    }

    navigateForward() {
        this.states.currentTab = SIDEBAR_TAB_RESULTS;
    }

    updateOrigin(latitude, longitude) {
        _MapsService.get(this).setOrigin(latitude, longitude);
    }

    updateRadius() {

        let { radius } = this.models;

        radius = parseInt(radius) * 1000; // convert from km to m

        _MapsService.get(this).setRadius(radius);
    }

    _loadEvents() {

        const latitude = this.data.latitude;
        const longitude = this.data.longitude;
        const radius = this.models.radius;
        const start = _DateService.get(this).getTimestamp(this.models.startDate);
        const end = _DateService.get(this).getTimestamp(this.models.endDate);

        _EventsService.get(this).fetchEvents(latitude, longitude, radius, start, end)
            .then((data) => {
                _$log.get(this).debug("events result", data);

                _EventsService.get(this).setEvents(data.plain());

                _MapsService.get(this).createAndSetEventMarkers(data.plain());

                this.states.fetchingEvents = false;

                this.navigateForward();

            }, (error) => {
                _$log.get(this).warn("failed to retrieve events", error);
                this.states.fetchingEvents = false;
            });

    }

    _updateEvents(events) {
        this.data.events = events;
    }

    _watchStates() {

        // Watch Origin
        _$scope.get(this).$watch(() => {
            return _EventsService.get(this).getEvents();
        }, (newVal, oldVal) => {

            console.log("new events", newVal);
            if(newVal) {
                this._updateEvents(newVal);
            }

        });

    }

}
