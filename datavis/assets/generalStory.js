mapboxgl.accessToken = 'pk.eyJ1Ijoiemhpd2Vpem91IiwiYSI6ImNrY2dhcmJwaDBxOHcyeXBiZ3I1bHJhc3gifQ.f3EPTWknNq-nuqNxz33aZw';
var map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/zhiweizou/ckd63pgex17xo1hmh9cite56s', // Specify which map style to use
    center: [-7, 53.365659], // Specify the starting position [lng, lat]
    zoom: 6
});
map.scrollZoom.disable();
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();
// data switch
// var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');

// var layerId;
// var userstyleId = 'ckd63pgex17xo1hmh9cite56s';

// function switchLayer(layer) {
//     layerId = layer.target.id;
//     console.log(layerId);
//     userstyleId = layerId;
//     console.log(userstyleId);
//     map.setStyle('mapbox://styles/zhiweizou/' + layerId);
//
// }

// for (var i = 0; i < inputs.length; i++) {
//
//     inputs[i].onclick = switchLayer;
//
// }

// hide and show
var lmShow;
var dpShow;
var eduShow;
var heShow;
var sccShow;
var topicSelect = JSON.parse(localStorage.getItem("topics"));

// console.log("this is from story map "+topicSelect);
// console.log("this is from  "+topicSelect[0]);
if(topicSelect){
if(topicSelect.labour === "yes"){
    lmShow = true;
}else{
    lmShow = false;
}
if(topicSelect.demographic === "yes"){
    dpShow = true;
}else{
     dpShow = false;
}
if(topicSelect.education === "yes"){
    eduShow = true;
}else{
    eduShow = false;
}
if(topicSelect.health === "yes"){
    heShow = true;
}else{
    heShow = false;
}
if(topicSelect.social === "yes"){
    sccShow = true;
}else{
    sccShow = false;
}}





$(function () { $('#lmt').collapse({
    toggle: lmShow
})});
$(function () { $('#dpt').collapse({
    toggle: dpShow
})});
$(function () { $('#edut').collapse({
    toggle: eduShow
})});
$(function () { $('#het').collapse({
    toggle: heShow
})});
$(function () { $('#scct').collapse({
    toggle: sccShow
})});

var hoveredCountyId = null;
var hoveredSmallAreaId = null;

// Target the relevant span tags in the quakeInfo div
var hpsDisplay = document.getElementById('hps');
var locDisplay = document.getElementById('loc');
var lmmDisplay = document.getElementById('lmm');
var lmfDisplay = document.getElementById('lmf');
var dptotDisplay = document.getElementById('dptot');
var dpchgDisplay = document.getElementById('dpchg');
var eduhDisplay = document.getElementById('eduh');
var edulDisplay = document.getElementById('edul');
var heDisplay = document.getElementById('he');
var sccDisplay = document.getElementById('scc');


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
                "line-width": 1.5
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
                "line-width": 1.5
            },
            'filter': ['in', 'OBJECTID', '']
        },
    );



    map.on('load', function(){
if(localStorage.getItem("pointA_x")){
        var bbox=[
            [localStorage.getItem("pointA_x"),localStorage.getItem("pointA_y")],
            [localStorage.getItem("pointA_x"),localStorage.getItem("pointA_y")],
        ];

        var features = map.queryRenderedFeatures( {
            layers: ['county-fills']
        });

        map.setFilter('counties-highlighted', ['in','COUNTY',localStorage.getItem("countyNameA")]);

        var countyLocation = features[0].properties.COUNTY;

        //labour market male
        if( features[0].properties.c_UNEMPM16 >= 9.77 && features[0].properties.c_UNEMPM16 < 13.26){
            lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level is relatively low in Ireland.";
        }else if(features[0].properties.c_UNEMPM16 >=13.26 && features[0].properties.c_UNEMPM16 < 16.75){
            lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level ranked in the middle.";
        }else if(features[0].properties.c_UNEMPM16 >= 16.75 && features[0].properties.c_UNEMPM16 <= 20.24){
            lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level is quite high in Ireland.";
        }
        //labour market female
        if( features[0].properties.c_UNEMPF16 >= 8.86 && features[0].properties.c_UNEMPF16 < 12.24){
            lmfDisplay.textContent ="Only "+features[0].properties.c_UNEMPF16+"% women in "+countyLocation+" don’t have a job. The labour market in "+countyLocation+" is stable.";
        }else if(features[0].properties.c_UNEMPF16 >= 12.24 && features[0].properties.c_UNEMPF16 < 15.6){
            lmfDisplay.textContent = features[0].properties.c_UNEMPF16+"% women in "+countyLocation+"don’t have a job. Government needs to be aware of the unemployment trend.";
        }else if(features[0].properties.c_UNEMPF16 >= 15.6 && features[0].properties.c_UNEMPF16 <= 18.96){
            lmfDisplay.textContent = features[0].properties.c_UNEMPF16+"% women in "+countyLocation+"don’t have a job. Creating more and better jobs is the priority for the government.";
        }
}

    });



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
            function (memo, features) {
                memo.push(features.properties.COUNTY);
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

            //labour market male
            if( e.features[0].properties.c_UNEMPM16 >= 9.77 && e.features[0].properties.c_UNEMPM16 < 13.26){
                lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ e.features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level is relatively low in Ireland.";
            }else if(e.features[0].properties.c_UNEMPM16 >=13.26 && e.features[0].properties.c_UNEMPM16 < 16.75){
                lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ e.features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level ranked in the middle.";
            }else if(e.features[0].properties.c_UNEMPM16 >= 16.75 && e.features[0].properties.c_UNEMPM16 <= 20.24){
                lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ e.features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level is quite high in Ireland.";
            }
            //labour market female
            if( e.features[0].properties.c_UNEMPF16 >= 8.86 && e.features[0].properties.c_UNEMPF16 < 12.24){
                lmfDisplay.textContent ="Only "+e.features[0].properties.c_UNEMPF16+"% women in "+countyLocation+" don’t have a job. The labour market in "+countyLocation+" is stable.";
            }else if(e.features[0].properties.c_UNEMPF16 >= 12.24 && e.features[0].properties.c_UNEMPF16 < 15.6){
                lmfDisplay.textContent = e.features[0].properties.c_UNEMPF16+"% women in "+countyLocation+"don’t have a job. Government needs to be aware of the unemployment trend.";
            }else if(e.features[0].properties.c_UNEMPF16 >= 15.6 && e.features[0].properties.c_UNEMPF16 <= 18.96){
                lmfDisplay.textContent = e.features[0].properties.c_UNEMPF16+"% women in "+countyLocation+"don’t have a job. Creating more and better jobs is the priority for the government.";
             }



            //demographic total population
            if( e.features[0].properties.c_TOTPOP16 == 1347359 ){
                dptotDisplay.textContent = "The population of county Dublin is the highest in Ireland with "+e.features[0].properties.c_TOTPOP16+", far more than other counties.";
            }else if(e.features[0].properties.c_TOTPOP16 >= 417211  && e.features[0].properties.c_TOTPOP16 < 1347359){
                dptotDisplay.textContent = "The population of county "+countyLocation+" is "+ e.features[0].properties.c_TOTPOP16+", ranking in the middle.";
            }else if(e.features[0].properties.c_TOTPOP16 >= 118817  && e.features[0].properties.c_TOTPOP16 <417211){
                dptotDisplay.textContent = "The population of county "+countyLocation+" is "+ e.features[0].properties.c_TOTPOP16+", below the average.";
            }else if(e.features[0].properties.c_TOTPOP16 >= 32044  && e.features[0].properties.c_TOTPOP16 <118817){
                dptotDisplay.textContent = "The population of county "+countyLocation+" is "+ e.features[0].properties.c_TOTPOP16+", less than most counties.";
            }
            //demographic  population change
            if( e.features[0].properties.c_POPCHG16 >=0.06 && e.features[0].properties.c_POPCHG16 <=0.1 ){
                dpchgDisplay.textContent = "The Population Change in "+countyLocation+"  is obvious with "+ e.features[0].properties.c_POPCHG16 +"%.";
            }else if(e.features[0].properties.c_POPCHG16 >= 0.03  && e.features[0].properties.c_POPCHG16 < 0.06){
                dpchgDisplay.textContent = "The Population Change in "+countyLocation+"  is slow with "+ e.features[0].properties.c_POPCHG16 +"%.";
            }else if(e.features[0].properties.c_POPCHG16 >= 0  && e.features[0].properties.c_POPCHG16 <0.03){
                dpchgDisplay.textContent = "The Population Change in "+countyLocation+"  is no obvious with only "+ e.features[0].properties.c_POPCHG16 +"%.";
            }
            //edu high
            if( e.features[0].properties.c_EDHIGH16 >= 37.89 && e.features[0].properties.c_EDHIGH16 <= 44.1){
                eduhDisplay.textContent = "Statistics show that the percentage of the population with higher education ("+e.features[0].properties.c_EDHIGH16+"%) in " +countyLocation+" is quite high in Ireland.";
            }else if(e.features[0].properties.c_EDHIGH16 >=31.68 && e.features[0].properties.c_EDHIGH16 < 37.89){
                eduhDisplay.textContent = "Statistics show that the percentage of the population with higher education ("+e.features[0].properties.c_EDHIGH16+"%) in " +countyLocation+" is in the middle of Ireland.";
            }else if(e.features[0].properties.c_EDHIGH16 >= 25.45 && e.features[0].properties.c_EDHIGH16 < 31.68){
                eduhDisplay.textContent = "Statistics show that the percentage of the population with higher education ("+e.features[0].properties.c_EDHIGH16+"%) in " +countyLocation+" is quite low in Ireland.";
            }
            //edu low
            if( e.features[0].properties.c_EDLOW_16 >= 17.77 && e.features[0].properties.c_EDLOW_16 <= 21.6){
                edulDisplay.textContent =  "The percentage of people with primary education only are excessive("+e.features[0].properties.c_EDLOW_16+"%). It indicates that the government needs to put more education resources in " +countyLocation+".";
            }else if(e.features[0].properties.c_EDLOW_16 >=13.94 && e.features[0].properties.c_EDLOW_16 < 17.77){
                edulDisplay.textContent =  "The percentage of people with primary education only("+e.features[0].properties.c_EDLOW_16+"%) ranks in the middle.";
            }else if(e.features[0].properties.c_EDLOW_16 >= 10.11 && e.features[0].properties.c_EDLOW_16 < 13.94){
                edulDisplay.textContent = "The percentage of people with primary education only is low("+e.features[0].properties.c_EDLOW_16+"%).";
            }
            //health
            if( e.features[0].properties.c_VBBTOTAL >=1.24  && e.features[0].properties.c_VBBTOTAL < 1.51){
                heDisplay.textContent = "Studies indicate people "+countyLocation+" have a health state. The Percentage Population with Bad or Very Bad General Health is "+e.features[0].properties.c_VBBTOTAL+" and the Percentage Population with Disability is "+e.features[0].properties.c_POPDISAB+", which are quite low in Ireland.";
            }else if(e.features[0].properties.c_VBBTOTAL >=1.51 && e.features[0].properties.c_VBBTOTAL < 1.78){
                heDisplay.textContent = "Studies indicate people in "+countyLocation+" have a relatively bad state. The Percentage Population with Bad or Very Bad General Health is "+e.features[0].properties.c_VBBTOTAL+" and the Percentage Population with Disability is "+e.features[0].properties.c_POPDISAB+".";
            }else if(e.features[0].properties.c_VBBTOTAL >=1.78 && e.features[0].properties.c_VBBTOTAL <= 2.05){
                heDisplay.textContent = "Studies indicate people in "+countyLocation+" have a bad state. The Percentage Population with Bad or Very Bad General Health is "+e.features[0].properties.c_VBBTOTAL+" and the Percentage Population with Disability is "+e.features[0].properties.c_POPDISAB+" which are quite high in Ireland. People need to be aware of their health conditions.";
            }
            //social class
            if(e.features[0].properties.c_HLPROF16 >=36.25 && e.features[0].properties.c_HLPROF16 <= 40.52){
                sccDisplay.textContent = countyLocation+" performs well in the measure of social class composition. Social class is composed by "+e.features[0].properties.c_HLPROF16+"% high skilled workers and "+e.features[0].properties.c_LSKILL16+"% low skilled workers.";
            }else if(e.features[0].properties.c_HLPROF16 >=31.99  && e.features[0].properties.c_HLPROF16 < 36.25){
                sccDisplay.textContent = countyLocation+" performans normally in the measure of social class composition. Social class is composed by "+e.features[0].properties.c_HLPROF16+"% high skilled workers and "+e.features[0].properties.c_LSKILL16+"% low skilled workers.";
            }else if(e.features[0].properties.c_HLPROF16 >=27.73   && e.features[0].properties.c_HLPROF16 < 31.99){
                sccDisplay.textContent = countyLocation+" performans badly in the measure of social class composition compared with other counties. Social class is composed by "+e.features[0].properties.c_HLPROF16+"% high skilled workers and "+e.features[0].properties.c_LSKILL16+"% low skilled workers.";
            }

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

    //END HP2016 REL STYLE

});

