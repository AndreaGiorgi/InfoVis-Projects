
let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let radnettData //Storage for radiation data
let canvas = d3.select('#canvas') //D3 selection
let projection
let path

const color_domain = [0.080, 0.090, 0.095, 0.100, 0.110, 0.115];
const color_legend = d3.scaleThreshold().range(['#fee5d9', '#fcbba1', '#fc9272',  '#fb6a4a', '#de2d26', '#a50f15']).domain(color_domain);

let colorFunction = () => {
	return "white";
}


let drawMap = () => {
   
	canvas.selectAll('path')
		.data(norwayData)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('stroke', "#F5FBEF")
		.attr('stroke-width', 0.8)
		.attr('fill', "#de2d26")
		.classed('svg-content-responsive', true);
}

d3.json("map_data_topo.json").then(
	(data, error) => {
		if (error) {
			console.log(error);
		}else{
			rawNorwayData = topojson.feature(data, data.objects.collection);
			projection = d3.geoMercator().fitSize([970, 620], rawNorwayData);
			path = d3.geoPath().projection(projection);
			
			norwayData = topojson.feature(data, data.objects.collection).features;
			console.log(norwayData);
			d3.json("data\/radnett_data_1617-07-2021.json").then(
				(data, error) => {
					if(error){
						console.log(error);
					}else{
						radnettData = data;
						console.log(radnettData);
						drawMap();
					}
				}
			)
		}

})