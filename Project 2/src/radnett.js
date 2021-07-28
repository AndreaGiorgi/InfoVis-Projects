let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let lineChartData //Storage for linecharts data
let svg = d3.select('#canvas') //D3 selection

let projection
let path

const color_domain = [0.080, 0.089, 0.99, 0.110, 0.120, 0.125, 0.130];
const color_legend = d3.scaleThreshold().range(['#FFCCCC', '#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#D30000']).domain(color_domain);

const norwayDatasets = ['data\/map_data_1617.json','data\/map_data_1718.json','data\/map_data_1819.json','data\/map_data_1920.json','data\/map_data_2021.json',
	'data\/map_data_2122.json','data\/map_data_2223.json','data\/map_data_2324.json','data\/map_data_2425.json','data\/map_data_2526.json'];

const dateRange = ['17 Luglio 2021', '18 Luglio 2021', '19 Luglio 2021', '20 Luglio 2021', '21 Luglio 2021',
'22 Luglio 2021', '23 Luglio 2021', '24 Luglio 2021', '25 Luglio 2021', '26 Luglio 2021', '27 Luglio 2021', '28 Luglio 2021',
'29 Luglio 2021', '30 Luglio 2021', '31 Luglio 2021'];

let setTooltips = () => {

	counties = svg.selectAll('.county');
	counties.attr('data-tippy-content', (d, i) => {
		return `County: ${d['properties']['county_name']}, Radiations: ${d['properties']['average_radiation_value']} µSv/h`;
	});

	tippy(counties.nodes(), {
		followCursor: 'initial',
		duration: [1000,500],
		animation: 'fade',
		arrow: true,
	});
}

let drawMap = () => {

	document.getElementById("date").innerHTML = '16 Luglio 2021';

	svg.selectAll('path')
		.data(norwayData)
		.enter()
		.append('path')
		.attr('d', path)
		.attr("name", (d) =>{return d['properties']['county_name']})
		.attr("capital", (d) => {return d['properties']['county_capital']})
		.attr("radiations", (d) => {return d['properties']['average_radiation_value']})
		.attr("opacity", 0.8)
		.attr('stroke', "#F5FBEF")
		.attr('stroke-width', 0.8)
		.attr('fill', (d) => {
			const value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			})
		.attr("class", (d) => {return "county"})
		.attr("text", this.name)
		.on("mouseover",function(event, d){

			d3.selectAll(".county")
				.transition()
				.duration(200)
				.attr("opacity", .5)
			
		  	d3.select(this)
				.transition()
				.duration(200)
				.attr("opacity", 1)
				.attr("stroke", "black")

			setTooltips();
		
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

let transitionMap = (data) => {

	svg.selectAll('path')
		.data(data)
		.transition()
		.duration(1500)
		.attr("name", (d) =>{return d['properties']['county_name']})
		.attr("capital", (d) => {return d['properties']['county_capital']})
		.attr("radiations", (d) => {return d['properties']['average_radiation_value']})
		.attr('fill', (d) => {
			const value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			})
}

playButton = () => {

    let time = 0;
	var transition_data;
    let interval = setInterval(() => { 
      if (time <= 13) { 
		d3.json(norwayDatasets[time]).then(
			(data, error) => {
				if (error) {
					console.log(error);
				}else{
					rawData = topojson.feature(data, data.objects.map_data_topo);
					projection = d3.geoMercator().fitSize([870, 520], rawNorwayData);
					path = d3.geoPath().projection(projection);
					transition_data = topojson.feature(data, data.objects.map_data_topo).features;

					document.getElementById("date").innerHTML = dateRange[time];
					transitionMap(transition_data);
					time++;
			}})}
      else { 
          clearInterval(interval);
      }
    }, 3000);

	setTimeout(() => {transitionMap(norwayData);}, 5500);
  }


let drawLineCharts = () => {

	const margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

	const svg = d3.select(".multiple_charts")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

	d3.json("data\/small_multiplies.json").then(
		(data,error) => {
			if (error) {
				console.log(error);
			}else{
				const allCounties = new Set(data.map(d => d.county))

				d3.select("#selectButton")
					.selectAll('counties')
					.data(allCounties)
					.enter()
					.append('option')
					.text(function(d) {return d;}) //text
					.attr("value", function(d) { return d;}) // returned value

				const colorscale = d3.scaleOrdinal().domain(allCounties).range(["#FBAF00", "#EFCA08", "#143109", "#D64933","#119DA4", "#D5A021", "#7F6A93", "#5DA9E9","#E8CCBF", "#95C623", "#E55812"]);

				// Add X axis --> it is a date format
				const x = d3.scaleLinear().domain(d3.extent(data, (d) => { return d.day;})).range([ 0, width ]);
				svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x).ticks(14));

				const y = d3.scaleLinear().domain([0, 0.250]).range([height, 0 ]);
				svg.append("g").call(d3.axisLeft(y).ticks(10));

				const line = svg
					.append("g")
					.append("path")
					.datum(data.filter(function(d){return d.county == "Nordland"}))
					.attr("d", 
						d3.line()
						.x((d) => { return x(d.day)})
						.y((d) => { return y(+d.value)})
					)
					.attr("stroke", (d) => {return colorscale(d.county)})
					.attr("stroke-width", 4.5)
					.attr("fill", "none");

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

				function update(selectedCounty){
					const dataFilter = data.filter(function(d){return d.county==selectedCounty})
					line
					.datum(dataFilter)
					.transition()
					.duration(1000)
					.attr("d", d3.line()
					  .x(function(d) { return x(d.day) })
					  .y(function(d) { return y(+d.value) })
					)
					.attr("stroke", function(d){ return colorscale(selectedCounty)})

				}

				d3.select("#selectButton").on("change", function(event, d) {
					const selectedOption = d3.select(this).property("value")
					update(selectedOption)
				});

			}
		});
}
		
d3.json(norwayDatasets[0]).then(
	(data, error) => {
		if (error) {
			console.log(error);
		}else{
			rawNorwayData = topojson.feature(data, data.objects.map_data_topo);
			projection = d3.geoMercator().fitSize([670, 520], rawNorwayData);
			path = d3.geoPath().projection(projection);
			
			norwayData = topojson.feature(data, data.objects.map_data_topo).features;
			console.log(norwayData);

			drawMap();
			drawLineCharts();
	 }
	})