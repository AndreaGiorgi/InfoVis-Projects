let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let lineChartData //Storage for linecharts data
let svg = d3.select('#canvas') //D3 selection

let projection
let path

const color_domain = [0.080, 0.090, 0.100, 0.110, 0.120, 0.125, 0.130];
const color_legend = d3.scaleThreshold().range(['#FFCCCC', '#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#D30000']).domain(color_domain);

const dateRange = ['16 Luglio 2021', '17 Luglio 2021']
const norwayDatasets = ['data\/map_data_1617.json','data\/map_data_1718.json','data\/map_data_1819.json','data\/map_data_1920.json','data\/map_data_2021.json',
	'data\/map_data_2122.json','data\/map_data_2223.json','data\/map_data_2324.json','data\/map_data_2425.json','data\/map_data_2526.json'];

let drawMap = () => {
   
	titleTag = dateRange[0];

	svg.selectAll('path')
		.data(norwayData)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('stroke', "#F5FBEF")
		.attr('stroke-width', 0.8)
		.attr('fill', (d) => {
			const value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			})
		.classed('svg-content-responsive', true);
}

let transitionMap = (data, time) => {

	titleTag = dateRange[time];

	svg.selectAll('path')
		.data(data)
		.transition()
		.delay(300)
		.duration(2000)
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

					transitionMap(transition_data, time)
					time++;
			}})}
      else { 
          clearInterval(interval);
      }
    }, 2000);

	setTimeout(() => {transitionMap(norwayData);}, 5000);

  }


/*TODO: ADD DATA AND TEST */


let drawLineCharts = () => {

	const margin = {top: 30, right: 0, bottom: 30, left: 50},
    width = 210 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

	d3.csv("path").then(
		(data,error) => {
			if (error) {
				console.log(error);
			}else{
				const sumstat = d3.group(data, d => d.county)
				allCounties = new Set(data.map(d=>d.county))

				const svg = d3.select('#smallMultiplies')
					.selectAll("unique")
					.data(sumstat)
					.enter()
					.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
				  	.append("g")
					.	attr("transform",`translate(${margin.left},${margin.top})`);

				// Add X axis --> it is a date format
				const x = d3.scaleLinear().domain(d3.extent(data, function(d) { return d.date; })).range([ 0, width ]);
				svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x).ticks(14));

				const y = d3.scaleLinear().domain([0, 0.150]).range([ height, 0 ]);
				svg.append("g").call(d3.axisLeft(y).ticks(7));

				const colorscale = d3.scaleOrdinal().range(["#03071E", "#370617", "#6A040F", "#9D0208","# B70104", "#D00000", "#DC2F02", "#E85D04",
				"#F48C06", "#FAA307", "#FFBA08"]);

				svg.append("path")
					.attr("fill", "none")
					.attr("stroke", (d) => {return colorscale(d[0])})
					.attr("stroke-width", 1.9)
					.attr("d", (d) => {
						return d3.line().x((d) => { return d.date}).y((d) => { return +d.value})(d[1])
					});
				
				svg.append("text")
					.attr("text-anchor", "start")
					.attr("y", -5)
					.attr("x", 0)
					.text(function(d){ return(d[0])})
					.style("fill", function(d){ return colorscale(d[0]) })

		}})
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
			/*d3.json("data\/linechart_data.json").then(
				(data, error) => {
					if(error) {
						console.log(error)
					} else {
						lineChartData = data;
						drawLineCharts();
					}
		});*/
	 }
	}
);