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
	
	
var yScale = d3.scaleLinear().domain([0,height]).range([0, height]);
var yAxis = d3.axisLeft(yScale).ticks(10);
var xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
var xAxis = d3.axisBottom(xScale).ticks(10);


var xScaleTriangle = d3.scaleLinear().domain([0, width]).range([0, width]);
var yScaleTriangle = d3.scaleLinear().domain([0, height]).range([0, height]);

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

	var x1 = xScaleTriangle(parseInt(triangle.x)); //Coordinate [x,y]
    var x2 = xScaleTriangle(parseInt(x1) + parseInt(triangle.base_dim)); //width
    var x3 = xScaleTriangle(parseInt((x2 + x1)/2));
    var y1 = yScaleTriangle(parseInt(triangle.y)); // Coordinate [x,y]
    var y2 = yScaleTriangle(parseInt(y1) + parseInt(triangle.height)); //height

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
		

		// Se seleziono linea 1 allora devo usare la base. niente variabili temporanee si determinano ad ogni iterazione del for

		if(e.keyCode === KeyX){
			for(i=0; i < 10; i++){
				
				x1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x1");
				x2_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x2");
				base_line1 = d3.select(".line1_" + triangles[i]).attr("base_dim");

				x3_coordinate_line23 = d3.select(".line2_"+ triangles[i]).attr("x2");
	
				//la base diventa la x e la x diventa la base (anche a livello di attr)

				x1_line1 = xScaleTriangle(x1_coordinate_line1);
				base_dim_line1 = xScaleTriangle(base_line1);
				new_x2_line1 = xScaleTriangle(x2_coordinate_line1);
				random_colour = colorGen();

				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", base_dim_line1).transition().duration(2000).attr("x2", new_x2_line1).transition().duration(1).attr("base_dim", x1_line1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", new_x2_line1).transition().duration(2000).attr("x2", x3_coordinate_line23).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", base_dim_line1).transition().duration(2000).attr("x2", x3_coordinate_line23).transition().duration(1000).attr("stroke", random_colour);
			}
			
		}

		if(e.keyCode === KeyY){

			for(i=0; i < 10; i++){

				y1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("y1");
				x1_coordinate_line1 = d3.select(".line1_"+ triangles[i]).attr("x1");
				base_line1 = d3.select(".line1_" + triangles[i]).attr("base_dim");
				height_triangle = d3.select(".line1_" + triangles[i]).attr("height");


				base_dim_line1 = yScaleTriangle(base_line1);
				y1_line1 = yScaleTriangle(y1_coordinate_line1);
				new_y2 = yScale(parseInt(y1_line1) + parseInt(height_triangle));
				random_colour = colorGen();

				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", base_dim_line1).transition().duration(2000).attr("y2", base_dim_line1).transition().duration(1).attr("base_dim", y1_line1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", base_dim_line1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", base_dim_line1).transition().duration(2000).attr("y2", new_y2).transition().duration(1000).attr("stroke", random_colour);
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
					temp_x1 = xScale(temp_height); //Our height becomes our x coordinate
					temp_x2 = yScale(y1); //Our y coordinate becomes our width
					temp_x3 = xScale(parseInt((temp_x2 + temp_x1)/2));   

					random_colour = colorGen();
					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2).transition().duration(1000).attr("stroke", random_colour);	
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3).transition().duration(1000).attr("stroke", random_colour);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3).transition().duration(1000).attr("stroke", random_colour);
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

					random_colour = colorGen();
					d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1).transition().duration(1000).attr("stroke", random_colour);	
					d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1).transition().duration(1000).attr("stroke", random_colour);
					d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1).transition().duration(1000).attr("stroke", random_colour);
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
	.attr("tabindex", 0) 
	.on("dblclick", function () { focused = this; 
		alert("You have selected an edge of " + name + "\nThe original coordinates are [" + d3.select(this).attr("x1") + "," + d3.select(this).attr("y1") + "]");
		selected_triangle = this;
	})
	.on("click keydown", function(e){
		d3.select(this);
		console.log(e.keyCode);
		var temp_height = parseInt(y2-y1);
		
		if(e.keyCode === KeyX){

			newWidth = 1000;
			xScale.domain([0, newWidth - margin.left - margin.right]);
			xAxis.ticks(20);
			d3.select(".svgBox").transition().duration(0).attr("Width", newWidth);
			d3.select(".AxisX").transition().duration(2000).call(xAxis)
			for(i=0; i < 10; i++){

				var temp_x1 = xScale(temp_height); //Our height becomes our x coordinate
				var temp_x2 = yScale(y1); //Our y coordinate becomes our width
				var temp_x3 = xScale(parseInt((temp_x2 + temp_x1)/2));  
				
				random_colour = colorGen()
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition().duration(2000).attr("x2", temp_x2).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x2).transition(2000).attr("x2", temp_x3).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("x1", temp_x1).transition(2000).attr("x2", temp_x3).transition().duration(1000).attr("stroke", random_colour);
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
				var temp_y1 = yScale(temp_height); //Our height becomes our y coordinate
				var temp_y2 = yScale(y1); //Our y coordinate becomes our height
				
				random_colour = colorGen();
				d3.select(".line1_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition().duration(2000).attr("y2", temp_y1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line2_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1).transition().duration(1000).attr("stroke", random_colour);
				d3.select(".line3_"+ triangles[i]).transition().duration(2000).attr("y1", temp_y1).transition(2000).attr("y2",  temp_y2 + temp_y1).transition().duration(1000).attr("stroke", random_colour);
			}
		}
	});	
}