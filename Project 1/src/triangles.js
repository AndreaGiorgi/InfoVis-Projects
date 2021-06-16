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
				if(triangles[i] === name){
					temp_x1 = xScale(temp_width);
					temp_x2 = xScale(temp_width*2);
					temp_x3 = parseInt((temp_x2 + temp_x1)/2);  
					
					d3.select(".line1_"+ name).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2);
					d3.select(".line2_"+ name).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3);
					d3.select(".line3_"+ name).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3);
				}
			}
			
		}
		if(e.keyCode === KeyY){
			// Caratteristica: larghezza
			// We have to change axis scale in order to be sure to fit all triangles inside the SVG box

			newHeight = 2000;
			yScale.domain([0, newHeight - margin.top - margin.bottom])
			d3.select(".svgBox").transition().duration(0).attr("Height", newHeight);
			d3.select(".AxisY").transition().duration(2000).call(yAxis)
			for(i=0; i < 10; i++){
				if(triangles[i] === name){
				temp_y1 = yScale(temp_width);
				temp_y2 = yScale(y2 + temp_width);
				d3.select(".line1_"+ name).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1);
				d3.select(".line2_"+ name).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
				d3.select(".line3_"+ name).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
				}
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
			//Caratteristica: altezza
			newWidth = 500;
			xScale.domain([0, newWidth - margin.left - margin.right])
			xAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Width", newWidth);
			d3.select(".AxisX").transition().duration(2000).call(xAxis)
			for(i=0; i < 10; i++){
				if(triangles[i] === name){
					temp_x1 = xScale(temp_height);
					temp_x2 = xScale(temp_height + base_dim);
					temp_x3 = xScale(parseInt((temp_x2 + temp_x1)/2));   
				
					d3.select(".line1_"+ name).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2);
					d3.select(".line2_"+ name).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3);
					d3.select(".line3_"+ name).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3);
				}
			}

		}
		if(e.keyCode === KeyY){
			//Caratteristica: altezza 
			newHeight = 2000;
			yScale.domain([0, newHeight - margin.top - margin.bottom]);
			yAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Height", newHeight);
			d3.select(".AxisY").transition().duration(2000).call(yAxis)
			for(i=0; i < 10; i++){
				if(triangles[i] === name){
					temp_y1 = yScale(temp_height);
					temp_y2 = yScale(temp_height + yScale(y2));

					d3.select(".line1_"+ name).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1);
					d3.select(".line2_"+ name).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
					d3.select(".line3_"+ name).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
				}
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
		var temp_y1 = y1;
		var temp_y2 = y2;
		if(e.keyCode === KeyX){
			//Caratteristica: altezza
			newWidth = 1000;
			xScale.domain([0, newWidth - margin.left - margin.right]);
			xAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Width", newWidth);
			d3.select(".AxisX").transition().duration(2000).call(xAxis)
			for(i=0; i < 10; i++){
				if(triangles[i] === name){
					temp_x1 = xScale(temp_height);
					temp_x2 = xScale(temp_height + base_dim);
					temp_x3 = xScale(parseInt((temp_x2 + temp_x1)/2));  
				
					d3.select(".line1_"+ name).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2);
					d3.select(".line2_"+ name).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3);
					d3.select(".line3_"+ name).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3);
				}
			}
		}
		if(e.keyCode === KeyY){
			//Caratteristica: altezza

			newHeight = 2000;
			yScale.domain([0, newHeight - margin.top - margin.bottom]);
			yAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Height", newHeight);
			d3.select(".AxisY").transition().duration(2000).call(yAxis)
			for(i=0; i < 10; i++){
				if(triangles[i] === name){
					temp_y1 = yScale(temp_height);
					temp_y2 = yScale(temp_height + yScale(y2));

					d3.select(".line1_"+ name).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1);
					d3.select(".line2_"+ name).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
					d3.select(".line3_"+ name).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1);
				}
			}
		}
	});
	
}
