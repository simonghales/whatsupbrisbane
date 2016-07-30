export default class SidebarIntroDirective {
    constructor () {
        'ngInject';

        this.templateUrl = 'app/components/sidebar/intro/_intro.html';
        this.scope = false;
        this.restrict = 'E';
        this.replace = true;

    }

}
