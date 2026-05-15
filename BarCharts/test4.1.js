
//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 0,
    right: 0,
    bottom: 15,
    left: 0
};

var width = 500 - margin.right,
    height = 50 - margin.top - margin.bottom;


//Lone Parent Ratio
d3.csv("test3.csv", function(data) {
    var svg = d3.select("#graphic2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data = data.filter(function(row){
        return row["ED_ID"]=="LONEPA16";
    })

    console.log(data);


    var x = d3.scale.linear()
        .range([0, width])
        .domain([0,100]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.ED_ID=="LONEPA16";
        }));

    //make y axis to show bar names
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     //no tick marks
    //     .tickSize(0)
    //     .orient("left");
    //
    // var gy = svg.append("g")
    //     .attr("class", "y axis")
    //         // .call(yAxis)
    //     // .select(".domain").remove();

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
            return y(d.ED_ID=="LONEPA16");
        })
        .attr("height", y.rangeBand())
        .attr("x",function(d) { return width-x(d["128024"]); } )
        .attr("width", function (d) {
            return x(d["128024"]);
        });

    var test=function (d) {
        return x(d["128024"]);
    }

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.ED_ID=="LONEPA16") + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return width-x(d["128024"]) - 50;
        })
        .text(function (d) {
            return d["128024"]
                +"%"});
})

d3.csv("test5.csv", function(data) {

    var svg = d3.select("#graphic").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0,100]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.ED_ID;
        }));

    //make y axis to show bar names
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     //no tick marks
    //     .tickSize(0)
    //     .orient("left");
    //
    // var gy = svg.append("g")
    //     .attr("class", "y axis")
    //         // .call(yAxis)
    //     // .select(".domain").remove();

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
            return x(d["268097"]);
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
            return x(d["268097"]) + 15;
        })
        .text(function (d) {
            return d["268097"]
                +"%"});
})





//Aged Population
d3.csv("test4.csv", function(data) {
    var svg = d3.select("#agedPop2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0,100]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.ED_ID;
        }));

    //make y axis to show bar names
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     //no tick marks
    //     .tickSize(0)
    //     .orient("left");
    //
    // var gy = svg.append("g")
    //     .attr("class", "y axis")
    //         // .call(yAxis)
    //     // .select(".domain").remove();

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
        .attr("x",function(d) { return width-x(d["128024"]); } )
        .attr("width", function (d) {
            return x(d["128024"]);
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
            return width-x(d["128024"]) - 50;
        })
        .text(function (d) {
            return d["128024"]
                +"%"});
})

d3.csv("test4.csv", function(data) {

    var svg = d3.select("#agedPop").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0,100]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.ED_ID;
        }));

    //make y axis to show bar names
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     //no tick marks
    //     .tickSize(0)
    //     .orient("left");
    //
    // var gy = svg.append("g")
    //     .attr("class", "y axis")
    //         // .call(yAxis)
    //     // .select(".domain").remove();

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")
        .attr("d", rightRoundedRect(0,  y.rangeBand()
            , function (d) {
                return x(d["268097"]);
            }, y.rangeBand(), 20));

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
            return x(d["268097"]);
        })


    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.ED_ID) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d["268097"]) + 15;
        })
        .text(function (d) {
            return d["268097"]
                +"%"});


// Returns path data for a rectangle with rounded right corners.
// Note: it’s probably easier to use a <rect> element with rx and ry attributes!
// The top-left corner is ⟨x,y⟩.
    function rightRoundedRect(x, y, width, height, radius) {
        return "M" + x + "," + y
            + "h" + (width - radius)
            + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
            + "v" + (height - 2 * radius)
            + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
            + "h" + (radius - width)
            + "z";
    }



})
