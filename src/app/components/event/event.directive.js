export default class EventDirective {
    constructor () {
        'ngInject';

        this.templateUrl = 'app/components/event/_event.html';
        this.scope = false;
        this.restrict = 'E';
        this.replace = true;

    }

}
