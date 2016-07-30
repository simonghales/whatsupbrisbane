
import { register } from './vendors/register.js';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import SidebarController from './components/sidebar/sidebar.controller';
import SidebarDirective from './components/sidebar/sidebar.directive';
import MapController from './components/map/map.controller';
import MapDirective from './components/map/map.directive';

angular.module('whatsupbrisbane',
    [

        'uiGmapgoogle-maps',
        'ngMap',

        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'restangular',
        'ui.router',
        'toastr']
    )
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController);

register('whatsupbrisbane')
    .controller('SidebarController', SidebarController)
    .directive('sidebar', SidebarDirective);

register('whatsupbrisbane')
    .controller('MapController', MapController)
    .directive('mainMap', MapDirective);