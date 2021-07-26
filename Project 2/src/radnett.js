let norwayData //Storage for topology data
let rawNorwayData //Storage for raw geojson data
let lineChartData //Storage for linecharts data
let canvas = d3.select('#canvas') //D3 selection

let projection
let path

const color_domain = [0.080, 0.090, 0.100, 0.110, 0.120, 0.125, 0.130];
const color_legend = d3.scaleThreshold().range(['#FFCCCC', '#FFB3B3', '#FF9999', '#FF6666',  '#FF3333', '#FF1A1A', '#D30000']).domain(color_domain);

const norwayDatasets = ['data\/map_data_1617.json','data\/map_data_1718.json','data\/map_data_1819.json','data\/map_data_1920.json','data\/map_data_2021.json',
	'data\/map_data_2122.json','data\/map_data_2223.json','data\/map_data_2324.json','data\/map_data_2425.json','data\/map_data_2526.json'];

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

let transitionMap = (data) => {

	const svg = d3.select('#canvas');
	svg.selectAll('path')
		.data(data)
		.transition()
		.delay(100)
		.duration(1000)
		.attr('fill', (d) => {
			const value = d['properties']['average_radiation_value'];
			if (value) {
			  return color_legend(d['properties']['average_radiation_value']);
			} else {
				return '#ccc';}
			})
		.classed('svg-content-responsive', true);

}


playButton = () => {

    let time = 1;
	var transition_data;
    let interval = setInterval(() => { 
      if (time <= 13) { 
		d3.json(norwayDatasets[i]).then(
			(data, error) => {
				if (error) {
					console.log(error);
				}else{
					rawData = topojson.feature(data, data.objects.map_data_topo);
					projection = d3.geoMercator().fitSize([970, 620], rawNorwayData);
					path = d3.geoPath().projection(projection);
					transition_data = topojson.feature(data, data.objects.map_data_topo).features;

					this.transitionMap(transition_data)
					time++;
			}})}
      else { 
          clearInterval(interval);
      }
    }, 2000);
  }

 refreshButton = () => {
	 
    d3.select('svg').remove();
    drawMap();
  }


/*TODO: ADD DATA AND TEST */


let drawLineCharts = () => {

	const margin = {top: 10, right: 10, bottom: 10, left: 10};
	const data = lineChartData;
	const yheight = 200;
	const height = 300;

	const parseTime = d3.timeParse('%d/%m/%Y');
	const x = d3.scaleTime().range([0, width - margin.left - margin.right - xMargin]);
	x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));

	const y = d3.scaleLinear().range([yheight, 0]).nice();
	y.domain([0, 0.200]);

	const valueline = d3.line().x(function(d) { return x(parseTime(d.date)); }).y(function(d) { return y(d.average_radiation_value) + margin.top + margin.bottom; })
	.curve(d3.curveMonotoneX);

	const svg = d3.select('.line-wrapper').append('svg')
	.attr('width',  width - margin.left - margin.right + 30)
	.attr('height', height - margin.top - margin.bottom)
	.attr('x', 0)
	.attr('y', 0)
	.attr('class', 'jumbo')
	.append('g')
	.attr('transform', 'translate(' + graphShift + ', 0)')

	svg.append('g')
	.attr("class", "y-axis")
	.attr("transform", "translate(0," + (margin.top + margin.bottom) + ")")
	.call(d3.axisLeft(y).ticks(5).tickSizeOuter(0).tickFormat(d => d  + 'µSv/h'));

	svg.append('g')
		.attr("class", "x-axis")
		.attr("transform", "translate(0," + (yheight + margin.top + margin.bottom) + ")")
		.call(d3.axisBottom(x).ticks(14).tickSizeOuter(1));

	d3.select('.x-axis .tick:first-child').remove()

	const path = svg.append('path')
	.datum(data)
	.attr('class', 'line')
	.attr('fill', 'none')
	.attr('stroke-width', '3px')
	.attr('stroke', '#de2d26')
	.attr('d', valueline);

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

			/*d3.json("linechart_data.json").then(
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