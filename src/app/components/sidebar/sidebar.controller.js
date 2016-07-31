
import { SIDEBAR_TAB_INTRO, SIDEBAR_TAB_RESULTS } from '../../constants/sidebar';

const _$log = new WeakMap();
const _$scope = new WeakMap();
const _DateService = new WeakMap();
const _MapsService = new WeakMap();
const _PlacesService = new WeakMap();
const _uiGmapGoogleMapApi = new WeakMap();

export default class SidebarController {
    constructor ($log, $scope, DateService, MapsService, PlacesService, uiGmapGoogleMapApi) {
        'ngInject';

        _$log.set(this, $log);
        _$scope.set(this, $scope);
        _DateService.set(this, DateService);
        _MapsService.set(this, MapsService);
        _PlacesService.set(this, PlacesService);
        _uiGmapGoogleMapApi.set(this, uiGmapGoogleMapApi);

        this.config = {
          slider: {
              options: {
                  floor: 1,
                  ceil: 20,
                  onChange: this.updateRadius.bind(this)
              }
          }
        };

        this.data = {
          location: {
              details: null
          }
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

        radius = parseInt(radius) * 1000; // convert from km to m

        _MapsService.get(this).setRadius(radius);
    }

}
