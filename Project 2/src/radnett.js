
let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let canvas = d3.select('#canvas') //D3 selection
let projection
let path

const color_domain = [0.080, 0.090, 0.100, 0.110, 0.120, 0.125, 0.130];
const color_legend = d3.scaleThreshold().range(['#FFCCCC', '#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#D30000']).domain(color_domain);

let drawMap = () => {
   
	canvas.selectAll('path')
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

let drawLineCharts = () => {

	const margin = {top: 10, right: 10, bottom: 10, left: 10};
	const data = norwayData;
	const yheight = 200;
	const height = 300;

	const parseTime = d3.timeParse('%d/%m/%Y');
	const x = d3.scaleTime().range([0, width - margin.left - margin.right - xMargin]);
	x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));

	const y = d3.scaleLinear().range([yheight, 0]).nice();
	y.domain([0, 0.200]);

	const valueline = d3.line().x(function(d) { return x(parseTime(d.date)); }).y(function(d) { return y(d.properties.average_radiation_value) + margin.top + margin.bottom; })
	.curve(d3.curveMonotoneX);

}

d3.json("map_data_topo_1617-07.json").then(
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
		}
	}

)