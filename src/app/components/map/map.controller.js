
import { STARTING_MARKER } from '../../constants/markers'
import { DEFAULT_LAT, DEFAULT_LONG } from '../../constants/defaults'

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
            actionEvents: {
                click: this._eventMarkerClick
            }
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
            eventMarkers: null,
            googlemap: {},
            map: {
                center: {
                    latitude: DEFAULT_LAT,
                    longitude: DEFAULT_LONG
                },
                zoom: 14,
                pan: 1,
                options: this.mapOptions,
                control: {}
            },
            originMarker: {
                coords: {
                    latitude: DEFAULT_LAT,
                    longitude: DEFAULT_LONG
                },
                options: {
                    icon: STARTING_MARKER
                },
                events: {},
                id: 'boop'
            },
            radiusCircle: {
                center: {
                    latitude: DEFAULT_LAT,
                    longitude: DEFAULT_LONG
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
        });
        
    }

    _dragend(maps, eventName, args) {
        console.log("drag ended", google, maps);
        google.maps.event.trigger(maps,'resize');
    }

    _eventMarkerClick(marker, eventName) {
        console.log("event marker clicked...", marker, eventName);
        // OPEN A MODAL WITH THE EVENT!!!
    }

    _updateEventMarkers(markers) {
        this.state.eventMarkers = markers;
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

        // Watch Event Markers
        _$scope.get(this).$watch(() => {
            return _MapsService.get(this).getEventMarkers();
        }, (newVal, oldVal) => {

            console.log("new event markers", newVal);
            if(newVal) {
                this._updateEventMarkers(newVal);
            }

        });

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
