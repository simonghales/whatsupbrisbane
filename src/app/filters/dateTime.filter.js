export function DateTime(moment) {
    'ngInject';

    return function (val){
        if(!val) return '';

        let dateString = val;

        console.log("filter this", dateString);

        return moment(dateString).format("ha dddd, MMMM Do");


    };

}


