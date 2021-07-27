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

	var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

	svg = d3.select("#linechart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")");
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