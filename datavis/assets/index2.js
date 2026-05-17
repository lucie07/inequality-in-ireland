mapboxgl.accessToken = 'pk.eyJ1Ijoiemhpd2Vpem91IiwiYSI6ImNrY2dhcmJwaDBxOHcyeXBiZ3I1bHJhc3gifQ.f3EPTWknNq-nuqNxz33aZw';
var map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/zhiweizou/ckd63pgex17xo1hmh9cite56s', // Specify which map style to use
    center: [-7, 53.365659], // Specify the starting position [lng, lat]
    zoom: 6
});


map.dragRotate.disable();
map.touchZoomRotate.disableRotation();


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


//on map load
changeAnnotations();

// data switch
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

// var layerId;
var userstyleId = 'ckd63pgex17xo1hmh9cite56s';

function switchLayer(layer) {
    layerId = layer.target.id;
    console.log(layerId);
    userstyleId = layerId;
    console.log(userstyleId);
    map.setStyle('mapbox://styles/zhiweizou/' + layerId);
    changeAnnotations();

}

for (var i = 0; i < inputs.length; i++) {

    inputs[i].onclick = switchLayer;

}

var hoveredCountyId = null;
var hoveredSmallAreaId = null;

// Target the relevant span tags in the quakeInfo div
var hpsADisplay = document.getElementById('hpsA');
var hpsBDisplay = document.getElementById('hpsB');
var popADisplay = document.getElementById('popA');
var popBDisplay = document.getElementById('popB');
// var locDisplay = document.getElementById('loc');

//Update text for locations
var locationADisplay=document.getElementById('LocationA');
var locationBDisplay=document.getElementById('LocationB');
var countyNameADisplay=document.getElementById('countyNameA');
var countyNameBDisplay=document.getElementById('countyNameB');

//Set variables for the Bar Chart Update


var locationB=null;
var locationAid=null;
var locationBid=null;
var countyA=null;
var countyB=null;
var popA=null;
var popB=null;
var scoreA=null;
var scoreB=null;
var scoreRangeA=null;
var scoreRangeB=null;
var pointA_x=null;
var pointB_x=null;
var pointA_y=null;
var pointB_y=null;


var locationA = null;
if (localStorage.getItem("locationA")){
    if(localStorage.getItem("county")=="false"){
        locationAid=localStorage.getItem("locationA");}
    else{
        countyA=localStorage.getItem("locationA");
    }
}
//remove the highlight of locationB
localStorage.setItem("locationB"," ");

//set variable for double map highlight
// var mapHihghlightLocationA="128024";
// var mapHighlightLocationB="268097";



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
        "data": "./dataGeo/cMap.geojson",
        'generateId': true // This ensures that all features have unique IDs
    });

    // load small area layer geojon
    map.addSource("smallArea", {
        "type": "geojson",
        "data": "./dataGeo/sMap.geojson",
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
            'filter': ['in', 'ENGLISH', '']
        },
    );

    map.addLayer(
        {
            'id': 'counties-highlighted-A',
            'type': 'line',
            'source': 'counties',
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 1.5
            },
            'filter': ['in', 'ENGLISH', '']
        },
    );

    map.addLayer(
        {
            'id': 'counties-highlighted-B',
            'type': 'line',
            'source': 'counties',
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 1.5
            },
            'filter': ['in', 'ENGLISH', '']
        },
    );

    //style smallArea layer
    map.addLayer({
        "id": "smallArea-fills",
        "type": "fill",
        "source": "smallArea",
        'minzoom': 5,
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
    // highlight smallArea boundary A
    map.addLayer(
        {
            'id': 'smallArea-highlighted',
            'type': 'line',
            'source': 'smallArea',
            'minzoom': 0,
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 1.5
            },
            'filter': ['in', 'OBJECTID', '']
        },
    );

    // highlight smallArea boundary A
    map.addLayer(
        {
            'id': 'smallArea-highlighted-A',
            'type': 'line',
            'source': 'smallArea',
            'minzoom': 5,
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 1
            },
            'filter': ['in', 'ED_ID', '']
        },
    );


    // highlight smallArea boundary B
    map.addLayer(
        {
            'id': 'smallArea-highlighted-B',
            'type': 'line',
            'source': 'smallArea',
            'minzoom': 5,
            'paint': {
                "line-color": "rgba(0,0,0,1)",
                "line-width": 1
            },
            'filter': ['in', 'ED_ID', '']
        },
    );

    //Highlight areas from localStorage on loading the map
var storageLocationA=localStorage.getItem("locationA");
var storageLocationB=localStorage.getItem("locationB");
var county=localStorage.getItem("county");
    if (county=="true"){
        map.setFilter('counties-highlighted-A', ['in', 'ENGLISH', storageLocationA]);
        map.setFilter('counties-highlighted-B', ['in', 'ENGLISH', storageLocationB]);
    }
    else{
        map.setFilter('smallArea-highlighted-A', ['in', 'ED_ID',storageLocationA]);
        map.setFilter('smallArea-highlighted-B', ['in', 'ED_ID',storageLocationB]);

    }

});
    // the location lock functions
    var locationLockA=false;

    document.getElementById("lockA").onclick = function() {myFunctionA()};

    function myFunctionA() {
        if(locationLockA==true){
            locationLockA=false
            document.getElementById("iconA").className = "fas fa-unlock";
        }
        else{locationLockA=true;
            document.getElementById("iconA").className = "fas fa-lock";
        }

        console.log(locationLockA);

    }

    var locationLockB=false;

    document.getElementById("lockB").onclick = function() {myFunctionB()};

    function myFunctionB() {
        if(locationLockB==true){
            locationLockB=false
            document.getElementById("iconB").className = "fas fa-unlock";
        }
        else{locationLockB=true;
            document.getElementById("iconB").className = "fas fa-lock";}

        console.log(locationLockB);

    }

    var countyLocationLock=false;
    var smallAreaLocationLock=false;



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
                memo.push(feature.properties.ENGLISH);
                return memo;
            },
            ['in', 'ENGLISH']
        );

        // map.setFilter('counties-highlighted', filter);
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
            // map.setFilter('smallArea-highlighted', filter);
        }
    });

    //for displaying HP2016 REL STYLE

        // Click to show county features in sidebar
        map.on('click', 'county-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's c_HP2016rel COUNTY
            var countyScore = e.features[0].properties.c_HP2016rel;
            var countyName = e.features[0].properties.ENGLISH;
            var countyFilter = e.features[0].properties.COUNTY;
            var c_totPop = e.features[0].properties.c_TOTPOP16;
            c_totPop=Number(c_totPop);
            var c_score_range=e.features[0].properties.c_Score_Range;
            var point_x=e.point.x;
            var point_y=e.point.y;
            console.log(point_x);
            console.log(point_y);
            // Display the countyScore, countyLocation in the sidebar
            // hpsDisplay.textContent = countyScore;
            // locDisplay.textContent = countyLocation;

            if (map.getZoom() < zoomThreshold) {
                locationAid=null;
                locationBid=null;
                locationA=null;
                locationB=null;
                map.setFilter('smallArea-highlighted-B',['in', 'ED_ID',' ']);
                map.setFilter('smallArea-highlighted-A',['in', 'ED_ID',' ']);

                if (locationLockA==true || locationLockB==true){
                    countyLocationLock=true;
                }

                if (smallAreaLocationLock==true){
                    locationLockA=false;
                    locationLockB=false;}
                smallAreaLocationLock=false;

                if (  countyA!=null && countyB==null){
                    // locationB=smallAreaLocation;
                    // locationBid=locationID;
                    countyB = countyName;
                    popB = c_totPop.toLocaleString();
                    scoreB=countyScore;
                    scoreRangeB=c_score_range;
                    pointB_x=point_x;
                    pointB_y=point_y;

                    map.setFilter('counties-highlighted-B',['in', 'ENGLISH',countyB]);
                    map.setFilter('counties-highlighted-A',['in', 'ENGLISH',countyA]);
                    // map.setFilter('smallArea-highlighted-B',['in', 'ED_ID',locationBid]);

                    d3.selectAll('.locationB svg').remove();
                    barChartRight("test6.csv","#graphic",countyB,"LONEPA16",0,100,"%");
                    barChartRight("test6.csv","#agedPop",countyB,"AGEDEP16",0,100,"%");
                    barChartRight("test6.csv","#educationLow",countyB,"EDLOW_16",0,100,"%");
                    barChartRight("test6.csv","#educationHigh",countyB,"EDHIGH16",0,100,"%");
                    barChartRight("test6.csv","#highSkilledLabour",countyB,"HLPROF16",0,100,"%");
                    barChartRight("test6.csv","#lowSkilledLabour",countyB,"LSKILL16",0,100,"%");
                    barChartRight("test6.csv","#unemploymentM",countyB,"UNEMPM16",0,100,"%");
                    barChartRight("test6.csv","#unemploymentF",countyB,"UNEMPF16",0,100,"%");
                    barChartRight("test6.csv","#personsRoom",countyB,"PEROOM16",0,3.5,"");
                    barChartRight("test6.csv","#popChange",countyB,"POPCHG16",0,1.5,"");
//Display the name of the location
                    locationBDisplay.textContent = "COUNTY " + countyB;
                    countyNameBDisplay.textContent = " ";
                    popBDisplay.textContent = popB;
                    hpsBDisplay.textContent=scoreB;

                }

                else if (countyA==null && countyB==null ){

                    countyA=countyName;
                    popA = c_totPop.toLocaleString();
                    scoreA=countyScore;
                    scoreRangeA=c_score_range;
                    pointA_x=point_x;
                    pointA_y=point_y;
                    map.setFilter('counties-highlighted-A',['in', 'ENGLISH',countyA]);
                    // map.setFilter('smallArea-highlighted-A',['in', 'ED_ID',locationAid]);

                    d3.selectAll('svg').remove();
                    barChartLeft("test6.csv","#graphic2",countyA,"LONEPA16",0,100,"%");
                    barChartLeft("test6.csv","#agedPop2",countyA,"AGEDEP16",0,100,"%");
                    barChartLeft("test6.csv","#educationLow2",countyA,"EDLOW_16",0,100,"%");
                    barChartLeft("test6.csv","#educationHigh2",countyA,"EDHIGH16",0,100,"%");
                    barChartLeft("test6.csv","#highSkilledLabour2",countyA,"HLPROF16",0,100,"%");
                    barChartLeft("test6.csv","#lowSkilledLabour2",countyA,"LSKILL16",0,100,"%");
                    barChartLeft("test6.csv","#unemploymentM2",countyA,"UNEMPM16",0,100,"%");
                    barChartLeft("test6.csv","#unemploymentF2",countyA,"UNEMPF16",0,100,"%");
                    barChartLeft("test6.csv","#personsRoom2",countyA,"PEROOM16",0,3.5,"");
                    barChartLeft("test6.csv","#popChange2",countyA,"POPCHG16",0,1.5,"");



//Display the name of the location
                    locationADisplay.textContent = "COUNTY " + countyA;
                    locationBDisplay.textContent = "PICK A LOCATION ON THE MAP";
                    popADisplay.textContent=popA;
                    hpsADisplay.textContent=scoreA;
                    popBDisplay.textContent=' ';
                    hpsBDisplay.textContent=' ';
                    // countyNameADisplay.textContent = countyA;


                }


                else if(countyA!=null && countyB!=null){
                    // locationA=locationB;
                    // locationAid=locationBid;
                    if(locationLockA==false){
                        if (locationLockB==false){
                        countyA=countyB;
                    popA=popB;
                    scoreA=scoreB;
                        scoreRangeA=scoreRangeB
                        pointA_x=pointB_x;
                        pointA_y=pointB_y;}
                    else {

                        countyA=countyName;
                        popA = c_totPop.toLocaleString();
                        scoreA=countyScore;
                        scoreRangeA=c_score_range;
                        pointA_x=point_x;
                        pointA_y=point_y;

                    }

                        locationADisplay.textContent="COUNTY "+countyA;
                        countyNameADisplay.textContent=" ";
                        popADisplay.textContent=popA;
                        hpsADisplay.textContent=scoreA;

                        map.setFilter('counties-highlighted-A',['in', 'ENGLISH',countyA]);

                        d3.selectAll('.LocationA svg').remove();
                        barChartLeft("test6.csv","#graphic2",countyA,"LONEPA16",0,100,"%");
                        barChartLeft("test6.csv","#agedPop2",countyA,"AGEDEP16",0,100,"%");
                        barChartLeft("test6.csv","#educationLow2",countyA,"EDLOW_16",0,100,"%");
                        barChartLeft("test6.csv","#educationHigh2",countyA,"EDHIGH16",0,100,"%");
                        barChartLeft("test6.csv","#highSkilledLabour2",countyA,"HLPROF16",0,100,"%");
                        barChartLeft("test6.csv","#lowSkilledLabour2",countyA,"LSKILL16",0,100,"%");
                        barChartLeft("test6.csv","#unemploymentM2",countyA,"UNEMPM16",0,100,"%");
                        barChartLeft("test6.csv","#unemploymentF2",countyA,"UNEMPF16",0,100,"%");
                        barChartLeft("test6.csv","#personsRoom2",countyA,"PEROOM16",0,3.5,"");
                        barChartLeft("test6.csv","#popChange2",countyA,"POPCHG16",0,1.5,"");

                    }
                    if(locationLockB==false){
                    // locationB=smallAreaLocation;
                    // locationBid=locationID;
                    countyB = countyName;
                    popB = c_totPop.toLocaleString();
                    scoreB=countyScore;
                    scoreRangeB=c_score_range;
                        pointB_x=point_x;
                        pointB_y=point_y;
                    map.setFilter('counties-highlighted-B',['in', 'ENGLISH',countyB]);


                    // map.setFilter('smallArea-highlighted-B',['in', 'ED_ID',locationBid]);
                    // map.setFilter('smallArea-highlighted-A',['in', 'ED_ID',locationAid]);

                    d3.selectAll('.LocationB svg').remove();
                    barChartRight("test6.csv","#graphic",countyB,"LONEPA16",0,100,"%");
                    barChartRight("test6.csv","#agedPop",countyB,"AGEDEP16",0,100,"%");
                    barChartRight("test6.csv","#educationLow",countyB,"EDLOW_16",0,100,"%");
                    barChartRight("test6.csv","#educationHigh",countyB,"EDHIGH16",0,100,"%");
                    barChartRight("test6.csv","#highSkilledLabour",countyB,"HLPROF16",0,100,"%");
                    barChartRight("test6.csv","#lowSkilledLabour",countyB,"LSKILL16",0,100,"%");
                    barChartRight("test6.csv","#unemploymentM",countyB,"UNEMPM16",0,100,"%");
                    barChartRight("test6.csv","#unemploymentF",countyB,"UNEMPF16",0,100,"%");
                    barChartRight("test6.csv","#personsRoom",countyB,"PEROOM16",0,3.5,"");
                    barChartRight("test6.csv","#popChange",countyB,"POPCHG16",0,1.5,"");

                    //Display data for the location B

                    locationBDisplay.textContent = "COUNTY "+countyB;
                    countyNameBDisplay.textContent = " ";
                    popBDisplay.textContent=popB;
                    hpsBDisplay.textContent=scoreB;
                    }

                }

                localStorage.setItem("locationA",countyA);
                localStorage.setItem("locationAname",countyA);
                localStorage.setItem("countyNameA",countyA);
                if(pointA_x!=null){
                localStorage.setItem("scoreA",scoreA);
                localStorage.setItem("totPopA",popA);
                localStorage.setItem("scoreRangeA",scoreRangeA);
                localStorage.setItem("pointA_x",pointA_x);
                localStorage.setItem("pointA_y",pointA_y);
                }
                localStorage.setItem("locationB",countyB);
                localStorage.setItem("locationBname",countyB);
                localStorage.setItem("countyNameB",countyB);
                localStorage.setItem("scoreB",scoreB);
                localStorage.setItem("totPopB",popB);
                localStorage.setItem("scoreRangeB",scoreRangeB);
                localStorage.setItem("pointB_x",pointB_x);
                localStorage.setItem("pointB_y",pointB_y);
                localStorage.setItem("county","true");

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
                var countyName = e.features[0].properties.COUNTY;
                var locationID = e.features[0].properties.ED_ID;
                var s_totPop = e.features[0].properties.s_TOTPOP16;
                s_totPop=Number(s_totPop);
                var s_range = e.features[0].properties.s_Score_Range;

                var point_x=e.point.x;
                var point_y=e.point.y;

                map.setFilter('counties-highlighted-B',['in', 'ENGLISH', ' ']);
                map.setFilter('counties-highlighted-A',['in', 'ENGLISH', ' ']);

                if (locationLockA==true || locationLockB==true){
                    smallAreaLocationLock=true;
                }

                if (countyLocationLock==true){
                locationLockA=false;
                locationLockB=false;
                countyLocationLock=false;
                }


                if (  locationA!=null && locationB==null){
                    locationB=smallAreaLocation;
                    locationBid=locationID;
                    countyB=countyName;
                    popB=s_totPop.toLocaleString();
                    scoreB=smallAreaScore;
                    scoreRangeB=s_range;
                    pointB_x=point_x;
                    pointB_y=point_y;

                    map.setFilter('smallArea-highlighted-B',['in', 'ED_ID',locationBid]);

                    d3.selectAll('.locationB svg').remove();
                    barChartRight("test6.csv","#graphic",locationBid,"LONEPA16",0,100,"%");
                    barChartRight("test6.csv","#agedPop",locationBid,"AGEDEP16",0,100,"%");
                    barChartRight("test6.csv","#educationLow",locationBid,"EDLOW_16",0,100,"%");
                    barChartRight("test6.csv","#educationHigh",locationBid,"EDHIGH16",0,100,"%");
                    barChartRight("test6.csv","#highSkilledLabour",locationBid,"HLPROF16",0,100,"%");
                    barChartRight("test6.csv","#lowSkilledLabour",locationBid,"LSKILL16",0,100,"%");
                    barChartRight("test6.csv","#unemploymentM",locationBid,"UNEMPM16",0,100,"%");
                    barChartRight("test6.csv","#unemploymentF",locationBid,"UNEMPF16",0,100,"%");
                    barChartRight("test6.csv","#personsRoom",locationBid,"PEROOM16",0,3.5,"");
                    barChartRight("test6.csv","#popChange",locationBid,"POPCHG16",0,1.5,"");
//Display the name of the location
                    locationBDisplay.textContent = locationB;
                    countyNameBDisplay.textContent = countyB;
                    popBDisplay.textContent=popB;
                    hpsBDisplay.textContent=scoreB;

                }

                else if (locationA==null && locationB==null ){
locationA=smallAreaLocation;
                locationAid=locationID;
                countyA=countyName;
                popA=s_totPop.toLocaleString();
                scoreA=smallAreaScore;
                scoreRangeA=s_range;
                pointA_x=point_x;
                pointA_y=point_y;

                map.setFilter('smallArea-highlighted-A',['in', 'ED_ID',locationAid]);

                d3.selectAll('svg').remove();
                barChartLeft("test6.csv","#graphic2",locationAid,"LONEPA16",0,100,"%");
                barChartLeft("test6.csv","#agedPop2",locationAid,"AGEDEP16",0,100,"%");
                barChartLeft("test6.csv","#educationLow2",locationAid,"EDLOW_16",0,100,"%");
                barChartLeft("test6.csv","#educationHigh2",locationAid,"EDHIGH16",0,100,"%");
                barChartLeft("test6.csv","#highSkilledLabour2",locationAid,"HLPROF16",0,100,"%");
                barChartLeft("test6.csv","#lowSkilledLabour2",locationAid,"LSKILL16",0,100,"%");
                barChartLeft("test6.csv","#unemploymentM2",locationAid,"UNEMPM16",0,100,"%");
                barChartLeft("test6.csv","#unemploymentF2",locationAid,"UNEMPF16",0,100,"%");
                barChartLeft("test6.csv","#personsRoom2",locationAid,"PEROOM16",0,3.5,"");
                barChartLeft("test6.csv","#popChange2",locationAid,"POPCHG16",0,1.5,"");



//Display the name of the location
                    locationADisplay.textContent = locationA;
                    countyNameADisplay.textContent = countyA;
                    locationBDisplay.textContent = "PICK A SUB-COUNTY AREA ON THE MAP";
                    popADisplay.textContent=popA;
                    hpsADisplay.textContent=scoreA;
                    popBDisplay.textContent=' ';
                    hpsBDisplay.textContent=' ';

                    }


                else if(locationA!=null && locationB!=null){
                    if(locationLockA==false){
                        if (locationLockB==false){
                    locationA=locationB;
                    locationAid=locationBid;
                    countyA=countyB;
                    popA=popB;
                    scoreA=scoreB;
                        scoreRangeA=scoreRangeB;
                        pointA_x=pointB_x;
                        pointA_y=pointB_y;}
                        else{
                            locationA=smallAreaLocation;
                            locationAid=locationID;
                            countyA=countyName;
                            popA=s_totPop.toLocaleString();
                            scoreA=smallAreaScore;
                            scoreRangeA=s_range;
                            pointA_x=point_x;
                            pointA_y=point_y;
                        }

                        map.setFilter('smallArea-highlighted-A', ['in', 'ED_ID', locationAid]);
                        d3.selectAll('.LocationA svg').remove();
                        barChartLeft("test6.csv","#graphic2",locationAid,"LONEPA16",0,100,"%");
                        barChartLeft("test6.csv","#agedPop2",locationAid,"AGEDEP16",0,100,"%");
                        barChartLeft("test6.csv","#educationLow2",locationAid,"EDLOW_16",0,100,"%");
                        barChartLeft("test6.csv","#educationHigh2",locationAid,"EDHIGH16",0,100,"%");
                        barChartLeft("test6.csv","#highSkilledLabour2",locationAid,"HLPROF16",0,100,"%");
                        barChartLeft("test6.csv","#lowSkilledLabour2",locationAid,"LSKILL16",0,100,"%");
                        barChartLeft("test6.csv","#unemploymentM2",locationAid,"UNEMPM16",0,100,"%");
                        barChartLeft("test6.csv","#unemploymentF2",locationAid,"UNEMPF16",0,100,"%");
                        barChartLeft("test6.csv","#personsRoom2",locationAid,"PEROOM16",0,3.5,"");
                        barChartLeft("test6.csv","#popChange2",locationAid,"POPCHG16",0,1.5,"");

                        locationADisplay.textContent = locationA;
                        countyNameADisplay.textContent = countyA;
                        popADisplay.textContent = popA;
                        hpsBDisplay.textContent = scoreB;

                    }
                    if(locationLockB==false) {
                        locationB = smallAreaLocation;
                        locationBid = locationID;
                        countyB = countyName;
                        popB = s_totPop.toLocaleString();
                        scoreB = smallAreaScore;
                        scoreRangeB=s_range;
                        pointB_x=point_x;
                        pointB_y=point_y;

                        map.setFilter('smallArea-highlighted-B', ['in', 'ED_ID', locationBid]);

                        d3.selectAll('.LocationB svg').remove();
                        barChartRight("test6.csv", "#graphic", locationID, "LONEPA16", 0, 100, "%");
                        barChartRight("test6.csv", "#agedPop", locationID, "AGEDEP16", 0, 100, "%");
                        barChartRight("test6.csv", "#educationLow", locationID, "EDLOW_16", 0, 100, "%");
                        barChartRight("test6.csv", "#educationHigh", locationID, "EDHIGH16", 0, 100, "%");
                        barChartRight("test6.csv", "#highSkilledLabour", locationID, "HLPROF16", 0, 100, "%");
                        barChartRight("test6.csv", "#lowSkilledLabour", locationID, "LSKILL16", 0, 100, "%");
                        barChartRight("test6.csv", "#unemploymentM", locationID, "UNEMPM16", 0, 100, "%");
                        barChartRight("test6.csv", "#unemploymentF", locationID, "UNEMPF16", 0, 100, "%");
                        barChartRight("test6.csv", "#personsRoom", locationID, "PEROOM16", 0, 3.5, "");
                        barChartRight("test6.csv", "#popChange", locationID, "POPCHG16", 0, 1.5, "");


                        //Display the data for the location B
                        locationBDisplay.textContent = smallAreaLocation;
                        countyNameBDisplay.textContent = countyName;
                        popBDisplay.textContent = popB;
                        hpsBDisplay.textContent = scoreB;
                    }
                }

                                console.log(locationA);
                                console.log(locationB);

                localStorage.setItem("locationA",locationAid);
                localStorage.setItem("locationAname",locationA);
                if(pointA_x!=null){
                localStorage.setItem("countyNameA",countyA);
                localStorage.setItem("scoreA",scoreA);
                localStorage.setItem("totPopA",popA);
                localStorage.setItem("scoreRangeA",scoreRangeA);
                localStorage.setItem("pointA_x",pointA_x);
                localStorage.setItem("pointA_y",pointA_y);}
                localStorage.setItem("locationB",locationBid);
                localStorage.setItem("locationBname",locationB);
                localStorage.setItem("countyNameB",countyB);
                localStorage.setItem("scoreB",scoreB);
                localStorage.setItem("totPopB",popB);
                localStorage.setItem("scoreRangeB",scoreRangeB);
                localStorage.setItem("pointB_x",pointB_x);
                localStorage.setItem("pointB_y",pointB_y);
                localStorage.setItem("county","false");

                            }
        });

//Display relevant content based on the local storage user form data
var dropdownList=null;
var topicSelect = JSON.parse(localStorage.getItem("topics"));
document.getElementById("dropdown-list").onclick = function() {myFunctionDropdown()};

if(topicSelect){
    dropdownList=true;
    if(topicSelect.labour === "no"){
        document.getElementById("unemploymentMale").style.display="none";
        document.getElementById("unemploymentFemale").style.display="none";
    }
    if(topicSelect.demographic === "no"){
        document.getElementById("ageDependency").style.display="none";
        document.getElementById("populationChange").style.display="none";

    }
    if(topicSelect.education === "no"){
        document.getElementById("educationLower").style.display="none";
        document.getElementById("educationHigher").style.display="none";
    }

    if(topicSelect.health === "yes"){

    }else{

    }
    if(topicSelect.social === "no"){
        document.getElementById("labourHigh").style.display="none";
        document.getElementById("labourLow").style.display="none";
        document.getElementById("personsPerRoom").style.display="none";
        document.getElementById("singleParents").style.display="none";
    }
} else{
    dropdownList=false;
}

//dropdown list function

function myFunctionDropdown() {
    if(dropdownList===true){

        if(document.getElementById("dropdown-icon").className === "fas fa-chevron-circle-down"){

            document.getElementById("unemploymentMale").style.display="flex";
            document.getElementById("unemploymentFemale").style.display="flex";
            document.getElementById("ageDependency").style.display="flex";
            document.getElementById("populationChange").style.display="flex";
            document.getElementById("educationLower").style.display="flex";
            document.getElementById("educationHigher").style.display="flex";
            document.getElementById("labourHigh").style.display="flex";
            document.getElementById("labourLow").style.display="flex";
            document.getElementById("personsPerRoom").style.display="flex";
            document.getElementById("singleParents").style.display="flex";

            document.getElementById("dropdown-icon").className = "fas fa-chevron-circle-up";

        }
        else{
            if(topicSelect.labour === "no"){
                document.getElementById("unemploymentMale").style.display="none";
                document.getElementById("unemploymentFemale").style.display="none";
            }
            if(topicSelect.demographic === "no"){
                document.getElementById("ageDependency").style.display="none";
                document.getElementById("populationChange").style.display="none";

            }
            if(topicSelect.education === "no"){
                document.getElementById("educationLower").style.display="none";
                document.getElementById("educationHigher").style.display="none";
            }

            if(topicSelect.health === "yes"){

            }else{

            }
            if(topicSelect.social === "no"){
                document.getElementById("labourHigh").style.display="none";
                document.getElementById("labourLow").style.display="none";
                document.getElementById("personsPerRoom").style.display="none";
                document.getElementById("singleParents").style.display="none";
            }
            document.getElementById("dropdown-icon").className = "fas fa-chevron-circle-down";
        }
    }
    // else{locationLockA=true;
    //     document.getElementById("iconA").className = "fas fa-unlock";
    // }

    // console.log(locationLockA);

}



//function for changing the map annotations and legends

function changeAnnotations(){

    // for getting County name to display text location
    map.on("mousemove", "county-fills", function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // Set variables equal to the current feature's c_HP2016rel COUNTY
        var countyLocation = e.features[0].properties.COUNTY;
        var factorName=null;
        var c_data=null;
        switch (userstyleId){
            case "ckd63pgex17xo1hmh9cite56s":
                c_data=e.features[0].properties.c_HP2016rel;
                factorName="HP SCORE: ";
                break;
            case "ckct2q9bx2edj1iqh31puc4uh":
                c_data=e.features[0].properties.c_TOTPOP16;
                factorName="2016 TOTAL POPULATION: ";
                break;
            case "ckczzhgu10jj01ipggsuayv80":
                c_data=e.features[0].properties.c_POPCHG16;
                factorName="POPULATION CHANGE: ";
                break;
            case "ckd09ui420tkr1io3ge2jxa82":
                c_data=e.features[0].properties.c_AGEDEP16;
                factorName="AGE DEPENDENCY RATIO: ";
                break;
            case "ckd0ac4zo0u4s1irx1w9ogprd":
                c_data=e.features[0].properties.c_LONEPA16;
                factorName="LONE PARENT RATIO: ";
                break;
            case "ckd0arukt0uia1inyud8l4y9z":
                c_data=e.features[0].properties.c_EDLOW_16;
                factorName="EDUCATION PRIMARY ONLY: ";
                break;
            case "ckd0cqbye0wgn1iob9ihxn98v":
                c_data=e.features[0].properties.c_EDHIGH16;
                factorName="HIGHER EDUCATION: ";
                break;
            case "ckd0czvul0wk81ipgll9twc29":
                c_data=e.features[0].properties.c_HLPROF16;
                factorName= "HIGH SKILLED LABOUR: ";
                break;
            case "ckd0d9u2f0wxv1ioiferdiuyq":
                c_data=e.features[0].properties.c_LSKILL16;
                factorName="LOW SKILLED LABOUR: ";
                break;
            case "ckd0dxkjy0xka1invcfjss43t":
                c_data=e.features[0].properties.c_UNEMPM16;
                factorName="UNEMPLOYED MALE: ";
                break;
            case "ckd0efxpf0y5z1imo9hx65ik8":
                c_data=e.features[0].properties.c_UNEMPF16;
                factorName="UNEMPLOYED FEMALE: ";
                break;
            case "ckd0er0y60f8y1in83ewdtpku":
                c_data=e.features[0].properties.c_PEROOM16;
                factorName="AVERAGE NUMBER OF PERSONS PER ROOM: ";
        }


        // Check whether features exist
        if (e.features.length > 0) {

            if (hoveredCountyId || hoveredCountyId == 0) {
                map.setFeatureState({source: 'counties', id: hoveredCountyId}, {hover: false});
                popup
                    .setLngLat(e.lngLat)
                    .setHTML('COUNTY '+countyLocation+'<br />' + factorName + c_data)
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
            // var smallAreaScore = e.features[0].properties.s_HP2016rel;
            // var s_totPop = e.features[0].properties.s_TOTPOP16;
            var smallAreaLocation = e.features[0].properties.ED_ENGLISH;
            var s_data=null;
            var factorName=null;
            switch (userstyleId){
                case "ckd63pgex17xo1hmh9cite56s":
                    s_data=e.features[0].properties.s_HP2016rel;
                    factorName="HP SCORE: ";
                    break;
                case "ckct2q9bx2edj1iqh31puc4uh":
                    s_data=e.features[0].properties.s_TOTPOP16;
                    factorName="2016 TOTAL POPULATION: ";
                    break;
                case "ckczzhgu10jj01ipggsuayv80":
                    s_data=e.features[0].properties.s_POPCHG16;
                    factorName="POPULATION CHANGE: ";
                    break;
                case "ckd09ui420tkr1io3ge2jxa82":
                    s_data=e.features[0].properties.s_AGEDEP16;
                    factorName="AGE DEPENDENCY RATIO: ";
                    break;
                case "ckd0ac4zo0u4s1irx1w9ogprd":
                    s_data=e.features[0].properties.s_LONEPA16;
                    factorName="LONE PARENT RATIO: ";
                    break;
                case "ckd0arukt0uia1inyud8l4y9z":
                    s_data=e.features[0].properties.s_EDLOW_16;
                    factorName="EDUCATION PRIMARY ONLY: ";
                    break;
                case "ckd0cqbye0wgn1iob9ihxn98v":
                    s_data=e.features[0].properties.s_EDHIGH16;
                    factorName="HIGHER EDUCATION: ";
                    break;
                case "ckd0czvul0wk81ipgll9twc29":
                    s_data=e.features[0].properties.s_HLPROF16;
                    factorName= "HIGH SKILLED LABOUR: ";
                    break;
                case "ckd0d9u2f0wxv1ioiferdiuyq":
                    s_data=e.features[0].properties.s_LSKILL16;
                    factorName="LOW SKILLED LABOUR: ";
                    break;
                case "ckd0dxkjy0xka1invcfjss43t":
                    s_data=e.features[0].properties.s_UNEMPM16;
                    factorName="UNEMPLOYED MALE: ";
                    break;
                case "ckd0efxpf0y5z1imo9hx65ik8":
                    s_data=e.features[0].properties.s_UNEMPF16;
                    factorName="UNEMPLOYED FEMALE: ";
                    break;
                case "ckd0er0y60f8y1in83ewdtpku":
                    s_data=e.features[0].properties.s_PEROOM16;
                    factorName="AVERAGE NUMBER OF PERSONS PER ROOM: ";
            }

            // Check whether features exist
            if (e.features.length > 0) {

                if (hoveredSmallAreaId || hoveredSmallAreaId == 0) {
                    map.setFeatureState({source: 'counties', id: hoveredSmallAreaId}, {hover: false});
                    popup
                        .setLngLat(e.lngLat)
                        .setHTML(smallAreaLocation + '<br />' + factorName + s_data)
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
        switch (userstyleId){
            case "ckd63pgex17xo1hmh9cite56s":
                document.getElementById("county-legend").src="legendImg/c_hp2016.png";
                break;
            case "ckct2q9bx2edj1iqh31puc4uh":
                document.getElementById("county-legend").src="legendImg/c_totpop16.png";
                break;
            case "ckczzhgu10jj01ipggsuayv80":
                document.getElementById("county-legend").src="legendImg/c_popchg16.png";
                break;
            case "ckd09ui420tkr1io3ge2jxa82":
                document.getElementById("county-legend").src="legendImg/c_agedep16.png";
                break;
            case "ckd0ac4zo0u4s1irx1w9ogprd":
                document.getElementById("county-legend").src="legendImg/c_lonepa16.png";
                break;
            case "ckd0arukt0uia1inyud8l4y9z":
                document.getElementById("county-legend").src="legendImg/c_edlow16.png";
                break;
            case "ckd0cqbye0wgn1iob9ihxn98v":
                document.getElementById("county-legend").src="legendImg/c_edhigh16.png";
                break;
            case "ckd0czvul0wk81ipgll9twc29":
                document.getElementById("county-legend").src="legendImg/c_hlprof16.png";
                break;
            case "ckd0d9u2f0wxv1ioiferdiuyq":
                document.getElementById("county-legend").src="legendImg/c_lskill16.png";
                break;
            case "ckd0dxkjy0xka1invcfjss43t":
                document.getElementById("county-legend").src="legendImg/c_unempm16.png";
                break;
            case "ckd0efxpf0y5z1imo9hx65ik8":
                document.getElementById("county-legend").src="legendImg/c_unempf16.png";
                break;
            case "ckd0er0y60f8y1in83ewdtpku":
                document.getElementById("county-legend").src="legendImg/c_peroom16.png";
        }


    }
    ReplacingCountyLegend();
    function ReplacingsmallAreaLegend(){
        switch (userstyleId){
            case "ckd63pgex17xo1hmh9cite56s":
                document.getElementById("smallArea-legend").src="legendImg/s_hp2016.png";
                break;
            case "ckct2q9bx2edj1iqh31puc4uh":
                document.getElementById("smallArea-legend").src="legendImg/s_totpop16.png";
                break;
            case "ckczzhgu10jj01ipggsuayv80":
                document.getElementById("smallArea-legend").src="legendImg/s_popchg16.png";
                break;
            case "ckd09ui420tkr1io3ge2jxa82":
                document.getElementById("smallArea-legend").src="legendImg/s_agedep16.png";
                break;
            case "ckd0ac4zo0u4s1irx1w9ogprd":
                document.getElementById("smallArea-legend").src="legendImg/s_lonepa16.png";
                break;
            case "ckd0arukt0uia1inyud8l4y9z":
                document.getElementById("smallArea-legend").src="legendImg/s_edlow16.png";
                break;
            case "ckd0cqbye0wgn1iob9ihxn98v":
                document.getElementById("smallArea-legend").src="legendImg/s_edhigh16.png";
                break;
            case "ckd0czvul0wk81ipgll9twc29":
                document.getElementById("smallArea-legend").src="legendImg/s_hlprof16.png";
                break;
            case "ckd0d9u2f0wxv1ioiferdiuyq":
                document.getElementById("smallArea-legend").src="legendImg/s_lskill16.png";
                break;
            case "ckd0dxkjy0xka1invcfjss43t":
                document.getElementById("smallArea-legend").src="legendImg/s_unempm16.png";
                break;
            case "ckd0efxpf0y5z1imo9hx65ik8":
                document.getElementById("smallArea-legend").src="legendImg/s_unempf16.png";
                break;
            case "ckd0er0y60f8y1in83ewdtpku":
                document.getElementById("smallArea-legend").src="legendImg/s_peroom16.png";
        }

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










