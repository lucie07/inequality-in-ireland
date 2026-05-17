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
    placeholder: 'Search for address'

});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


//on map load
changeAnnotations();


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
    changeAnnotations();


}

for (var i = 0; i < inputs.length; i++) {

    inputs[i].onclick = switchLayer;
    console.log(inputs[i]);
}

var hoveredCountyId = null;
var hoveredSmallAreaId = null;

// Target the relevant span tags in the quakeInfo div
var hpsDisplay = document.getElementById('hps');
var locDisplay = document.getElementById('loc');
var popDisplay = document.getElementById('pop');
var rangeDisplay = document.getElementById('range');

// Create a popup(County&smallArea), but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

var zoomThreshold = 10;
var countyLegendEl = document.getElementById('county-legendContainer');
var smallAreaLegendEl = document.getElementById('smallArea-legendContainer');

//set the locationB in localStorage to null
localStorage.setItem("locationB"," ");

//initialize legend
smallAreaLegendEl.style.display = 'none';
countyLegendEl.style.display = 'block';

map.on('style.load', function () {
var location = localStorage.getItem("locationA");
var county = localStorage.getItem("county");

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
            'filter': ['in', 'ED_ID', '']
        },
    );
if (county=="true"){
    map.setFilter('counties-highlighted', ['in', 'ENGLISH', location]);
}
else{
    map.setFilter('smallArea-highlighted', ['in', 'ED_ID',location]);}


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
        if (map.getZoom() < zoomThreshold){
        var filter = features.reduce(
            function (memo, feature) {
                memo.push(feature.properties.ENGLISH);
                return memo;
            },
            ['in', 'ENGLISH']
        );

        }
        else {
            var filter = features.reduce(
                function (memo, feature) {
                    memo.push(feature.properties.ENGLISH);
                    return memo;
                },
                ['in', 'null']
            );}
        map.setFilter('counties-highlighted', filter);
    });



});
    //for the highlight smallArea outline
    map.on('click', function (e) {


        console.log(e.point.x);

        localStorage.setItem("pointA_x",e.point.x);
        localStorage.setItem("pointA_y",e.point.y);
// console.log(pointClicked[1]);
       // console.log( JSON.stringify(e.point));
       //  console.log(JSON.stringify(e.lngLat.wrap()));



        // set bbox as 0px rectangle area around clicked point
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
                    memo.push(feature.properties.ED_ID);
                    return memo;
                },
                ['in', 'ED_ID']
            );
            map.setFilter('smallArea-highlighted', filter);
        } else {
            var filter = features.reduce(
                function (memo, feature) {
                    memo.push(feature.properties.ED_ID);
                    return memo;
                },
                ['in', 'null']
            );
            map.setFilter('smallArea-highlighted', filter);

        }
    });

    //for displaying HP2016 REL STYLE
    // if (userstyleId == 'ckd63pgex17xo1hmh9cite56s') {
        // Click to show county features in sidebar
        map.on('click', 'county-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Set variables equal to the current feature's c_HP2016rel COUNTY
            var countyScore = e.features[0].properties.c_HP2016rel;
            var countyLocation = e.features[0].properties.COUNTY;
            var c_totPop = e.features[0].properties.c_TOTPOP16;
            var countyID= e.features[0].properties.ENGLISH;
            c_totPop=Number(c_totPop);
            var c_range = e.features[0].properties.c_Score_Range;
            console.log(countyScore);
            // Display the countyScore, countyLocation in the sidebar
            hpsDisplay.textContent = countyScore;
            locDisplay.textContent = "COUNTY "+countyLocation;
            popDisplay.textContent = c_totPop.toLocaleString();
            rangeDisplay.textContent = c_range;
            if (map.getZoom() < zoomThreshold){
            console.log(countyID);
            d3.selectAll('svg').remove();
            barChartRight("test6.csv","#singleParents",countyID,"LONEPA16",0,100,"%");
            barChartRight("test6.csv","#agedPop",countyID,"AGEDEP16",0,100,"%");
            barChartRight("test6.csv","#educationLow",countyID,"EDLOW_16",0,100,"%");
            barChartRight("test6.csv","#educationHigh",countyID,"EDHIGH16",0,100,"%");
            barChartRight("test6.csv","#highSkilledLabour",countyID,"HLPROF16",0,100,"%");
            barChartRight("test6.csv","#lowSkilledLabour",countyID,"LSKILL16",0,100,"%");
            barChartRight("test6.csv","#unemploymentM",countyID,"UNEMPM16",0,100,"%");
            barChartRight("test6.csv","#unemploymentF",countyID,"UNEMPF16",0,100,"%");
            barChartRight("test6.csv","#personsRoom",countyID,"PEROOM16",0,3.5,"");
            barChartRight("test6.csv","#popChange",countyID,"POPCHG16",0,1.5,"");


            localStorage.setItem("locationA",countyID);
            localStorage.setItem("locationAname",countyLocation);
            localStorage.setItem("countyNameA",countyLocation);
            localStorage.setItem("scoreA",countyScore);
            localStorage.setItem("totPopA",c_totPop.toLocaleString());
            localStorage.setItem("scoreRangeA",c_range);

            localStorage.setItem("county","true");

            }

            console.log(map.getZoom());




        });
        // Click to show smallArea features in sidebar
        map.on('click', 'smallArea-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            localStorage.setItem("pointA_x",e.point.x);
            localStorage.setItem("pointA_y",e.point.y);

            console.log(countyName);
            if (map.getZoom() > zoomThreshold) {
                // Set variables equal to the current feature's c_HP2016rel COUNTY
                var smallAreaScore = e.features[0].properties.s_HP2016rel;
                var smallAreaLocation = e.features[0].properties.ED_ENGLISH;
                var locationID = e.features[0].properties.ED_ID;
                var s_totPop = e.features[0].properties.s_TOTPOP16;
                var s_range = e.features[0].properties.s_Score_Range;
                var countyName = e.features[0].properties.COUNTY;


                s_totPop=Number(s_totPop);
                console.log(smallAreaScore);
                // Display the countyScore, countyLocation in the sidebar
                hpsDisplay.textContent = smallAreaScore;
                locDisplay.textContent = smallAreaLocation;
                popDisplay.textContent = s_totPop.toLocaleString();
                rangeDisplay.textContent = s_range;

                d3.selectAll('svg').remove();
                barChartRight("test6.csv","#singleParents",locationID,"LONEPA16",0,100,"%");
                barChartRight("test6.csv","#agedPop",locationID,"AGEDEP16",0,100,"%");
                barChartRight("test6.csv","#educationLow",locationID,"EDLOW_16",0,100,"%");
                barChartRight("test6.csv","#educationHigh",locationID,"EDHIGH16",0,100,"%");
                barChartRight("test6.csv","#highSkilledLabour",locationID,"HLPROF16",0,100,"%");
                barChartRight("test6.csv","#lowSkilledLabour",locationID,"LSKILL16",0,100,"%");
                barChartRight("test6.csv","#unemploymentM",locationID,"UNEMPM16",0,100,"%");
                barChartRight("test6.csv","#unemploymentF",locationID,"UNEMPF16",0,100,"%");
                barChartRight("test6.csv","#personsRoom",locationID,"PEROOM16",0,3.5,"");
                barChartRight("test6.csv","#popChange",locationID,"POPCHG16",0,1.5,"");

                localStorage.setItem("locationA",locationID);
                localStorage.setItem("locationAname",smallAreaLocation);
                localStorage.setItem("countyNameA",countyName);
                localStorage.setItem("scoreA",smallAreaScore);
                localStorage.setItem("totPopA",s_totPop.toLocaleString());
                localStorage.setItem("scoreRangeA",s_range);

                localStorage.setItem("county","false");

            }
        });


//Display relevant content based on the local storage user form data
var dropdownList=null;
var topicSelect = JSON.parse(localStorage.getItem("topics"));

if(topicSelect){
    dropdownList=true;
    if(topicSelect.labour === "no"){
        document.getElementById("unemploymentM").style.display="none";
        document.getElementById("unemploymentF").style.display="none";
    }
    if(topicSelect.demographic === "no"){
        document.getElementById("agedPop").style.display="none";
        document.getElementById("popChange").style.display="none";

    }
    if(topicSelect.education === "no"){
        document.getElementById("educationLow").style.display="none";
        document.getElementById("educationHigh").style.display="none";
    }

    if(topicSelect.health === "yes"){

    }else{

    }
    if(topicSelect.social === "no"){
        document.getElementById("highSkilledLabour").style.display="none";
        document.getElementById("lowSkilledLabour").style.display="none";
        document.getElementById("personsRoom").style.display="none";
        document.getElementById("singleParents").style.display="none";
    }
} else{
    dropdownList=false;
}

//dropdown list function

document.getElementById("dropdown-list").onclick = function() {myFunctionDropdown()};

function myFunctionDropdown() {
    if(dropdownList===true){

        if(document.getElementById("dropdown-icon").className === "fas fa-chevron-circle-down"){

            document.getElementById("unemploymentM").style.display="block";
            document.getElementById("unemploymentF").style.display="block";
            document.getElementById("agedPop").style.display="block";
            document.getElementById("popChange").style.display="block";
            document.getElementById("educationLow").style.display="block";
            document.getElementById("educationHigh").style.display="block";
            document.getElementById("highSkilledLabour").style.display="block";
            document.getElementById("lowSkilledLabour").style.display="block";
            document.getElementById("personsRoom").style.display="block";
            document.getElementById("singleParents").style.display="block";

            document.getElementById("dropdown-icon").className = "fas fa-chevron-circle-up";

        }
        else{
            if(topicSelect.labour === "no"){
                document.getElementById("unemploymentM").style.display="none";
                document.getElementById("unemploymentF").style.display="none";
            }
            if(topicSelect.demographic === "no"){
                document.getElementById("agedPop").style.display="none";
                document.getElementById("popChange").style.display="none";

            }
            if(topicSelect.education === "no"){
                document.getElementById("educationLow").style.display="none";
                document.getElementById("educationHigh").style.display="none";
            }

            if(topicSelect.health === "yes"){

            }else{

            }
            if(topicSelect.social === "no"){
                document.getElementById("highSkilledLabour").style.display="none";
                document.getElementById("lowSkilledLabour").style.display="none";
                document.getElementById("personsRoom").style.display="none";
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
