const _$log = new WeakMap();
const _moment = new WeakMap();

export default class DateService {

    constructor ($log, moment) {
        'ngInject';

        // set up params
        _$log.set(this, $log);
        _moment.set(this, moment);

    }

    // Actions

    getDefaultEndingDate() {

        return _moment.get(this)().startOf('day').add(1, 'days').format();

    }

    getDefaultStartingDate() {

        return _moment.get(this)().startOf('day').format();

    }

    getTimestamp(time) {

        return _moment.get(this)(time).format();

    }

}
