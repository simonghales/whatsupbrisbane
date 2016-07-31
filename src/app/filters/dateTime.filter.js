export function DateTime(moment) {
    'ngInject';

    return function (val){
        if(!val) return '';

        let dateString = val;

        return moment(dateString).format("ha dddd, MMMM Do");

    };

}


