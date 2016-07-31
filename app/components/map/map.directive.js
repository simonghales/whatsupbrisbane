export default class MapDirective {
    constructor () {
        'ngInject';

        this.controller = 'MapController';
        this.controllerAs = 'mapVM';
        this.templateUrl = 'app/components/map/_map.html';
        this.scope = false;
        this.restrict = 'E';
        this.replace = true;

    }

    compile() {

    }

    link() {

    }

}
