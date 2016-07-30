
const _uiGmapGoogleMapApi = new WeakMap();

export default class MapController {
    constructor ($scope, $timeout, uiGmapGoogleMapApi) {
        'ngInject';

        $scope.map = {
            center: {
                latitude: 51.219053,
                longitude: 4.404418
            },
            zoom: 14
        };
        $scope.options = {
            scrollwheel: false
        };

        _uiGmapGoogleMapApi.set(this, uiGmapGoogleMapApi);

        this.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 8
        };

        this.states = {
            mapLoaded: false
        };

        $timeout(() => {
            this.activate();
        }, 200);

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
                    latitude: -27.496761,
                    longitude: 153.019534
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
            console.log("thingy is ready", this);

        });
        
    }

    _dragend(maps, eventName, args) {
        console.log("drag ended", google, maps);
        google.maps.event.trigger(maps,'resize');
    }
    
}
