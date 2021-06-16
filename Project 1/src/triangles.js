const KeyX = 88;
const KeyY = 89;

d3.json("data/dataset.json").then(function(data) {
	drawAxes();
	var i = 0;
	nameTriangles=["triangle_0","triangle_1","triangle_2","triangle_3","triangle_4","triangle_5","triangle_6","triangle_7","triangle_8","triangle_9"];
	for (element in data){
			drawTriangle(data[element], nameTriangles[i], nameTriangles);
			i++;
		}
	}).catch(function(error) {
	console.log(error);
	});

var margin = {top: 20, right: 10, bottom: 30, left: 100};

var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;
	
	
var yScale = d3.scaleLinear().domain([0,height]).range([0,height]);
var yAxis = d3.axisLeft(yScale).ticks(10);
var xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
var xAxis = d3.axisBottom(xScale).ticks(10);

var svg = d3.select("body").append("svg")
	.attr("class", "svgBox")
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


function drawTriangle(triangle, name, triangles){

	var x1 = parseInt(triangle.x); //Coordinate [x,y]
    var x2 = parseInt(x1) + parseInt(triangle.base_dim); //width
    var x3 = parseInt((x2 + x1)/2);
	var base_dim = parseInt(triangle.base_dim);
    var y1 = parseInt(triangle.y); // Coordinate [x,y]
    var y2 = parseInt(y1) + parseInt(triangle.height); //height

	line1 = svg.append("line")
	.attr("id", "line1")
	.attr("class", "line1_" + name)
	.attr("x1", x1)
	.attr("y1", y1)
	.attr("x2", x2)
	.attr("y2", y1)
	.attr("stroke", "rgb(" + triangle.tone +")")
	.attr("stroke-width", 2)
	.attr("tabindex", 0) //Javascript is hell on earth
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nCoordinates [" + x1 + "," + y1 + "]");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);
		var temp_width = parseInt(x2-x1);
		var temp_x1 = null;
		var temp_x2 = null;
		var temp_x3 = null;
		var temp_y1 = y1;
		var temp_y2 = y2;
		if(e.keyCode === KeyX){
			// Carateristica: larghezza

			// We have to change axis scale in order to be sure to fit all triangles inside the SVG box
			newWidth = 800;
			xScale.domain([0, newWidth - margin.left - margin.right])
			xAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Width", newWidth);
			d3.select(".AxisX").transition().duration(2000).call(xAxis)

			for(i=0; i < 10; i++){
					temp_x1 = xScale(temp_width); //Our witdh becomes our x coordinate
					temp_x2 = xScale(x1); //Our x coordinate becomes our width
					temp_x3 = parseInt((temp_x2 + temp_x1)/2);  
					
					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2);
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3);
			}
			
		}
		if(e.keyCode === KeyY){
			// We have to change axis scale in order to allow a better understanding

			newHeight = 1000;
			yScale.domain([0, newHeight - margin.top - margin.bottom])
			yAxis.ticks(30);
			d3.select(".svgBox").transition().duration(0).attr("Height", newHeight);
			d3.select(".AxisY").transition().duration(2000).call(yAxis)

			// selectAll sometimes doesn't work, switch to manual selection of all edges of all triangles. 
			// yScale is necessary in order to keep the triangles inside the svgBox, the dimensions are kept intact.

			for(i=0; i < 10; i++){
				temp_y1 = yScale(temp_width); //Width becomes our y coordinate
				temp_y2 = yScale(x1); //Our x coordinate becomes our height
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
				}
			
		}
	});

	line2 = svg.append("line")
	.attr("id", "line2")
	.attr("class", "line2_"+ name)
	.attr("x1", x2)
	.attr("y1", y1)
	.attr("x2", x3)
	.attr("y2", y2)  
	.attr("stroke", "rgb(" + triangle.tone +")")
	.attr("stroke-width", 3)
	.attr("tabindex", 0) //Javascript is hell on earth
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nCoordinates [" + x1 + "," + y1 + "]\n");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);
		var temp_height = parseInt(y2-y1);
		var temp_x1 = null;
		var temp_x2 = null;
		var temp_x3 = null;
		var temp_y1 = y1;
		var temp_y2 = y2;

		if(e.keyCode === KeyX){

			newWidth = 800;
			xScale.domain([0, newWidth - margin.left - margin.right])
			xAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Width", newWidth);
			d3.select(".AxisX").transition().duration(2000).call(xAxis)
			for(i=0; i < 10; i++){
					temp_x1 = temp_height; //Our height becomes our x coordinate
					temp_x2 = y1; //Our y coordinate becomes our width
					temp_x3 = parseInt((temp_x2 + temp_x1)/2);   
				
					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2);
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3);
			}

		}
		if(e.keyCode === KeyY){
	
			newHeight = 1000;
			yScale.domain([0, newHeight - margin.top - margin.bottom]);
			yAxis.ticks(30);
			d3.select(".svgBox").transition().duration(0).attr("Height", newHeight);
			d3.select(".AxisY").transition().duration(2000).call(yAxis)

			// selectAll sometimes doesn't work, switch to manual selection of all edges of all triangles. 
			// yScale is necessary in order to keep the triangles inside the svgBox, the dimensions are kept intact.

			for(i=0; i < 10; i++){
					temp_y1 = yScale(temp_height); //Our height becomes our y coordinate
					temp_y2 = yScale(y1); //Our y coordinate becomes our height [height = y2 - y1]

					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1);
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
			}
		}
	});

	line3 = svg.append("line")
	.attr("id", "line3")
	.attr("class", "line3_" + name)
	.attr("x1", x1)
	.attr("y1", y1)
	.attr("x2", x3)
	.attr("y2", y2)
	.attr("stroke", "rgb(" + triangle.tone +")")
	.attr("stroke-width", 5)
	.attr("tabindex", 0) //Javascript is hell on earth
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nCoordinates [" + x1 + "," + y1 + "]\n");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);
		var temp_height = parseInt(y2-y1);
		var temp_x1 = null;
		var temp_x2 = null;
		var temp_x3 = null;
		var temp_y1 = null;
		var temp_y2 = null;
		if(e.keyCode === KeyX){

			newWidth = 1000;
			xScale.domain([0, newWidth - margin.left - margin.right]);
			xAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Width", newWidth);
			d3.select(".AxisX").transition().duration(2000).call(xAxis)
			for(i=0; i < 10; i++){
				temp_x1 = temp_height; //Our height becomes our x coordinate
				temp_x2 = y1; //Our y coordinate becomes our width
				temp_x3 = parseInt((temp_x2 + temp_x1)/2);  
				
					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2);
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3);
			}
		}
		if(e.keyCode === KeyY){

			newHeight = 1000;
			yScale.domain([0, newHeight - margin.top - margin.bottom]);
			yAxis.ticks(30);
			d3.select(".svgBox").transition().duration(0).attr("Height", newHeight);
			d3.select(".AxisY").transition().duration(2000).call(yAxis)

			// selectAll sometimes doesn't work, switch to manual selection of all edges of all triangles. 
			// yScale is necessary in order to keep the triangles inside the svgBox, the dimensions are kept intact.

			for(i=0; i < 10; i++){
				temp_y1 = yScale(temp_height); //Our height becomes our y coordinate
				temp_y2 = yScale(y1); //Our y coordinate becomes our height

					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1);
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
			}
		}
	});
	
}
