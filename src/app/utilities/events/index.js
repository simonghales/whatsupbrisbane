
const exampleCoords = [
    {
        latitude: -27.484566,
        longitude: 152.982945,
    },
    {
        latitude: -27.492104,
        longitude: 152.980628,
    },
    {
        latitude: -27.485632,
        longitude: 152.993588,
    },
    {
        latitude: -27.486926,
        longitude: 152.980585,
    },
    {
        latitude: -27.493512,
        longitude: 152.993417,
    },
    {
        latitude: -27.482548,
        longitude: 152.996721,
    },
    {
        latitude: -27.480035,
        longitude: 152.981486,
    },
];

export function createEventMarker(index) {

    let event = {
        latitude: exampleCoords[index].latitude,
        longitude: exampleCoords[index].longitude,
        title: 'Event: ' + index,
        id: index
    };

    return event;

}