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



//on map load
changeAnnotations();


// data switch
var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');

var layerId;
var userstyleId = 'ckd63pgex17xo1hmh9cite56s';

// function switchLayer(layer) {
//     layerId = layer.target.id;
//     console.log(layerId);
//     userstyleId = layerId;
//     console.log(userstyleId);
//     map.setStyle('mapbox://styles/zhiweizou/' + layerId);
//     changeAnnotations();
// }

// for (var i = 0; i < inputs.length; i++) {
//
//     inputs[i].onclick = switchLayer;
//     console.log(inputs[i]);
// }

var hoveredCountyId = null;
var hoveredSmallAreaId = null;

// Target the relevant span tags in the quakeInfo div
var hpsDisplay = document.getElementById('hps');
var locDisplay = document.getElementById('loc');
var popDisplay = document.getElementById('pop');
var rangeDisplay = document.getElementById('range');
//story
var lmStory = document.getElementById('lmStory');
var dpStory = document.getElementById('dpStory');
var eduStory = document.getElementById('eduStory');
var heStory = document.getElementById('heStory');
var sccStory = document.getElementById('sccStory');
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
        "data": "../dataGeo/cMap.geojson",
        'generateId': true // This ensures that all features have unique IDs
    });

    // load small area layer geojon
    map.addSource("smallArea", {
        "type": "geojson",
        "data": "../dataGeo/sMap.geojson",
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

    map.setFilter('counties-highlighted', ['in','COUNTY',localStorage.getItem("county_story")]);

});
//Display data on return - the latest story the user has looked at
if(localStorage.getItem("lmm")) {

    function displayData(divID){
        var text=document.getElementById(divID);
        // var textContent=text.textContent;
        // console.log(testContent);
        text.textContent=localStorage.getItem(divID);
        // localStorage.setItem(divID,textContent);
    }

    displayData("lmm");
    displayData("lmf");
    displayData("dptot");
    displayData("dpchg");
    displayData("eduh");
    displayData("edul");
    displayData("he");
    displayData("scc");
    displayData("pop");
    displayData("hps");



}

    //for the highlight smallArea outline
    map.on('click', function (e) {

        var center=map.getCenter;
        console.log(center);
        var {longitude, latitude} = map.getCenter();
        // console.log({longitude, latitude});
        // console.log(latitude);
var pointClicked=JSON.stringify(e.point);
        console.log(e.point["x"]);
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
            console.log(countyScore);
            // Display the countyScore, countyLocation in the sidebar
            hpsDisplay.textContent = countyScore;
            locDisplay.textContent = "COUNTY "+countyLocation;
            popDisplay.textContent = c_totPop.toLocaleString();
            rangeDisplay.textContent = " ";

            //labour market male
            if( e.features[0].properties.c_UNEMPM16 >= 9.77 && e.features[0].properties.c_UNEMPM16 < 13.26){
                lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ e.features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level is relatively low in Ireland. \n";
            }else if(e.features[0].properties.c_UNEMPM16 >=13.26 && e.features[0].properties.c_UNEMPM16 < 16.75){
                lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ e.features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level ranked in the middle. \n";
            }else if(e.features[0].properties.c_UNEMPM16 >= 16.75 && e.features[0].properties.c_UNEMPM16 <= 20.24){
                lmmDisplay.textContent = "Across HP Pobal Deprivation Score, about "+ e.features[0].properties.c_UNEMPM16+ "% of the male working-age population don’t have a paid job in "+countyLocation+". Unemployment Male level is quite high in Ireland. \n";
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


            if (map.getZoom() < zoomThreshold){
            console.log(countyID);
            }

            console.log(map.getZoom());

//store data in Local Storage for next visit
            localStorage.setItem("county_story",countyLocation );
            // localStorage.setItem("story_score",countyScore);
            // localStorage.setItem("story_population",c_totPop.toLocaleString());

            function storeData(divID){
                var text=document.getElementById(divID);
                var textContent=text.textContent;
                // console.log(testContent);

                localStorage.setItem(divID,textContent);
            }
            storeData("lmm");
            storeData("lmf");
            storeData("dptot");
            storeData("dpchg");
            storeData("eduh");
            storeData("edul");
            storeData("he");
            storeData("scc");
            storeData("pop");
            storeData("hps");

        });
        // Click to show smallArea features in sidebar
        map.on('click', 'smallArea-fills', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            if (map.getZoom() > zoomThreshold) {
                // Set variables equal to the current feature's c_HP2016rel COUNTY
                var smallAreaScore = e.features[0].properties.s_HP2016rel;
                var smallAreaLocation = e.features[0].properties.ED_ENGLISH;
                var locationID = e.features[0].properties.ED_ID;
                var s_totPop = e.features[0].properties.s_TOTPOP16;
                var s_range = e.features[0].properties.s_Score_Range;
                s_totPop=Number(s_totPop);
                console.log(smallAreaScore);
                // Display the countyScore, countyLocation in the sidebar
                hpsDisplay.textContent = smallAreaScore;
                locDisplay.textContent = smallAreaLocation;
                popDisplay.textContent = s_totPop.toLocaleString();
                rangeDisplay.textContent = s_range;
            }
        });


//Display relevant content based on the local storage user form data
var dropdownList=null;
var topicSelect = JSON.parse(localStorage.getItem("topics"));

if(topicSelect){
    dropdownList=true;

    if(topicSelect.labour === "no"){
        lmStory.style.display="none";
        lmmDisplay.style.display="none";
        lmfDisplay.style.display="none";

    }
    if(topicSelect.demographic === "no"){
        dpStory.style.display="none";
        dptotDisplay.style.display="none";
        dpchgDisplay.style.display="none";

    }
    if(topicSelect.education === "no"){
        eduStory.style.display="none";
        eduhDisplay.style.display="none";
        edulDisplay.style.display="none";

    }

    if(topicSelect.health === "no"){
        heStory.style.display="none";
        heDisplay.style.display="none";
    }
    if(topicSelect.social === "no"){

        sccStory.style.display="none";
        sccDisplay.style.display="none";
    }
} else{
    dropdownList=false;
}

document.getElementById("dropdown-list").onclick = function() {myFunctionDropdown()};

function myFunctionDropdown() {
    if(dropdownList===true){

        if(document.getElementById("dropdown-icon").className === "fas fa-chevron-circle-down"){

            lmStory.style.display="block";
            lmmDisplay.style.display="block";
            lmfDisplay.style.display="block";
            dpStory.style.display="block";
            dptotDisplay.style.display="block";
            dpchgDisplay.style.display="block";
            eduStory.style.display="block";
            eduhDisplay.style.display="block";
            edulDisplay.style.display="block";
            heStory.style.display="block";
            heDisplay.style.display="block";
            sccStory.style.display="block";
            sccDisplay.style.display="block";


            document.getElementById("dropdown-icon").className = "fas fa-chevron-circle-up";

        }
        else{
            if(topicSelect.labour === "no"){
                lmStory.style.display="none";
                lmmDisplay.style.display="none";
                lmfDisplay.style.display="none";

            }
            if(topicSelect.demographic === "no"){
                dpStory.style.display="none";
                dptotDisplay.style.display="none";
                dpchgDisplay.style.display="none";

            }
            if(topicSelect.education === "no"){
                eduStory.style.display="none";
                eduhDisplay.style.display="none";
                edulDisplay.style.display="none";

            }

            if(topicSelect.health === "no"){
                heStory.style.display="none";
                heDisplay.style.display="none";
            }
            if(topicSelect.social === "no"){

                sccStory.style.display="none";
                sccDisplay.style.display="none";
            }
            document.getElementById("dropdown-icon").className = "fas fa-chevron-circle-down";
        }
    }


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


        //
        // function ReplacingCountyLegend(){
        //     switch (userstyleId){
        //         case "ckd63pgex17xo1hmh9cite56s":
        //             document.getElementById("county-legend").src="legendImg/c_hp2016.png";
        //             break;
        //         case "ckct2q9bx2edj1iqh31puc4uh":
        //             document.getElementById("county-legend").src="legendImg/c_totpop16.png";
        //             break;
        //         case "ckczzhgu10jj01ipggsuayv80":
        //             document.getElementById("county-legend").src="legendImg/c_popchg16.png";
        //             break;
        //         case "ckd09ui420tkr1io3ge2jxa82":
        //             document.getElementById("county-legend").src="legendImg/c_agedep16.png";
        //             break;
        //         case "ckd0ac4zo0u4s1irx1w9ogprd":
        //             document.getElementById("county-legend").src="legendImg/c_lonepa16.png";
        //             break;
        //         case "ckd0arukt0uia1inyud8l4y9z":
        //             document.getElementById("county-legend").src="legendImg/c_edlow16.png";
        //             break;
        //         case "ckd0cqbye0wgn1iob9ihxn98v":
        //             document.getElementById("county-legend").src="legendImg/c_edhigh16.png";
        //             break;
        //         case "ckd0czvul0wk81ipgll9twc29":
        //             document.getElementById("county-legend").src="legendImg/c_hlprof16.png";
        //             break;
        //         case "ckd0d9u2f0wxv1ioiferdiuyq":
        //             document.getElementById("county-legend").src="legendImg/c_lskill16.png";
        //             break;
        //         case "ckd0dxkjy0xka1invcfjss43t":
        //             document.getElementById("county-legend").src="legendImg/c_unempm16.png";
        //             break;
        //         case "ckd0efxpf0y5z1imo9hx65ik8":
        //             document.getElementById("county-legend").src="legendImg/c_unempf16.png";
        //             break;
        //         case "ckd0er0y60f8y1in83ewdtpku":
        //             document.getElementById("county-legend").src="legendImg/c_peroom16.png";
        //     }
        //
        //
        // }
        // ReplacingCountyLegend();
        // function ReplacingsmallAreaLegend(){
        //     switch (userstyleId){
        //         case "ckd63pgex17xo1hmh9cite56s":
        //             document.getElementById("smallArea-legend").src="legendImg/s_hp2016.png";
        //             break;
        //         case "ckct2q9bx2edj1iqh31puc4uh":
        //             document.getElementById("smallArea-legend").src="legendImg/s_totpop16.png";
        //             break;
        //         case "ckczzhgu10jj01ipggsuayv80":
        //             document.getElementById("smallArea-legend").src="legendImg/s_popchg16.png";
        //             break;
        //         case "ckd09ui420tkr1io3ge2jxa82":
        //             document.getElementById("smallArea-legend").src="legendImg/s_agedep16.png";
        //             break;
        //         case "ckd0ac4zo0u4s1irx1w9ogprd":
        //             document.getElementById("smallArea-legend").src="legendImg/s_lonepa16.png";
        //             break;
        //         case "ckd0arukt0uia1inyud8l4y9z":
        //             document.getElementById("smallArea-legend").src="legendImg/s_edlow16.png";
        //             break;
        //         case "ckd0cqbye0wgn1iob9ihxn98v":
        //             document.getElementById("smallArea-legend").src="legendImg/s_edhigh16.png";
        //             break;
        //         case "ckd0czvul0wk81ipgll9twc29":
        //             document.getElementById("smallArea-legend").src="legendImg/s_hlprof16.png";
        //             break;
        //         case "ckd0d9u2f0wxv1ioiferdiuyq":
        //             document.getElementById("smallArea-legend").src="legendImg/s_lskill16.png";
        //             break;
        //         case "ckd0dxkjy0xka1invcfjss43t":
        //             document.getElementById("smallArea-legend").src="legendImg/s_unempm16.png";
        //             break;
        //         case "ckd0efxpf0y5z1imo9hx65ik8":
        //             document.getElementById("smallArea-legend").src="legendImg/s_unempf16.png";
        //             break;
        //         case "ckd0er0y60f8y1in83ewdtpku":
        //             document.getElementById("smallArea-legend").src="legendImg/s_peroom16.png";
        //     }
        //
        // }
        // ReplacingsmallAreaLegend();


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
