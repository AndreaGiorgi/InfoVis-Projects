const KeyX = 88;
const KeyY = 89;

d3.json("data/dataset.json").then(function(data) {
	console.log(data);
	drawAxes();
	var i = 0
	nameTriangles=["triangle_1","triangle_2","triangle_3","triangle_4","triangle_5","triangle_6","triangle_7","triangle_9","triangle_9","triangle_10"]
	for (element in data){
			drawTriangle(data[element], nameTriangles[i], nameTriangles);
			i++;
		}
	}).catch(function(error) {
	console.log(error);
	});

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;
	
	
var yScale = d3.scaleLinear().domain([0,height]).range([0,height]);
var yAxis = d3.axisLeft(yScale).ticks(10);
var xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
var xAxis = d3.axisBottom(xScale).ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)   
    .attr("height", height + margin.top + margin.bottom)  
    .append("g")                                           
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function drawAxes(){
	svg.append("g")
	.attr("class", "AxisY")
	.call(yAxis);

	svg.append("g")
	.attr("class", "AxisX")
	.call(xAxis);
} 

function drawTriangle(triangle, name, trianglesNames){
	//A triangle will be contained inside a rect container. The dimensions width and height are locked with rect one

	var x1 = parseInt(triangle.x);
    var x2 = parseInt(x1) + parseInt(triangle.base_dim); //width
    var x3 = parseInt((x2 + x1)/2);
    var y1 = parseInt(triangle.y);
    var y2 = parseInt(y1) + parseInt(triangle.height); //height

    triangle_coordinates = 
    [{"x": x1, "y": y1},
    {"x": x2,"y": y1},
    {"x": x3,"y": y2}];

	triangle_svg = svg.append('polygon')
	.attr("class", name)
	.data([triangle_coordinates])
	.attr("points",function(d) { 
		return d.map(function(d) {
			return [d.x, d.y].join(","); }).join(" ");})
	.attr("fill", "rgb(" + triangle.tone +")")
	.attr("tabindex", 0) //Javascript documentation: hell on Earth but fundamental
	.on("click keydown", function(e){
		d3.select(this);
		code = e.keyCode
		console.log(code);
		if(code === KeyX){

		}
		if(code === KeyY){

		}
	}); 
}
