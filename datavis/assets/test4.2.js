// set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 0,
    right: 0,
    bottom: 15,
    left: 0
};

var width = 150 - margin.right,
    height = 25 - margin.top - margin.bottom;


//function for creating the bar charts
function barChartLeft(file,divID,location,factor,min, max, text){


    d3.csv(file, function(data) {
        var svg = d3.select(divID).append("svg")
        // .attr("viewBox", '0 0 45 200')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            // .attr("preserveAspectRatio", "xMinYMin meet")

            .append("g")
            // .attr("viewBox", '0 0 45 200')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        data = data.filter(function(row){
            return row["ED_ID"]==factor;
        })

        console.log(data);


        var x = d3.scale.linear()
            .range([0, width])
            .domain([min,max]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.ED_ID==factor;
            }));


        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            // .transition()
            // .duration(1000)
            // .attr("rx", 4)
            // .attr("ry", 4)
            .attr("y", function (d) {
                return y(d.ED_ID==factor);
            })
            .attr("height", y.rangeBand())
            .attr("x",function(d) { return width-x(Math.abs(d[location])); } )
            .transition()
            .duration(1000)
            .attr("width", function (d) {
                if(d[location]!=="0"){
                return x(Math.abs(d[location]));}
                else{return x(0);}
                // return x(0);
            });


        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .transition()
            .delay(750)
            .attr("y", function (d) {
                return y(d.ED_ID==factor) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return width-x(Math.abs(d[location])) - 35;
            })
            .text(function (d) {
                return d[location]
                    +text});
    })

}

//End Function


if (localStorage.getItem("locationA")) {
    var place = localStorage.getItem("locationA");
    //Lone Parent Ratio
    barChartLeft("test6.csv", "#graphic2", place, "LONEPA16", 0, 100, "%");
//Age Dependency Ratio
    barChartLeft("test6.csv", "#agedPop2", place, "AGEDEP16", 0, 100, "%");
//Education: Primary School only
    barChartLeft("test6.csv", "#educationLow2", place, "EDLOW_16", 0, 100, "%");
//Education: High
    barChartLeft("test6.csv", "#educationHigh2", place, "EDHIGH16", 0, 100, "%");
//High Skilled Labour
    barChartLeft("test6.csv", "#highSkilledLabour2", place, "HLPROF16", 0, 100, "%");
//Low Skilled Labour
    barChartLeft("test6.csv", "#lowSkilledLabour2", place, "LSKILL16", 0, 100, "%");
//Unemployment Male
    barChartLeft("test6.csv", "#unemploymentM2", place, "UNEMPM16", 0, 100, "%");
//Unemployment Female
    barChartLeft("test6.csv", "#unemploymentF2", place, "UNEMPF16", 0, 100, "%");
//Persons per Room
    barChartLeft("test6.csv", "#personsRoom2", place, "PEROOM16", 0, 3.5, "");
//Population Change
    barChartLeft("test6.csv", "#popChange2", place, "POPCHG16", 0, 1.5, "");



    // var placeName = localStorage.getItem("locationAname");
    // var placeScore=localStorage.getItem("scoreA");
    // var placePop=localStorage.getItem("totPopA");
// Target the relevant span tags in the quakeInfo div
    var hpsADisplay = document.getElementById('hpsA');
    var popADisplay = document.getElementById('popA');

//Update text for locations
    var locationADisplay=document.getElementById('LocationA');
    var countyNameADisplay=document.getElementById('countyNameA');


    if (localStorage.getItem("county")==="false"){
        locationADisplay.textContent = localStorage.getItem("locationAname");
        countyNameADisplay.textContent = localStorage.getItem("countyNameA");
    }
    else{
        locationADisplay.textContent = "COUNTY "+localStorage.getItem("countyNameA");
        countyNameADisplay.textContent = " ";
    }

    popADisplay.textContent = localStorage.getItem("totPopA");
    hpsADisplay.textContent = localStorage.getItem("scoreA");


}




function barChartRight(file,divID,location,factor,min, max, text){


    d3.csv(file, function(data) {



        var svg = d3.select(divID).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        data = data.filter(function(row){
            return row["ED_ID"]==factor;
        })

        var x = d3.scale.linear()
            .range([0, width])
            .domain([min,max]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.ED_ID;
            }));

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .transition()
            .duration(1000)
            // .attr("rx", 4)
            // .attr("ry", 4)
            .attr("y", function (d) {
                return y(d.ED_ID);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(Math.abs(d[location]));
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            .transition()
            .delay(750)
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.ED_ID) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(Math.abs(d[location])) + 5;
            })
            .text(function (d) {
                return d[location]
                    +text});
    })



}

// Lone Parent Ratio
// barChartRight("test6.csv","#graphic","268097","LONEPA16",0,100,"%");
// //Age Dependency Ratio
// barChartRight("test6.csv","#agedPop","268097","AGEDEP16",0,100,"%");
// //Education: Primary School only
// barChartRight("test6.csv","#educationLow","268097","EDLOW_16",0,100,"%");
// //Education: High
// barChartRight("test6.csv","#educationHigh","268097","EDHIGH16",0,100,"%");
// //High Skilled Labour
// barChartRight("test6.csv","#highSkilledLabour","268097","HLPROF16",0,100,"%");
// //Low Skilled Labour
// barChartRight("test6.csv","#lowSkilledLabour","268097","LSKILL16",0,100,"%");
// //Unemployment Male
// barChartRight("test6.csv","#unemploymentM","268097","UNEMPM16",0,100,"%");
// //Unemployment Female
// barChartRight("test6.csv","#unemploymentF","268097","UNEMPF16",0,100,"%");
// //Persons per Room
// barChartRight("test6.csv","#personsRoom","268097","PEROOM16",0,3.5,"");
// //Population Change
// barChartRight("test6.csv","#popChange","268097","POPCHG16",0,1.5,"");

function update(location) {

    d3.csv("test6.csv", function(data) {
        var svg = d3.select("#graphic");

        data = data.filter(function (row) {
            return row["ED_ID"] == "LONEPA16";
        })
    } )



    var x = d3.scale.linear()
        .range([0, width])
        .domain([0,100]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.ED_ID;
        }));
    // Update the X axis


    // Update the Y axis
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    var u = svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)

        .attr("rx", 13)
        .attr("ry", 13)
        .attr("y", function (d) {
            return y(d.ED_ID);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d[location]);
        })





    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
}