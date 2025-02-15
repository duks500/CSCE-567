
var margin = { left:80, right:20, top:50, bottom:100 };
var height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left +
        ", " + margin.top + ")");

var time = 0;
var i =0;
// Scales
var x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([142, 150000]);
console.log(x)
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);
console.log(y)
var area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000]);
console.log(area)
var continentColor = d3.scaleOrdinal(d3.schemePastel1);

// Labels
var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life Expectancy (Years)")

var timeLabel = g.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle");

// X Axis
var xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format("$"));
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){ return +d; });
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

d3.json("data/test.json").then(function(data){
    console.log(data);

//clean data
    const formattedData = data.map(function (year) {
        return year["countries"].filter(function (country) {
            var dataExists = (country.income && country.life_exp);
            return dataExists
        }).map(function (country) {
            country.income =+ country.income;
            country.life_exp =+ country.life_exp;
            return country;
        })
    })


//first run of the visualizaton
    function update(data) {

        timeLabel.text(1799 + i);
        timeLabel.exit();
        //d3.select("meantext").remove();
        var circles = g.selectAll("circle").data(formattedData[i], function(d) {
            return d.country;
        });
//enter
        circles.enter()
            .append("circle")
            .attr("class", "enter")
            .attr("fill", function(d) {
                return continentColor(d.continent); })
            .merge(circles)
            .attr("cy", function (d) { return y(d.life_exp); })
            .attr("cx", function(d)  { return x(d.income)})
            .attr("r", function (d) {
                return Math.sqrt(area(d.population) / Math.PI) });
        // EXIT
        // Remove old elements as needed.i
        circles.exit().remove();

    };
    //timeLabel.exit().remove();

    d3.interval(function() {
        i=i+1;
        update(formattedData[i]);
    }, 350);

});