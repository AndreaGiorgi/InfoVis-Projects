var margin = {top: 20, right: 20, bottom: 30, left: 40};

var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var number = 10;
var borderSize = 1;
var body = d3.select("body");
var triangle = d3.symbol()
  .type(d3.symbolTriangle);

var svg = body.append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("border", "0.5px solid black");


function drawTriangles(element){
    var dim = (element.height * element.base_dim)/2;
    svg.append("path")
      .attr("d", triangle.size(dim))
      .attr("transform", function (d) {
        var elementWidth = element.base_dim;
        var randomXOffset = element.horizontal_pos;
        var randomYOffset = element.vertical_pos;
        return "translate(" + randomXOffset + "," + randomYOffset + ")";
      })
      .attr("fill", "rgb(" + element.tone +")")
      .attr("opacity", 2)
      .attr("class", "path");
}

d3.json("data/dataset.json").then(function(data) {
  console.log(data);
  for (element in data){
          drawTriangles(data[element]);
      }
  }).catch(function(error) {
  console.log(error);
  });