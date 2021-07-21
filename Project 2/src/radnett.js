var width = 2000
var height = 3000

d3.json("map_data.json").then(function(data){
	drawMap(data);
})

var svg = d3.select("body")
	.append("svg")
  	.attr("width", width)  // apply width,height to svg
  	.attr("height", height);

let projection = d3.geoMercator();

let geoGenerator = d3.geoPath();

function drawMap(norway){

	console.log(norway.features);
	//projection.fitSize([width, height], norway.features); // adjust the projection to the features
	
	svg.selectAll("path")
		.data(norway.features)
		.enter()
		.append("path")
		.attr("d", geoGenerator);
}
