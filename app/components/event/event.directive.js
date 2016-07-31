export default class EventDirective {
    constructor () {
        'ngInject';

        this.templateUrl = 'app/components/event/_event.html';
        this.scope = {
            data: "="
        };
        this.restrict = 'E';
        this.replace = true;

    }

}
