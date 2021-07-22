
let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let canvas = d3.select('#canvas') //D3 selection
let projection
let path

const color_domain = [0.080, 0.090, 0.100, 0.110, 0.120, 0.125, 0.130];
const color_legend = d3.scaleThreshold().range(['#ccdcd9', '#80a9a0', '#67978d', '#4d867a',  '#347566', '#1b6454', '#025341']).domain(color_domain);

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