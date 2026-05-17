// set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 0,
    right: 15,
    bottom: 15,
    left: 0
};

var width = 150 - margin.right,
    height = 25 - margin.top - margin.bottom;

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

// barChartRight("test6.csv","#graphic","268097","LONEPA16",0,100,"%");

// barChartRight("test6.csv","#singleParents","DONEGAL","LONEPA16",0,100,"%");

if (localStorage.getItem("locationA")) {

    var place = localStorage.getItem("locationA");

barChartRight("test6.csv","#singleParents",place,"LONEPA16",0,100,"%");
barChartRight("test6.csv","#agedPop",place,"AGEDEP16",0,100,"%");
barChartRight("test6.csv","#educationLow",place,"EDLOW_16",0,100,"%");
barChartRight("test6.csv","#educationHigh",place,"EDHIGH16",0,100,"%");
barChartRight("test6.csv","#highSkilledLabour",place,"HLPROF16",0,100,"%");
barChartRight("test6.csv","#lowSkilledLabour",place,"LSKILL16",0,100,"%");
barChartRight("test6.csv","#unemploymentM",place,"UNEMPM16",0,100,"%");
barChartRight("test6.csv","#unemploymentF",place,"UNEMPF16",0,100,"%");
barChartRight("test6.csv","#personsRoom",place,"PEROOM16",0,3.5,"");
barChartRight("test6.csv","#popChange",place,"POPCHG16",0,1.5,"");

// Target the relevant span tags in the quakeInfo div
    var hpsDisplay = document.getElementById('hps');
    var locDisplay = document.getElementById('loc');
    var popDisplay = document.getElementById('pop');
    var rangeDisplay = document.getElementById('range');

    hpsDisplay.textContent = localStorage.getItem("scoreA")

    if (localStorage.getItem("county")==="false"){
        locDisplay.textContent = localStorage.getItem("locationAname");
    }
    else{
        locDisplay.textContent = "COUNTY "+localStorage.getItem("countyNameA");

    }

    popDisplay.textContent = localStorage.getItem("totPopA");
    rangeDisplay.textContent = localStorage.getItem("scoreRangeA");


}