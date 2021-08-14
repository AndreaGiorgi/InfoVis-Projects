let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let stationsData //Storage for stations data
let lineChartData //Storage for linecharts data
let svg = d3.select('#canvas') //D3 selection
let slider = d3.sliderHorizontal() //Initialize global Slider istance 
let time = 0

let projection
let path
let interval
let path_station



const color_domain = [0.080, 0.090, 0.100, 0.110, 0.120, 0.130, 0.140, 0.141];
const color_domain_stations = [0.060, 0.080, 0,085, 0.090, 0.095, 0.100, 0.110, 0.120, 0.130, 0.135, 0.141];

// For station color mapping some more shades are present. This new shades are needed for better visualization
const color_legend = d3.scaleThreshold().range(['#FFCCCC', '#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#D30000', '#AF0000']).domain(color_domain);
const color_legend_stations = d3.scaleThreshold().range(['#FFF9F9', 'FFCCCC','#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#C10000', '#B30C0C','#D30000', '#AF0000']).domain(color_domain_stations);

//List containing all topology data paths
const norwayDatasets = ['data\/map_data_1617.json','data\/map_data_1718.json','data\/map_data_1819.json','data\/map_data_1920.json','data\/map_data_2021.json',
	'data\/map_data_2122.json','data\/map_data_2223.json','data\/map_data_2324.json','data\/map_data_2425.json','data\/map_data_2526.json', 
	'data\/map_data_2627.json', 'data\/map_data_2728.json', 'data\/map_data_2829.json', 'data\/map_data_2930.json', 'data\/map_data_3031.json'];

const dateRange = ['17 July 2021', '18 July 2021', '19 July 2021', '20 July 2021', '21 July 2021',
'22 July 2021', '23 July 2021', '24 July 2021', '25 July 2021', '26 July 2021', '27 July 2021', '28 July 2021',
'29 July 2021', '30 July 2021']; 



/* setStationTooltips: Initialize and defines each station tooltip, showing County name and Radiation value */

let setStationTooltips = () => {

	index = time.toString()
	stations = svg.selectAll('.station');
	stations.attr('data-tippy-content', (d, i) => {
		return `Station: ${d['properties']['name']}, County: ${d['properties']['county']}, Radiations value: ${d['properties']['value' + index]} µSv/h`;
	});

	tippy(stations.nodes(), {
		followCursor: 'true',
		duration: 300,
		inlinePositioning: true,
		animation: 'fade',
		arrow: true,
	});
	
}


/* setTimeSlider: Define the date slider, each day change is associated to a new data file forcing the transition. */

let setTimeSlider = () => {

	slider
		.min(16)
		.max(30)
		.step(1)
		.width(450)
		.displayValue(true)
		.on('onchange', (val) => {
			document.getElementById("date").innerHTML = val + ' July 2021';
			index = val - 16;
			time = index;
			d3.json(norwayDatasets[index]).then(
				(data, error) => {
					if (error) {
						console.log(error);
					}else{
						rawData = topojson.feature(data, data.objects.map_data_topo);
						projection = d3.geoMercator().fitSize([870, 520], rawNorwayData);
						path = d3.geoPath().projection(projection);
						transition_data = topojson.feature(data, data.objects.map_data_topo).features;
						transitionMap(transition_data);
					}})
		});

	d3.select('#slider')
		.append('svg')
		.attr('width', 500)
		.attr('height', 70)
		.append('g')
		.attr('transform', 'translate(30,30)') 
		.call(slider);
}

/* drawStations: using map_data_stations topology data draws each single station on norwegian territory. #Stations = 33 */

let drawStations = () => {

	d3.json('data\/map_data_stations.json').then(
		(data, error) => {
			if (error) {  
				console.log(error);
			}else{

				path_station = d3.geoPath().projection(projection);
				stationsData = topojson.feature(data, data.objects.map_data_stations).features;
				
				console.log(stationsData)

				svg.selectAll('path')
				.data(stationsData)
				.enter()
				.append('path')
				.attr('d', path)
				.attr("opacity", 0.8)
				.attr('stroke', "#080705")
				.attr('stroke-width', 1)
				.attr('fill', (d) => {
					const value = d['properties']['value0'];
					if (value) {
					return color_legend_stations(d['properties']['value0']);
					} else {
						return '#ccc';}
					})
				.attr("class", (d) => {return "station"})
				.on("mouseover",function(d){
					setStationTooltips();
				})
				.classed('svg-content-responsive', true);
			}
		}
	)
}

/* drawMap: Using norwayData it plots a choropleth using as territory the norwegian one. */

let drawMap = () => {

	document.getElementById("date").innerHTML = '16 July 2021';
	document.getElementById("reset-button").style.display = 'none';

	setTimeSlider();

	svg.selectAll('path')
		.data(norwayData)
		.enter()
		.append('path')
		.attr('d', path)
		.attr("opacity", 0.8)
		.attr('stroke', "#F5FBEF")
		.attr('stroke-width', 1)
		.attr('fill', (d) => {
			const value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			})
		.attr("class", (d) => {return "county"})
		.on("mouseover",function(d){

			d3.selectAll(".county")
				.transition()
				.duration(200)
				.attr("opacity", .5)
			
		  	d3.select(this)
				.transition()
				.duration(200)
				.attr("opacity", 1)
				.attr("stroke", "black")
			
		})
		.on("mouseleave", function(d) {

			d3.selectAll(".county")
				.transition()
				.duration(200)
				.attr("opacity", .8)
				.attr("stroke", "#F5FBEF")
			
			d3.select(this)
				.transition()
				.duration(200)
				.attr("stroke", "#F5FBEF")

		})
		.classed('svg-content-responsive', true);
}

/* transitionStations: takes day as input and use it for accessing the right value to plot alongside the map transitions */

let transitionStations = (day) => {

	index = day.toString()
	svg.selectAll('path')
		.data(stationsData)
		.transition()
		.duration(1500)
		.attr('fill', (d) => {
			let value = d['properties']['value' + index];
			if (value) {
				return color_legend_stations(d['properties']['value' + index]);
			} else {
				return '#ccc';}
			})

}

/* transitionMap: takes "data" as input and uses it for plotting the new topology data based on the day of observation */

let transitionMap = (data) => {

	svg.selectAll('path')
		.data(data)
		.transition()
		.duration(1500)
		.attr('fill', (d) => {
			let value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			})
}

/* Script for the animation play button*/

playButton = () => {

	let time = 0
	var transition_data;
    interval = setInterval(() => { 
      if (time <= 14) { 
		d3.json(norwayDatasets[time]).then(
			(data, error) => {
				if (error) {
					console.log(error);
				}else{
					document.getElementById("play-button").style.display = 'none';
					document.getElementById("reset-button").style.display = 'block';
					slider_value = time + 16;
					rawData = topojson.feature(data, data.objects.map_data_topo);
					projection = d3.geoMercator().fitSize([870, 520], rawNorwayData);
					path = d3.geoPath().projection(projection);
					transition_data = topojson.feature(data, data.objects.map_data_topo).features;

					document.getElementById("date").innerHTML = dateRange[time];
					transitionStations(time);
					slider.value(slider_value)
					transitionMap(transition_data);
					time++;
					
			}})}
      else { 
          clearInterval(interval);
      }
    }, 2500);
  }

/* Script for the animation reset button */
  
resetButton = () => {

	clearInterval(interval);
	document.getElementById("play-button").style.display = 'block';
	document.getElementById("reset-button").style.display = 'none';

	let reset = setTimeout(transitionMap(norwayData), 1500);
	document.getElementById("date").innerHTML = '16 July 2021';
	slider_value = 16
	slider.value(slider_value)
	clearTimeout(reset);
  }

/* Using a dedicated dataset it draws each county linechart. The linechart will show the radiation change during the 
  observation period. It draws also an average line showing the average radiation trend in Norway. It defines also a dynamic
  legend improving the capabilities of the line charts. 
*/

let drawLineCharts = () => {

	const margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

	const svg = d3.select(".multiple_charts")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

	d3.json("data\/multiple_charts.json").then(
		(data,error) => {
			if (error) {
				console.log(error);
			}else{
				const allCounties = new Set(data.map(d => d.county))
				console.log(allCounties)
				
				var reset = 0;

				d3.select("#selectButton")
					.selectAll('counties')
					.data(allCounties)
					.enter()
					.append('option')
					.text(function(d) {return d;}) //text
					.attr("value", function(d) { return d;}) // returned value

				const colorscale = d3.scaleOrdinal().domain(allCounties).range(["#C20114", "#FBAF00", "#EFCA08", "#143109", "#D64933","#119DA4", "#D5A021", "#7F6A93", "#5DA9E9","#E8CCBF", "#95C623", 
				"#E55812"]);

				// Add X axis --> it is a date format
				const x = d3.scaleLinear().domain(d3.extent(data, (d) => { return d.day;})).range([ 0, width ]);
				svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x).ticks(15));

				const y = d3.scaleLinear().domain([0, 0.250]).range([height, 0 ]);
				svg.append("g").call(d3.axisLeft(y).ticks(10));

				const legend = d3.select("#legend_chart")

				const line = svg
					.append("g")
					.append("path")
					.datum(data.filter(function(d){return d.county == "Norway"}))
					.attr("d", 
						d3.line()
						.x((d) => { return x(d.day)})
						.y((d) => { return y(+d.value)})
						.curve(d3.curveNatural)
					)
					.attr("stroke", (d) => {return colorscale(d.county)})
					.attr("stroke-width", 4)
					.attr('fill', 'transparent')

				svg.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0 - margin.left)
					.attr("x", - 50)
					.attr("dy", "1em")
					.attr("font-size", "0.75em")
					.style("text-anchor", "middle")
					.text("Average µSv/h");

				svg.append("text")
					.attr("y", height + 28)
					.attr("x", (width/2))
					.attr("dx", "1em")
					.attr("font-size", "0.75em")
					.style("text-anchor", "end")
					.text("Day");


				const average_line = svg
						.append("g")
						.append("path")
						.datum(data.filter(function(d){return d.county == "Norway"}))
						.attr("d", 
							d3.line()
							.x((d) => { return x(d.day)})
							.y((d) => { return y(+d.value)})
							.curve(d3.curveNatural)
						)
						.attr('fill', 'transparent')
						.attr("stroke", "#C20114")
						.attr("stroke-width", 4)

				legend
					.append("circle")
					.attr("class", "average")
					.attr("cx",50)
					.attr("cy", 50)
					.attr("r", 6)
					.attr("fill", "#C20114")
				
				legend
					.append("text")
					.attr("class", "average")
					.attr("x", 70)
					.attr("y", 50)
					.text("National Average")
					.style("font-size", "15px")
		
				legend
					.append("circle")
					.attr("class", "county_legend_circle")
					.attr("cx",50)
					.attr("cy", 90)
					.attr("r", 6)
					.attr("fill", "none")

				legend
					.append("text")
					.attr("class", "county_legend")
					.attr("x", 70)
					.attr("y", 90)
					.text("")
					.style("font-size", "15px")

			
				function update(selectedCounty){
					var color
					const dataFilter = data.filter(function(d){return d.county==selectedCounty})

					/* if reset allows to recreate the removed elements of the legend. This elements are removed when the end user
						selects again "Norway"
					*/

					if(reset == 1){
						legend
							.append("circle")
							.attr("class", "county_legend_circle")
							.attr("cx",50)
							.attr("cy", 90)
							.attr("r", 6)
							.attr("fill", "none")

						legend
							.append("text")
							.attr("class", "county_legend")
							.attr("x", 70)
							.attr("y", 90)
							.text("")
							.style("font-size", "15px")

						reset = 0;
					}

					line
						.datum(dataFilter)
						.transition()
						.duration(1500)
						.attr("d", d3.line()
						.x(function(d) { return x(d.day) })
						.y(function(d) { return y(+d.value) })
						.curve(d3.curveNatural)
						)
						.attr("stroke", function(d){ color = colorscale(selectedCounty); return color});

					legend_county = d3.select(".county_legend")

					if(selectedCounty != "Norway"){
						legend_county
							.transition()
							.duration(200)
							.style("font-size", "0px")
							.transition()
							.duration(800)
							.style("font-size", "15px")
							.text(selectedCounty)

						legend_circle = d3.select(".county_legend_circle")

						legend_circle
							.transition()
							.duration(1000)
							.attr("fill", color)
					} else {
						reset = 1;
						d3.select(".county_legend_circle").remove();
						d3.select(".county_legend").remove();
					}

					average_line
						.transition()
						.duration(800)
						.attr("stroke-width", 0)
						.transition()
						.duration(1500)
						.attr("stroke-width", 4);

				}

				d3.select("#selectButton").on("change", function(event, d) {
					const selectedOption = d3.select(this).property("value")
					update(selectedOption)
				});

			}
		});
}

/* Using the first dataset it starts the visualization project*/
		
d3.json(norwayDatasets[0]).then(
	(data, error) => {
		if (error) {
			console.log(error);
		}else{
			rawNorwayData = topojson.feature(data, data.objects.map_data_topo);
			projection = d3.geoMercator().fitSize([800, 600], rawNorwayData);
			path = d3.geoPath().projection(projection);
			
			norwayData = topojson.feature(data, data.objects.map_data_topo).features;
			console.log(norwayData);
			drawMap();
			drawStations();
			drawLineCharts();
	 				}
				}
			)