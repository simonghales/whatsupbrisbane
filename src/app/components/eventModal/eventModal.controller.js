export default class EventModalDirective {
    constructor () {
        'ngInject';

        this.controller - 'EventModalController';
        this.controllerAs - 'eventModalVM';
        this.templateUrl = 'app/components/eventModal/_eventModal.html';
        this.scope = false;
        this.restrict = 'E';
        this.replace = true;

    }

}
