
var    fontawesome = require('fontawesome-markers')

console.log("here's font awesome", fontawesome);

const _uiGmapGoogleMapApi = new WeakMap();

export default class MapController {
    constructor (uiGmapGoogleMapApi) {
        'ngInject';

        _uiGmapGoogleMapApi.set(this, uiGmapGoogleMapApi);

        this.marker = {
            coords: {
                latitude: -27.482534,
                longitude: 152.979246
            },
            options: {
                icon: {
                    path: fontawesome.MALE,
                    scale: 0.75,
                    strokeWeight: 1,
                    strokeColor: 'black',
                    strokeOpacity: 1,
                    fillColor: '#fd1164',
                    fillOpacity: 1,
                }
            },
            events: {},
            id: 'boop'
        };

        this.circle = {
            center: {
                latitude: -27.482534,
                longitude: 152.979246
            },
            radius: 1000,
            fill: 'red',
            stroke: ''
        };

        this.states = {
            mapLoaded: false
        };

        this.activate();

    }

    activate() {

        this._loadGoogleMaps();

    }
    
    _loadGoogleMaps() {

        _uiGmapGoogleMapApi.get(this).then((maps) => {
            this.states.mapLoaded = true;
            this.googlemap = {};
            this.map = {
                center: {
                    latitude: -27.484675,
                    longitude: 152.986078
                },
                zoom: 14,
                pan: 1,
                options: this.mapOptions,
                control: {},
                events: {
                    tilesloaded: function (maps, eventName, args) {},
                    dragend: this._dragend,
                    zoom_changed: function (maps, eventName, args) {}
                }
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

        });
        
    }

    _dragend(maps, eventName, args) {
        console.log("drag ended", google, maps);
        google.maps.event.trigger(maps,'resize');
    }
    
}
