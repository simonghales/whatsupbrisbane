
import { register } from './vendors/register.js';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import SidebarController from './components/sidebar/sidebar.controller';
import SidebarDirective from './components/sidebar/sidebar.directive';
import SidebarIntroDirective from './components/sidebar/intro/intro.directive';
import SidebarResultsDirective from './components/sidebar/results/results.directive';
import MapController from './components/map/map.controller';
import MapDirective from './components/map/map.directive';
import EventDirective from './components/event/event.directive';
import AutocompleteDirective from './components/ngAutocomplete';
import EventsService from './services/events.service';
import PlacesService from './services/places.service';
import MapsService from './services/maps.service';

angular.module('whatsupbrisbane',
    [

        'moment-picker',
        'uiGmapgoogle-maps',
        'ngMap', // remove this

        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'restangular',
        'ui.router',
        'toastr'
    ]
    )
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController);

register('whatsupbrisbane')
    .controller('SidebarController', SidebarController)
    .directive('sidebar', SidebarDirective)
    .directive('sidebarIntro', SidebarIntroDirective)
    .directive('sidebarResults', SidebarResultsDirective)
    .directive('event', EventDirective)
    .directive('ngAutocomplete', AutocompleteDirective);

register('whatsupbrisbane')
    .controller('MapController', MapController)
    .directive('mainMap', MapDirective);

register('whatsupbrisbane')
    .service('EventsService', EventsService)
    .service('PlacesService', PlacesService)
    .service('MapsService', MapsService);
