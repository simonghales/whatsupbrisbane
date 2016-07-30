const _$log = new WeakMap();
const _$http = new WeakMap();
const _$q = new WeakMap();

import { GOOGLEPLACES_BASE_URL, GOOGLEMAPS_KEY } from '../constants'
import { SEARCH_AUTOCOMPLETE } from '../constants/endpoints'

export default class PlacesService {

    constructor ($log, $http, $q) {
        'ngInject';

        // set up params
        _$log.set(this, $log);
        _$http.set(this, $http);
        _$q.set(this, $q);

        this.baseUrl = GOOGLEPLACES_BASE_URL;

    }

    // Actions

    searchAutocomplete(input) {

        return _$http.get(this)({
            method: 'GET',
            url: this.baseUrl + SEARCH_AUTOCOMPLETE,
            params: {
                key: GOOGLEMAPS_KEY,
                input: input
            }
        });

    }


}
