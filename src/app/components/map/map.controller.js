
import { STARTING_MARKER } from '../../constants/markers'
import { createEventMarker } from '../../utilities/events'

const _$log = new WeakMap();
const _$scope = new WeakMap();
const _EventsService = new WeakMap();
const _MapsService = new WeakMap();
const _uiGmapGoogleMapApi = new WeakMap();

export default class MapController {
    constructor ($log, $scope, EventsService, MapsService, uiGmapGoogleMapApi) {
        'ngInject';

        _$log.set(this, $log);
        _$scope.set(this, $scope);
        _EventsService.set(this, EventsService);
        _MapsService.set(this, MapsService);
        _uiGmapGoogleMapApi.set(this, uiGmapGoogleMapApi);

        this.config = {

        };

        this.data = {
          markers: []
        };

        this.mapOptions = {
            'maxZoom': 15,
            'minZoom': 4,
            'backgroundColor': '#b0d1d4',
            'panControl': false,
            'zoomControl': true,
            'draggable': true,
            'zoomControlOptions': {
                'position': 'RIGHT_TOP',
                'style': 'SMALL'
            }
        };

        this.state = {
            googlemap: {},
            map: {
                center: {
                    latitude: -27.482534,
                    longitude: 152.979246
                },
                zoom: 14,
                pan: 1,
                options: this.mapOptions,
                control: {}
            },
            originMarker: {
                coords: {
                    latitude: -27.482534,
                    longitude: 152.979246
                },
                options: {
                    icon: STARTING_MARKER
                },
                events: {},
                id: 'boop'
            },
            radiusCircle: {
                center: {
                    latitude: -27.482534,
                    longitude: 152.979246
                },
                radius: 500,
                fill: 'red',
                stroke: ''
            }
        };

        this.states = {
            mapLoaded: false
        };

        this.activate();

    }

    activate() {

        this._loadGoogleMaps();
        this._watchStates();

    }
    
    _loadGoogleMaps() {

        _uiGmapGoogleMapApi.get(this).then((maps) => {
            this.states.mapLoaded = true;
            this._loadEvents();
        });
        
    }

    _dragend(maps, eventName, args) {
        console.log("drag ended", google, maps);
        google.maps.event.trigger(maps,'resize');
    }

    _loadEvents() {

        _EventsService.get(this).getEvents()
            .then((data) => {
                _$log.get(this).debug("events result", data);

                let events = [];

                for(let i = 0, len = data.length; i < len; i++) {
                    let event = createEventMarker(i);
                    events.push(event);
                }

                this.data.events = events;

                console.log("events", events);

            }, (error) => {
                _$log.get(this).warn("failed to retrieve events", error);
            });

    }

    _updateOrigin(origin) {
        this.state.map.center = origin;
        this.state.originMarker.coords = origin;
        this.state.radiusCircle.center = origin;
    }

    _updateRadius(radius) {
        this.state.radiusCircle.radius = radius;
    }

    _watchStates() {

        // Watch Origin
        _$scope.get(this).$watch(() => {
            return _MapsService.get(this).getOrigin();
        }, (newVal, oldVal) => {

            console.log("new origin", newVal);
            if(newVal) {
                this._updateOrigin(newVal);
            }

        });

        // Watch Radius
        _$scope.get(this).$watch(() => {
            return _MapsService.get(this).getRadius();
        }, (newVal, oldVal) => {

            console.log("new radius", newVal);
            if(newVal) {
                this._updateRadius(newVal);
            }

        });

    }

}
