// Define margins, dimensions, and some line colors
var margin = { left:80, right:20, top:50, bottom:100 };
var height = 800 - margin.top - margin.bottom,
    width = 1450 - margin.left - margin.right;
// Define the scales and tell D3 how to draw the line
const x = d3.scaleLinear().domain([2008, 2018]).range([0, width]);
const y = d3.scaleLinear().domain([0, 40000]).range([height, 0]);
const line = d3.line().x(d => x(d.year)).y(d => y(d.population));

const chart = d3.select('svg').append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const tooltip = d3.select('#tooltip');
const tooltipLine = chart.append('line');

// Add the axes and a title
const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
chart.append('g').call(yAxis);
chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
chart.append('text').html('Top 6 Fast Food Chains In The USA 2008 - 2018 (According to QSR Magazine) In $MIL').attr('x', 180).style("font-size","30px")
    .style("font-family","Avant Garde").style("font-weight","700");
chart.append('text').html("Burger - McDonald's ").attr('x', 40).attr('y', 30).attr("fill", "#FF8C00").style("font-family","Avant Garde").style("font-weight","700");
chart.append('text').html("Snack - Starbucks Coffe ").attr('x', 40).attr('y', 50).attr("fill", "green").style("font-family","Avant Garde").style("font-weight","700");
chart.append('text').html("Sandwich - Subway ").attr('x', 40).attr('y', 70).attr("fill", "blue").style("font-family","Avant Garde").style("font-weight","700");
chart.append('text').html("Mexican - Taco Bell").attr('x', 40).attr('y', 90).attr("fill", "#8B0000").style("font-family","Avant Garde").style("font-weight","700");
chart.append('text').html("Pizza/Pasta - Pizza Hut").attr('x', 40).attr('y', 110).attr("fill", "grey").style("font-family","Avant Garde").style("font-weight","700");
chart.append('text').html("Chicken - Chick-fil-A").attr('x', 40).attr('y', 130).attr("fill", "#9932CC").style("font-family","Avant Garde").style("font-weight","700");


// Load the data and draw a chart
let states, tipBox;
d3.json('data/chain.json', d => {
    states = d;

    chart.selectAll()
        .data(states).enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', 4)
        .datum(d => d.history)
        .attr('d', line);

    chart.selectAll()
        .data(states).enter()
        .append('text')
        //name on the side
        //.html(d => d.name)
        .attr('fill', d => d.color)
        .attr('alignment-baseline', 'middle')
        .attr('x', width+7)
        .attr('dx', '.5em')
        .attr('y', d => y(d.currentProfit));

    tipBox = chart.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('opacity', 0)
        .on('mousemove', drawTooltip)
        .on('mouseout', removeTooltip);
})

function removeTooltip() {
    if (tooltip) tooltip.style('display', 'none');
    if (tooltipLine) tooltipLine.attr('stroke', 'none');
}

function drawTooltip() {
    const year = Math.floor((x.invert(d3.mouse(tipBox.node())[0]) + 0));// / 10) * 10;

    states.sort((a, b) => {
        return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
    })

    tooltipLine.attr('stroke', 'grey')
        .attr('x1', x(year))
        .attr('x2', x(year))
        .attr('y1', 0)
        .attr('y2', height);

    tooltip.html(year)
        .style('display', 'block')
        .style('left', d3.event.pageX + 20)
        .style('top', d3.event.pageY - 20)
        .selectAll()
        .data(states).enter()
        .append('div')
        .style('color', d => d.color)
        .html(d => d.name + ': ' + d.history.find(h => h.year == year).population + "$").style("font-weight","700");
}
