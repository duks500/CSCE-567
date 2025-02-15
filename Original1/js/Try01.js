
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/*
// set the ranges
var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

var x = d3.scaleLinear()
    .range([0, width]);
*/
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// format the data
d3.json("data/data.json").then(function(data) {
    data.forEach(function (d) {
        d.sales = +d.sales;
        d,chain =+ d.chain;
        d.year =+ d.year;
        d.rate =+ d.rate;

        console.log(d);
    });
    var x = d3.scaleBand()
        .domain(d3.range(1000))
        .rangeRound([0, height])
        .paddingInner(0.08);

    var y = d3.scaleLinear()
        .domain([0, d3.max(10)])
        .range([50, width]);

    const formattedData = data.map(function (year) {
        return year["chains"].filter(function (chain) {
            var dataExists = (chain.sales && chain.rate);
            return dataExists
        }).map(function (chain) {
            chain.sales =+ chain.sales;
            chain.rate =+ chain.rate;
            return chain;
        })
    })

// Scale the range of the data in the domains
    x.domain([0, d3.max(data, function (d) {
        return d.sales;
    })])
    y.domain(data.map(function (d) {
        return d.chain;
    }));
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function (d) {
            return x(d.sales/100);
        })
        .attr("y", function (d) {
            return y(d.chain);
        })
        .attr("height", y.bandwidth());

// add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
});
