mapboxgl.accessToken = 'pk.eyJ1Ijoiemhpd2Vpem91IiwiYSI6ImNrY2dhcmJwaDBxOHcyeXBiZ3I1bHJhc3gifQ.f3EPTWknNq-nuqNxz33aZw';
var map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/zhiweizou/ckd63pgex17xo1hmh9cite56s', // Specify which map style to use
    center: [-7, 53.365659], // Specify the starting position [lng, lat]
    zoom: 6
});

// data switch
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

var layerId;
var userstyleId = 'ckd63pgex17xo1hmh9cite56s';

function switchLayer(layer) {
    layerId = layer.target.id;
    console.log(layerId);
    userstyleId = layerId;
    console.log(userstyleId);
    map.setStyle('mapbox://styles/zhiweizou/' + layerId);

}

for (var i = 0; i < inputs.length; i++) {

    inputs[i].onclick = switchLayer;

}

var hoveredCountyId = null;
var hoveredSmallAreaId = null;

// Target the relevant span tags in the quakeInfo div
var hpsDisplay = document.getElementById('hps');
var locDisplay = document.getElementById('loc');
// Create a popup(County&smallArea), but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

var zoomThreshold = 10;
var countyLegendEl = document.getElementById('county-legendContainer');
var smallAreaLegendEl = document.getElementById('smallArea-legendContainer');
//initialize legend
smallAreaLegendEl.style.display = 'none';
countyLegendEl.style.display = 'block';

map.on('style.load', function () {
    // load county layer geojson
    map.addSource("counties", {
        "type": "geojson",
        "data": "./../dataGeo/cMap.geojson",
        'generateId': true // This ensures that all features have unique IDs
    });

    // load small area layer geojon
    map.addSource("smallArea", {
        "type": "geojson",
        "data": "./../dataGeo/sMap.geojson",
        'generateId': true // This ensures that all features have unique IDs
    });

    // style county layer
    map.addLayer({
        "id": "county-fills",
        "type": "fill",
        "source": "counties",
        "layout": {},
        "paint": {
            "fill-color": "#FFFFFF",
            "fill-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                0.2,
                0
            ]
        }
    });
    map.addLayer(
        {
            'id': 'counties-highlighted',
            'type': 'line',
            'source': 'counties',
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 3
            },
            'filter': ['in', 'COUNTY', '']
        },
    );

    //style smallArea layer
    map.addLayer({
        "id": "smallArea-fills",
        "type": "fill",
        "source": "smallArea",
        "layout": {},
        "paint": {
            "fill-color": "#FFFFFF",
            "fill-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                0.2,
                0
            ]
        }
    });
    // highlight smallArea boundary
    map.addLayer(
        {
            'id': 'smallArea-highlighted',
            'type': 'line',
            'source': 'smallArea',
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 3
            },
            'filter': ['in', 'OBJECTID', '']
        },
    );
    //for the highlight County outline
    map.on('click', function (e) {
        // set bbox as 0px reactangle area around clicked point
        var bbox = [
            [e.point.x, e.point.y],
            [e.point.x, e.point.y]
        ];
        var features = map.queryRenderedFeatures(bbox, {
            layers: ['county-fills']
        });

        var filter = features.reduce(
            function (memo, feature) {
                memo.push(feature.properties.COUNTY);
                return memo;
            },
            ['in', 'COUNTY']
        );

        map.setFilter('counties-highlighted', filter);
    });
    //for the highlight smallArea outline
    map.on('click', function (e) {
        // set bbox as 0px reactangle area around clicked point
        var bbox = [
            [e.point.x, e.point.y],
            [e.point.x, e.point.y]
        ];
        var features = map.queryRenderedFeatures(bbox, {
            layers: ['smallArea-fills']
        });
        if (map.getZoom() > zoomThreshold) {
            var filter = features.reduce(
                function (memo, feature) {
                    memo.push(feature.properties.OBJECTID);
                    return memo;
                },
                ['in', 'OBJECTID']
            );
            map.setFilter('smallArea-highlighted', filter);
        } else {
            var filter = features.reduce(
                function (memo, feature) {
                    memo.push(feature.properties.OBJECTID);
                    return memo;
                },
                ['in', 'null']
            );
            map.setFilter('smallArea-highlighted', filter);
        }
    });

    //for displaying HP2016 REL STYLE
    if (userstyleId == 'ckd63pgex17xo1hmh9cite56s') {
        // Click to show county features in sidebar
        map.on('click', 'county-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's c_HP2016rel COUNTY
            var countyScore = e.features[0].properties.c_HP2016rel;
            var countyLocation = e.features[0].properties.COUNTY;
            // Display the countyScore, countyLocation in the sidebar
            hpsDisplay.textContent = countyScore;
            locDisplay.textContent = countyLocation;
        });
        // Click to show smallArea features in sidebar
        map.on('click', 'smallArea-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            if (map.getZoom() > zoomThreshold) {
                // Set variables equal to the current feature's c_HP2016rel COUNTY
                var smallAreaScore = e.features[0].properties.s_HP2016rel;
                var smallAreaLocation = e.features[0].properties.ED_ENGLISH;
                // Display the countyScore, countyLocation in the sidebar
                hpsDisplay.textContent = smallAreaScore;
                locDisplay.textContent = smallAreaLocation;
            }
        });
        // for getting County name to display text location
        map.on("mousemove", "county-fills", function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's c_HP2016rel COUNTY
            var countyScore = e.features[0].properties.c_HP2016rel;
            var countyLocation = e.features[0].properties.COUNTY;
            // Check whether features exist
            if (e.features.length > 0) {

                if (hoveredCountyId || hoveredCountyId == 0) {
                    map.setFeatureState({source: 'counties', id: hoveredCountyId}, {hover: false});
                    popup
                        .setLngLat(e.lngLat)
                        .setHTML(countyLocation + ' : ' + countyScore)
                        .addTo(map);
                }
                hoveredCountyId = e.features[0].id;
                map.setFeatureState({source: 'counties', id: hoveredCountyId}, {hover: true});
            }
        });
        // for getting smallArea name to display text location
        map.on("mousemove", "smallArea-fills", function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            if (map.getZoom() > zoomThreshold) {
                // Set variables equal to the current feature's s_HP2016rel small area
                var smallAreaScore = e.features[0].properties.s_HP2016rel;
                var smallAreaLocation = e.features[0].properties.ED_ENGLISH;

                // Check whether features exist
                if (e.features.length > 0) {

                    if (hoveredSmallAreaId || hoveredSmallAreaId == 0) {
                        map.setFeatureState({source: 'counties', id: hoveredSmallAreaId}, {hover: false});
                        popup
                            .setLngLat(e.lngLat)
                            .setHTML(smallAreaLocation + ' : ' + smallAreaScore)
                            .addTo(map);
                    }
                    hoveredSmallAreaId = e.features[0].id;
                    map.setFeatureState({source: 'counties', id: hoveredSmallAreaId}, {hover: true});

                }
            }

        });
        map.on("mouseleave", "county-fills", function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
        map.on("mouseleave", "smallArea-fills", function () {
            map.getCanvas().style.cursor = '';
            popup.remove();

        });

        // legends (county & small area layer)


        function ReplacingCountyLegend(){
            document.getElementById("county-legend").src="legendImg/c_hp2016.png"
        }
        ReplacingCountyLegend();
        function ReplacingsmallAreaLegend(){
            document.getElementById("smallArea-legend").src="legendImg/s_hp2016.png"
        }
        ReplacingsmallAreaLegend();


        map.on('zoom', function () {
            if (map.getZoom() > zoomThreshold) {
                smallAreaLegendEl.style.display = 'block';
                countyLegendEl.style.display = 'none';
            } else {
                smallAreaLegendEl.style.display = 'none';
                countyLegendEl.style.display = 'block';
            }
        });
    }
    //END HP2016 REL STYLE

    //for displaying TOTPOP16 STYLE
    if (userstyleId == 'ckct2q9bx2edj1iqh31puc4uh') {
        // style county layer
        map.addLayer({
            "id": "county-fills",
            "type": "fill",
            "source": "counties",
            "layout": {},
            "paint": {
                "fill-color": "#FFFFFF",
                "fill-opacity": ["case",
                    ["boolean", ["feature-state", "hover"], false],
                    0.2,
                    0
                ]
            }
        });
        map.addLayer(
            {
                'id': 'counties-highlighted',
                'type': 'line',
                'source': 'counties',
                'paint': {
                    "line-color": "rgba(0,0,0,1)",
                    "line-width": 3
                },
                'filter': ['in', 'COUNTY', '']
            },
        );

        // Click to show county features in sidebar
        map.on('click', 'county-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's c_HP2016rel COUNTY
            var countyScore = e.features[0].properties.c_TOTPOP16;
            var countyLocation = e.features[0].properties.COUNTY;
            // Display the countyScore, countyLocation in the sidebar
            hpsDisplay.textContent = countyScore;
            locDisplay.textContent = countyLocation;
        });
        // Click to show smallArea features in sidebar
        map.on('click', 'smallArea-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            if (map.getZoom() > zoomThreshold) {
                // Set variables equal to the current feature's c_HP2016rel COUNTY
                var smallAreaScore = e.features[0].properties.s_TOTPOP16;
                var smallAreaLocation = e.features[0].properties.ED_ENGLISH;
                // Display the countyScore, countyLocation in the sidebar
                hpsDisplay.textContent = smallAreaScore;
                locDisplay.textContent = smallAreaLocation;
            }
        });

        // for getting County name to display text location
        map.on("mousemove", "county-fills", function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's c_HP2016rel COUNTY
            var countyScore = e.features[0].properties.c_TOTPOP16;
            var countyLocation = e.features[0].properties.COUNTY;
            // Check whether features exist
            if (e.features.length > 0) {

                if (hoveredCountyId || hoveredCountyId == 0) {
                    map.setFeatureState({source: 'counties', id: hoveredCountyId}, {hover: false});
                    popup
                        .setLngLat(e.lngLat)
                        .setHTML(countyLocation + ' : ' + countyScore)
                        .addTo(map);
                }
                hoveredCountyId = e.features[0].id;
                map.setFeatureState({source: 'counties', id: hoveredCountyId}, {hover: true});
            }
        });
        // for getting smallArea name to display text location
        map.on("mousemove", "smallArea-fills", function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            if (map.getZoom() > zoomThreshold) {
                // Set variables equal to the current feature's s_HP2016rel small area
                var smallAreaScore = e.features[0].properties.s_TOTPOP16;
                var smallAreaLocation = e.features[0].properties.ED_ENGLISH;

                // Check whether features exist
                if (e.features.length > 0) {

                    if (hoveredSmallAreaId || hoveredSmallAreaId == 0) {
                        map.setFeatureState({source: 'counties', id: hoveredSmallAreaId}, {hover: false});
                        popup
                            .setLngLat(e.lngLat)
                            .setHTML(smallAreaLocation + ' : ' + smallAreaScore)
                            .addTo(map);
                    }
                    hoveredSmallAreaId = e.features[0].id;
                    map.setFeatureState({source: 'counties', id: hoveredSmallAreaId}, {hover: true});

                }
            }

        });
        map.on("mouseleave", "county-fills", function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
        map.on("mouseleave", "smallArea-fills", function () {
            map.getCanvas().style.cursor = '';
            popup.remove();

        });

        // legends (county & small area layer)
        // var zoomThreshold = 10;
        // var countyLegendEl = document.getElementById('county-legendContainer');
        // var smallAreaLegendEl = document.getElementById('smallArea-legendContainer');

        function ReplacingCountyLegend(){
            document.getElementById("county-legend").src="legendImg/c_totpop16.png"
        }
        ReplacingCountyLegend();
        function ReplacingsmallAreaLegend(){
            document.getElementById("smallArea-legend").src="legendImg/s_totpop16.png"
        }
        ReplacingsmallAreaLegend();

        map.on('zoom', function () {
            if (map.getZoom() > zoomThreshold) {
                smallAreaLegendEl.style.display = 'block';
                countyLegendEl.style.display = 'none';
            } else {
                smallAreaLegendEl.style.display = 'none';
                countyLegendEl.style.display = 'block';
            }
        });
    }
    //END totpop16 STYLE
});

