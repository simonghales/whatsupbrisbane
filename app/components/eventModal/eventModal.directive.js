export default class EventModalDirective {
    constructor () {
        'ngInject';

        this.templateUrl = 'app/components/eventModal/_eventModal.html';
        this.scope = false;
        this.restrict = 'E';
        this.replace = true;

    }

}
