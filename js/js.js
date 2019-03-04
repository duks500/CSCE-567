var btn2014 = document.getElementById("2014")
btn2014.addEventListener('click', function(e){
    change(e.target.id)
})
var btn2002 = document.getElementById("2002")
btn2002.addEventListener('click', function(e){
    change(e.target.id)
})
var bothData = [
    {
        "year": "2014",
        "product": "Books & DVDs",
        "purchase": "0.5"
    },
    {
        "year": "2002",
        "product": "Books & DVDs",
        "purchase": "10"
    },
    {
        "year": "2014",
        "product": "Beer & Wine",
        "purchase": "7"
    },
    {
        "year": "2002",
        "product": "Beer & Wine",
        "purchase": "3"
    },
    {
        "year": "2014",
        "product": "Food",
        "purchase": "12"
    },
    {
        "year": "2002",
        "product": "Food",
        "purchase": "12"
    },
    {
        "year": "2014",
        "product": "Home Supplies",
        "purchase": "7"
    },
    {
        "year": "2002",
        "product": "Home Supplies",
        "purchase": "6"
    }
];

var data2002 = [];
var data2014 = [];

for(var i = 0; i < bothData.length; i++){
    if(bothData[i]["year"] === "2002"){
        data2002.push(bothData[i]);
    }else{
        data2014.push(bothData[i]);
    }
}

function change(value){
    if(value === '2002'){
        update(data2002);
    }else if(value === '2014'){
        update(data2014);
    }
}

function update(data){
    xChart.domain(data.map(function(d){ return d.product; }) );
    yChart.domain( [0, d3.max(data, function(d){ return + d.purchase; })] );

    var barWidth = width / data.length;

    var bars = chart.selectAll(".bar")
        .data(data, function(d){ return d.product; })
    bars.exit()
        .remove()
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i){return i * barWidth + 1 })
        .attr("y",function(d){ return yChart(d.purchase); })
        .attr("height",function(d){ return height - yChart(d.purchase); })
        .attr("width", barWidth - 5)
        .attr('fill', function(d){
            if(d.year === "2014"){
                return'#ea5454'
            }else{
                return'#4e97c4'
            }

        })


    bars.transition()
        .duration(600)
        .ease(d3.easeLinear)
        .attr('y', function(d){ return yChart(d.purchase); })
        .attr('height', function(d){ return height - yChart(d.purchase); })
        .style('fill', function(d){
            if(d.year === "2014"){
                return '#ea5454'
            } else {
                return '#4e97c4'
            }
        })
    chart.select('.y').call(yAxis);


    chart.select('.xAxis')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d){
            return "rotate(-65)";
        });

}

var margin = {top: 20, right: 20, bottom: 95, left: 50};
var width = 400;
var height = 500;

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xChart = d3.scaleBand()
    .range([0, width]);

var yChart = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(xChart);
var yAxis = d3.axisLeft(yChart);


chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)

chart.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d){
        return "rotate(-65)";
    });

chart.append("text")
    .attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
    .text("Purchases");

chart.append("text")
    .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
    .text("Products");

update(data2002);