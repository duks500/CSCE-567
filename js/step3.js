/*
*    main.js
*    HW1!
*    Part 2
*    Itay Goldfaden
*/

//loading the json file
var i = 0;
d3.csv("data/data.csv").then(function(data) {	data.forEach(function(d){
    d.sales= +d.sales;
    d.year =+ d.year;

    console.log(d);
});

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

// draw the "canvas"
    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);


    function update(data) {

        timeLabel.text(1799 + i);
        timeLabel.exit();
// select all the rectangle and add data
        var rects = svg.selectAll("rect")
            .data(data);

// loop and plot the data
        rects.enter()
            .append("rect")
            .attr("y", (d, i) => {
//margin
                return (i * 50) + 10;
            })
            //position
            .attr("x", 10)
            .attr("width", (d) => {
                return d.sales / 100;
            })
            //thickness
            .attr("height", 30)
            .attr("fill", "pink");
    };
    d3.interval(function() {
        i=i+1;
        update(formattedData[i]);
    }, 350);
})