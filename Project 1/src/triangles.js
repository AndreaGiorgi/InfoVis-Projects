
var margin = {top: 20, right: 20, bottom: 40, left: 40};

var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var yScale = d3.scaleLinear().domain([0, 700]).range([0, height-45]);
var xScale = d3.scaleLinear().domain([0, 700]).range([0, width-75]);
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

  svg.append("g")
      .attr("transform", "translate(0, 0)")
      .call(y_axis);

  svg.append("g")
      .attr("transform", "translate(0, 0)")
      .call(x_axis);

  svg.append("text")
      .attr("transform", "translate(880, 0)")
      .attr("x", 15)
      .attr("font-size","15px")
      .style("text-anchor", "start")
      .text("X");

  svg.append("text")
      .attr("transform", "translate(0, 600)")
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

//Second implement: A triangle is a Polygon


   triangle_svg = svg.append('polygon')
            .data([triangle_coordinates])
            .attr("points",function(d) { 
                return d.map(function(d) {
                    return [d.x, d.y].join(","); }).join(" ");})
            .attr("fill", "rgb(" + triangle.tone +")")
            .on("click", triangle_event_handler());

     _.extend(triangle_svg, { x: x1, y: y1, height: triangle.height, widht: triangle.base_dim});


function triangle_event_handler(){
  
     var keyPressed = {};

     d3.select('body')  
       .on('keydown', function(event) {
         keyPressed[event.keyIdentifier] = true;
       })
       .on('keyup', function(event) {
         keyPressed[event.keyIdentifier] = false;
       });

    moveTriangle = function() {

        var x = triangle_svg.x;
        var y = triangle_svg.y;
      
        if (keyPressed['x']) {
            triangle_svg.x = isInBounds(x - triangle_svg._speed, 'width');
        }
        if (keyPressed['y']) {
            triangle_svg.y = isInBounds(y - triangle_svg._speed, 'height');
        }
        triangle_svg.move(x, y);
      };
      
    isInBounds = function(n, dimension) {  
        if (n < 0) {
          return 0;
        } else if (n > svg.attr(dimension)) {
          return svg.attr(dimension);
        } else {
          return n;
        }
      }
    
      triangle_svg.move = function(x, y) {  
        var dx = this.x - x;
        var dy = this.y - y;
        if (dx !== 0 || dy !== 0) {
          this.angle = 360 * (Math.atan2(dy, dx) / (Math.PI * 2));
        }
        triangle_svg.attr('transform', function() {
          return 'rotate(' + [this.angle, this.x + 20, this.y + 15].join() + ')' +
            'translate(' + [this.x, this.y].join() + ')';
        }.bind(this));
      };
    }
//First implement: three lines for each triangle
/*
    var triangle_poly = svg.append('g')
    triangle_poly.append("line")
        .attr("x1", x1)
        .attr("x2", x2)
        .attr("y1", y1)
        .attr("y2", y1)
        .attr("stroke", "rgb(" + triangle.tone +")")
        .attr("stroke-width", 3)
        .on("click", function(event){
            console.log(event.key);
            var keyCode = event.key;
            if (keyCode === 88){ //KeyCode 88 = X key
                console.log("Congrats you pressed X");
            }

            if(event.keyCode     === 89){ //KeyCode 89 = Y Key
                console.log("Congrats, you pressed Y");
            }

            if (event.ctrlKey){
                value = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y1-y1, 2));
                console.log("Coordinates [" + x1 + "," + y1 + "]" + " " + "[" + x2 + "," + y1 + "] \n Lenght: " + value );
            }
        }); 

    triangle_poly.append("line")
        .attr("x1", x1 )
        .attr("x2", x3)
        .attr("y1", y1)
        .attr("y2", y2)
        .attr("stroke", "rgb(" + triangle.tone +")")
        .attr("stroke-width", 3)
        .on("click", function(){
            if (d3.event.key === 88){ //KeyCode 88 = X key
                console.log("Congrats you pressed X");
            }

            if(d3.event.key === 89){ //KeyCode 89 = Y Key
                console.log("Congrats, you pressed Y");
            }
            if (d3.event.ctrlKey){
                console.log("Coordinates [" + x1 + "," + y1 + "]" + " " + "[" + x3 + "," + y2 + "]");
                value = Math.pow(x3-x1, 2) + Math.pow(y2-y1, 2);
                console.log("Lenght: " + parseInt(Math.sqrt(value)));
            }
        }); 

    triangle_poly.append("line")
        .attr("x1", x2)
        .attr("x2", x3)
        .attr("y1", y1)
        .attr("y2", y2)
        .attr("stroke-width", 3)
        .attr("stroke", "rgb(" + triangle.tone +")")
        .on("click", function(){
            if (d3.event.key === 88){ //KeyCode 88 = X key
                console.log("Congrats you pressed X");
            }

            if(d3.event.key === 89){ //KeyCode 89 = Y Key
                console.log("Congrats, you pressed Y");
            }
            if (d3.event.ctrlKey){
                console.log("Coordinates [" + x2 + "," + y1 + "]" + " " + "[" + x3 + "," + y2 + "]");
                value = Math.pow(x3-x2, 2) + Math.pow(y2-y1, 2);
                console.log("Lenght: " + parseInt(Math.sqrt(value)));
            }
        });  */
}

d3.json("data/dataset.json").then(function(data) {
  console.log(data);
  drawAxes();
  for (element in data){
         drawTriangle(data[element]);
         d3.timer(moveTriangle);  
      }
  }).catch(function(error) {
  console.log(error);
  });