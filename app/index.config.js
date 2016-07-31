
import { API_BASE_URL, GOOGLEMAPS_KEY } from './constants'

export function config ($logProvider,
                        RestangularProvider,
                        toastrConfig,
                        uiGmapGoogleMapApiProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  RestangularProvider
      .setBaseUrl(API_BASE_URL);

  uiGmapGoogleMapApiProvider.configure({
    key: GOOGLEMAPS_KEY,
    v: '3',
    libraries: 'places'
  });

}
