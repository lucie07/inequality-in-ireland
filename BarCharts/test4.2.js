//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 0,
    right: 0,
    bottom: 15,
    left: 0
};

var width = 500 - margin.right,
    height = 50 - margin.top - margin.bottom;


//function for creating the bar charts
function barChartLeft(file,divID,location,factor,min, max, text){
    d3.csv(file, function(data) {
    var svg = d3.select(divID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
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
        .attr("rx", 13)
        .attr("ry", 13)
        .attr("y", function (d) {
            return y(d.ED_ID==factor);
        })
        .attr("height", y.rangeBand())
        .attr("x",function(d) { return width-x(d[location]); } )
        .attr("width", function (d) {
            return x(d[location]);
        });

    var test=function (d) {
        return x(d[location]);
    }

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.ED_ID==factor) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return width-x(d[location]) - 50;
        })
        .text(function (d) {
            return d[location]
                +text});
})

}

//End Function

//Lone Parent Ratio
barChartLeft("test3.csv","#graphic2","128024","LONEPA16",0,100,"%");
//Age Dependency Ratio
barChartLeft("test3.csv","#agedPop2","128024","AGEDEP16",0,100,"%");
//Education: Primary School only
barChartLeft("test3.csv","#educationLow2","128024","EDLOW_16",0,100,"%");
//Education: High
barChartLeft("test3.csv","#educationHigh2","128024","EDHIGH16",0,100,"%");
//High Skilled Labour
barChartLeft("test3.csv","#highSkilledLabour2","128024","HLPROF16",0,100,"%");
//Low Skilled Labour
barChartLeft("test3.csv","#lowSkilledLabour2","128024","LSKILL16",0,100,"%");
//Unemployment Male
barChartLeft("test3.csv","#unemploymentM2","128024","UNEMPM16",0,100,"%");
//Unemployment Female
barChartLeft("test3.csv","#unemploymentF2","128024","UNEMPF16",0,100,"%");
//Persons per Room
barChartLeft("test3.csv","#personsRoom2","128024","PEROOM16",0,3.5,"");
//Population Change
barChartLeft("test3.csv","#popChange2","128024","POPCHG16",-1.5,1.5,"");


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
        .attr("rx", 13)
        .attr("ry", 13)
        .attr("y", function (d) {
            return y(d.ED_ID);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d[location]);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.ED_ID) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d[location]) + 15;
        })
        .text(function (d) {
            return d[location]
                +text});
})



}

//Lone Parent Ratio
barChartRight("test3.csv","#graphic","268097","LONEPA16",0,100,"%");
//Age Dependency Ratio
barChartRight("test3.csv","#agedPop","268097","AGEDEP16",0,100,"%");
//Education: Primary School only
barChartRight("test3.csv","#educationLow","268097","EDLOW_16",0,100,"%");
//Education: High
barChartRight("test3.csv","#educationHigh","268097","EDHIGH16",0,100,"%");
//High Skilled Labour
barChartRight("test3.csv","#highSkilledLabour","268097","HLPROF16",0,100,"%");
//Low Skilled Labour
barChartRight("test3.csv","#lowSkilledLabour","268097","LSKILL16",0,100,"%");
//Unemployment Male
barChartRight("test3.csv","#unemploymentM","268097","UNEMPM16",0,100,"%");
//Unemployment Female
barChartRight("test3.csv","#unemploymentF","268097","UNEMPF16",0,100,"%");
//Persons per Room
barChartRight("test3.csv","#personsRoom","268097","PEROOM16",0,3.5,"");
//Population Change
barChartRight("test3.csv","#popChange","268097","POPCHG16",-1.5,1.5,"");




