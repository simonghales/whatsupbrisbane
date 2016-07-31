export default class SidebarDirective {
    constructor () {
        'ngInject';

        this.controller = 'SidebarController';
        this.controllerAs = 'sidebarVM';
        this.templateUrl = 'app/components/sidebar/_sidebar.html';
        this.scope = false;
        this.restrict = 'E';
        this.replace = true;

    }

    compile() {

    }

    link() {

    }

}
