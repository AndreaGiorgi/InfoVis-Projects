
var margin = {top: 20, right: 20, bottom: 40, left: 40};

var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var yScale = d3.scaleLinear().domain([0, 700]).range([0, height-45]);
var xScale = d3.scaleLinear().domain([0, 700]).range([0, width-55]);
var wScale = d3.scaleLinear().domain([0, 500]).range([0,75]);
var hScale =  d3.scaleLinear().domain([0, 500]).range([0,50]);

var x_axis = d3.axisBottom().scale(xScale);
var y_axis = d3.axisLeft().scale(yScale);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)     
    .attr("height", height + margin.top + margin.bottom)   
    .append("g")                                           
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function drawAxes(){

  var xAxisTranslate = height - 40;
  var xAxisTextTranslate = xAxisTranslate + 30;

  svg.append("g")
      .attr("transform", "translate(0, 0)")
      .call(y_axis);

  svg.append("g")
      .attr("transform", "translate(0, 0)")
      .call(x_axis);

  svg.append("text")
      .attr("transform", "translate(870, 0)")
      .attr("x", 15)
      .attr("font-size","15px")
      .style("text-anchor", "start")
      .text("X");

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("font-size","15px")
      .style("text-anchor", "end")
      .text("Y");
}

// base = [x, base_dim]
// altezza = [y + height]

function drawTriangle(triangle){

    var x1 = parseInt(triangle.x);
    var x2 = parseInt(x1) + parseInt(triangle.base_dim);
    var x3 = parseInt((x2 + x1)/2);
    var y1 = parseInt(triangle.y);
    var y2 = parseInt(y1) + parseInt(triangle.height);

    triangle_coordinates = 
    [{"x": x1, "y": y1},
    {"x": x2,"y": y1},
    {"x": x3,"y": y2}];

    console.log(triangle_coordinates)

    svg.append('polygon')
            .data([triangle_coordinates])
            .attr("points",function(d) { 
                return d.map(function(d) {
                    return [d.x, d.y].join(","); }).join(" ");})
            .attr("fill", "rgb(" + triangle.tone +")");

//First implement: three lines for each triangle

  /*  svg.append("line")
        .attr("x1", x1)
        .attr("x2", x2)
        .attr("y1", y1)
        .attr("y2", y1)
        .attr("stroke", "red");

    svg.append("line")
        .attr("x1", x1 )
        .attr("x2", x3)
        .attr("y1", y1)
        .attr("y2", y2)
        .attr("stroke", "blue");

    svg.append("line")
        .attr("x1", x2)
        .attr("x2", x3)
        .attr("y1", y1)
        .attr("y2", y2)
        .attr("stroke", "green"); */
}

d3.json("data/dataset.json").then(function(data) {
  console.log(data);
  drawAxes();
  for (element in data){
         drawTriangle(data[element]);
      }
  }).catch(function(error) {
  console.log(error);
  });