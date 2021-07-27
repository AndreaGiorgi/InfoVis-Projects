let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let lineChartData //Storage for linecharts data
let svg = d3.select('#canvas') //D3 selection

let projection
let path

const color_domain = [0.080, 0.089, 0.99, 0.110, 0.120, 0.125, 0.130];
const color_legend = d3.scaleThreshold().range(['#FFCCCC', '#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#D30000']).domain(color_domain);

const dateRange = ['16 Luglio 2021', '17 Luglio 2021']
const norwayDatasets = ['data\/map_data_1617.json','data\/map_data_1718.json','data\/map_data_1819.json','data\/map_data_1920.json','data\/map_data_2021.json',
	'data\/map_data_2122.json','data\/map_data_2223.json','data\/map_data_2324.json','data\/map_data_2425.json','data\/map_data_2526.json'];


	/* TODO ADD TOOLTIP */
let drawMap = () => {


	let mouseOver  = function(d){
		tip.show
		d3.selectAll(".County")
		  .transition()
		  .duration(200)
		  .attr("opacity", .5)

		d3.select(this)
		  .transition()
		  .duration(200)
		  .attr("opacity", 1)
		  .attr("stroke", "black")
	  }
	
	let mouseLeave = function(d){
		tip.hide
		d3.selectAll(".County")
		  .transition()
		  .duration(200)
		  .attr("opacity", .8)
		  .attr("stroke", "#F5FBEF")
		d3.select(this)
		  .transition()
		  .duration(200)
		  .attr("stroke", "#F5FBEF")
	  }	

	titleTag = dateRange[0];

	svg.selectAll('path')
		.data(norwayData)
		.enter()
		.append('path')
		.attr('d', path)
		.attr("name", (d) =>{return d['county_name']})
		.attr("capital", (d) => {return d['county_capital']})
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
		.attr("class", (d) => {return "County"})
		.attr("text", this.name)
		.on("mouseover",mouseOver)
		.on("mouseleave", mouseLeave)
		.classed('svg-content-responsive', true);

}

let transitionMap = (data, time) => {

	titleTag = dateRange[time];

	svg.selectAll('path')
		.data(data)
		.transition()
		.delay(1000)
		.duration(2000)
		.attr("name", (d) =>{return d['county_name']})
		.attr("capital", (d) => {return d['county_capital']})
		.attr("radiations", (d) => {return d['properties']['average_radiation_value']})
		.attr('fill', (d) => {
			const value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			});
}

playButton = () => {

    let time = 1;
	var transition_data;
    let interval = setInterval(() => { 
      if (time <= 13) { 
		d3.json(norwayDatasets[time]).then(
			(data, error) => {
				if (error) {
					console.log(error);
				}else{
					rawData = topojson.feature(data, data.objects.map_data_topo);
					projection = d3.geoMercator().fitSize([970, 550], rawNorwayData);
					path = d3.geoPath().projection(projection);
					transition_data = topojson.feature(data, data.objects.map_data_topo).features;

					setTimeout(() => {transitionMap(transition_data, time);}, 1500);
					time++;
			}})}
      else { 
          clearInterval(interval);
      }
    }, 2000);

	setTimeout(() => {transitionMap(norwayData);}, 5000);
  }


let drawLineCharts = () => {

	const margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

	const svg = d3.select("#small-multiplies")
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
				//const sumstat = d3.group(data, d => d.county)

				d3.select("#selectButton")
					.selectAll('counties')
					.data(allCounties)
					.enter()
					.append('option')
					.text(function(d) {return d;}) //text
					.attr("value", function(d) { return d;}) // returned value

				const colorscale = d3.scaleOrdinal()
					.domain(allCounties)
					.range(["#03071E", "#370617", "#6A040F", "#9D0208","#B70104", "#D00000", "#DC2F02", "#E85D04",
					"#F48C06", "#FAA307", "#FFBA08"]);
				/*const colorscale = d3.scaleOrdinal().domain(allCounties).range(["#03071E", "#370617", "#6A040F", "#9D0208","#B70104", "#D00000", "#DC2F02", "#E85D04",
					"#F48C06", "#FAA307", "#FFBA08"]);*/

				// Add X axis --> it is a date format
				const x = d3.scaleLinear().domain(d3.extent(data, (d) => { return d.day;})).range([ 0, width ]);
				svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x).ticks(15));

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
					.attr("stroke-width", 4)
					.attr("fill", "none");

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
					// recover the option that has been chosen
					const selectedOption = d3.select(this).property("value")
					// run the updateChart function with this selected option
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
			projection = d3.geoMercator().fitSize([970, 620], rawNorwayData);
			path = d3.geoPath().projection(projection);
			
			norwayData = topojson.feature(data, data.objects.map_data_topo).features;
			console.log(norwayData);

			drawMap();
			drawLineCharts();
	 }
	})