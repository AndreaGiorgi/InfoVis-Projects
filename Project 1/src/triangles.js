const KeyX = 88; //Javascript code for X key
const KeyY = 89; //Javascript code for Y key

d3.json("data/dataset.json").then(function(data) {
	drawAxes();
	var i = 0;
	nameTriangles=["triangle_Sarah","triangle_Alice","triangle_Jenny","triangle_John","triangle_Max","triangle_Ken","triangle_Ryu","triangle_PacMan","triangle_Slug","triangle_Shinobi"];
	for (element in data){
			drawTriangle(data[element], nameTriangles[i], nameTriangles);
			i++;
		}
	}).catch(function(error) {
		console.log(error);
	});

var margin = {top: 20, right: 10, bottom: 30, left: 100};

var width = 2000 - margin.left - margin.right;
var height = 1500 - margin.top - margin.bottom;
	
	
var yScale = d3.scaleLinear().domain([0, height]).range([0, height]).clamp(true);
var yAxis = d3.axisLeft(yScale).ticks(15);
var xScale = d3.scaleLinear().domain([0, width]).range([0, width]).clamp(true);
var xAxis = d3.axisBottom(xScale).ticks(15);


var xScaleTriangle = d3.scaleLinear().domain([0, 1500]).range([0, 1500]).clamp(true);
var yScaleTriangle = d3.scaleLinear().domain([0, 850]).range([0, 850]).clamp(true);

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

function colorGen() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
  }

function drawTriangle(triangle, name, triangles){

	var x1 = xScaleTriangle(parseFloat(triangle.x)); //Coordinate [x,y]
    var x2 = xScaleTriangle(parseFloat(x1) + parseFloat(triangle.base_dim)); //width
    var x3 = xScaleTriangle(parseFloat((x2 + x1)/2));
    var y1 = yScaleTriangle(parseFloat(triangle.y)); // Coordinate [x,y]
    var y2 = yScaleTriangle(parseFloat(y1 + triangle.height)); //height

	line1 = svg.append("line")
	.attr("id", "line1")
	.attr("class", "line1_" + name)
	.attr("x1", x1)
	.attr("y1", y1)
	.attr("x2", x2)
	.attr("y2", y1)
	.attr("base_dim", triangle.base_dim)
	.attr("height", triangle.height)
	.attr("stroke", "rgb(" + triangle.tone +")")
	.attr("stroke-width", 2)
	.attr("tabindex", 0)  
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nThe original coordinates are [" + d3.select(this).attr("x1") + "," + d3.select(this).attr("y1") + "]");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);
		if(e.keyCode === KeyX){
			for(i=0; i < 10; i++){
				
				x1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x1");
				x2_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x2");
				base_line1 = d3.select(".line1_" + triangles[i]).attr("base_dim");
				x3_const = d3.select(".line2_"+ triangles[i]).attr("x2");
	
				old_x1 = parseFloat(x1_coordinate_line1);
				new_x1 = parseFloat(base_line1);
				x2_const = parseFloat(x2_coordinate_line1);
				random_colour = colorGen();

				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", new_x1).transition().duration(2000).attr("x2", x2_const).transition().duration(0).attr("base_dim", old_x1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", x2_const).transition().duration(2000).attr("x2", x3_const).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", new_x1).transition().duration(2000).attr("x2", x3_const).transition().duration(1000).attr("stroke", random_colour);
			}
			
		}

		if(e.keyCode === KeyY){
			for(i=0; i < 10; i++){

				y1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("y1");
				x1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x1");
				base_line1 = yScaleTriangle(d3.select(".line1_" + triangles[i]).attr("base_dim"));
				height_triangle = yScaleTriangle(d3.select(".line1_" + triangles[i]).attr("height"));


				old_y1 = parseFloat(y1_coordinate_line1);
				new_y1 = parseFloat(base_line1);
				new_y2 = parseFloat(new_y1 + height_triangle);
				random_colour = colorGen();

				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y1).transition().duration(0).attr("base_dim", old_y1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
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
	.attr("tabindex", 0)  
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nThe original coordinates are [" + d3.select(this).attr("x1") + "," + d3.select(this).attr("y1") + "]");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);

		if(e.keyCode === KeyX){
			for(i=0; i < 10; i++){
				
				x1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x1");
				base_line1 = d3.select(".line1_" + triangles[i]).attr("base_dim");
				height_triangle = yScaleTriangle(d3.select(".line1_" + triangles[i]).attr("height"));


				base_dim_line = parseFloat(base_line1);
				old_x1 = parseFloat(x1_coordinate_line1);
				new_x1 = parseFloat(height_triangle);
				new_x2 = parseFloat(new_x1) + parseFloat(base_dim_line);
				new_x3 = parseFloat((new_x1 + new_x2)/2);

				random_colour = colorGen();
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", new_x1).transition().duration(2000).attr("x2", new_x2).transition().duration(0).attr("height", old_x1).transition().duration(1000).attr("stroke", random_colour);	
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", new_x2).transition().duration(2000).attr("x2", new_x3).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", new_x1).transition().duration(2000).attr("x2", new_x3).transition().duration(1000).attr("stroke", random_colour);
			}

		}

		if(e.keyCode === KeyY){
			for(i=0; i < 10; i++){

				y1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("y1");
				y2_coordinate_line23 = d3.select(".line2_" + triangles[i]).attr("y2"); 
				height_triangle = yScaleTriangle(d3.select(".line1_" + triangles[i]).attr("height"));

				old_y1 = parseFloat(y1_coordinate_line1);
				new_y1 = parseFloat(height_triangle);
				new_y2 = parseFloat(y2_coordinate_line23);

				random_colour = colorGen();
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y1).transition().duration(1).attr("height", old_y1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
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
	.attr("base_dim", triangle.base_dim)
	.attr("height", triangle.height)
	.attr("stroke", "rgb(" + triangle.tone +")")
	.attr("stroke-width", 5)
	.attr("tabindex", 0) 
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nThe original coordinates are [" + d3.select(this).attr("x1") + "," + d3.select(this).attr("y1") + "]");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);

		if(e.keyCode === KeyX){
			for(i=0; i < 10; i++){
				y1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("y1");
				x1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x1");
				base_line1 = d3.select(".line1_" + triangles[i]).attr("base_dim");
				height_triangle = yScaleTriangle(d3.select(".line1_" + triangles[i]).attr("height"));


				base_dim_line = (base_line1);
				old_x1 = (parseFloat(x1_coordinate_line1));
				new_x1 = (parseFloat(height_triangle));
				new_x2 = (parseFloat(new_x1) + parseFloat(base_dim_line));
				new_x3 = (parseFloat((new_x1 + new_x2)/2));

				random_colour = colorGen();
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", new_x1).transition().duration(2000).attr("x2", new_x2).transition().duration(1).attr("height", old_x1).transition().duration(1000).attr("stroke", random_colour);	
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", new_x2).transition().duration(2000).attr("x2", new_x3).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", new_x1).transition().duration(2000).attr("x2", new_x3).transition().duration(1000).attr("stroke", random_colour);
			}
		}
		
		if(e.keyCode === KeyY){
			for(i=0; i < 10; i++){

				y1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("y1");
				y2_coordinate_line23 = d3.select(".line2_" + triangles[i]).attr("y2"); 
				height_triangle = d3.select(".line1_" + triangles[i]).attr("height");

				old_y1 = parseFloat(y1_coordinate_line1);
				new_y1 = parseFloat(height_triangle);
				new_y2 = parseFloat(y2_coordinate_line23);

				random_colour = colorGen();
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y1).transition().duration(1).attr("height", old_y1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", new_y1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
				}
		}
	});	
}