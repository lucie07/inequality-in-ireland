mapboxgl.accessToken = 'pk.eyJ1Ijoiemhpd2Vpem91IiwiYSI6ImNrY2dhcmJwaDBxOHcyeXBiZ3I1bHJhc3gifQ.f3EPTWknNq-nuqNxz33aZw';
var map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/zhiweizou/ckd63pgex17xo1hmh9cite56s', // Specify which map style to use
    center: [-7, 53.365659], // Specify the starting position [lng, lat]
    zoom: 6
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'ie',
    mapboxgl: mapboxgl,
    // marker:false,
    placeholder: 'Search for address'

});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));