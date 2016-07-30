
import { SIDEBAR_TAB_INTRO, SIDEBAR_TAB_RESULTS } from '../../constants/sidebar';

const _$log = new WeakMap();
const _$scope = new WeakMap();
const _MapsService = new WeakMap();
const _PlacesService = new WeakMap();
const _uiGmapGoogleMapApi = new WeakMap();

export default class SidebarController {
    constructor ($log, $scope, MapsService, PlacesService, uiGmapGoogleMapApi) {
        'ngInject';

        _$log.set(this, $log);
        _$scope.set(this, $scope);
        _MapsService.set(this, MapsService);
        _PlacesService.set(this, PlacesService);
        _uiGmapGoogleMapApi.set(this, uiGmapGoogleMapApi);

        this.data = {
          location: {
              details: null
          }
        };

        this.models = {
            endDate: '',
            location: '',
            radius: 2000,
            startDate: ''
        };

        this.tabs = {
            intro: SIDEBAR_TAB_INTRO,
            results: SIDEBAR_TAB_RESULTS
        };

        this.states = {
            currentTab: SIDEBAR_TAB_INTRO,
            endDateDisabled: false,
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
                this.updateOrigin(latitude, longitude);

            }


        })

        this.updateRadius();

    }

    findEvents() {

        this.navigateForward();

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

        radius = parseInt(radius);

        _MapsService.get(this).setRadius(radius);
    }

}
