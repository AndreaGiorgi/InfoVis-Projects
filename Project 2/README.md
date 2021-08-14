# InfoVis-Projects: Project 2: Radnett data visualization

The following project utilizes radiation data derived from DSA Norwegian Radiation and Nuclear Safety Authority. Each daily data has been aggregated by each county
showing the daily radiation change on a two week range of observation. The data is taken directly from the DSA Open Data, carefully engineered and later visualized. 

The data representation is the following:
* A choropleth based on the Norwegian regional districts
* The change in color will represent the change in the average radioactivity value
* An animation will show the changes in value over a time interval, showing any phenomena of high radioactivity.
* A linechart for each district shows the variation in the radiation level over the entire observation period, the graph can be selected by the user by choosing the district to be analyzed.

Used Technologies
------------

* D3.js (https://d3js.org/)
* HTML + CSS 
* Javascript
* Tippy.js (https://atomiks.github.io/tippyjs/)
* d3-simple-slider (https://github.com/johnwalley/d3-simple-slider)
* GeoJSON (https://geojson.org/)
* TopoJSON (https://github.com/topojson/topojson)
* Python 3.8.x

Requirements
------------

This project requires some specific modules:

 * NPM (https://www.npmjs.com/)
 * http-server (https://github.com/http-party/http-server)

How to start
------------

First of all is necessary to install ```http-server```, in order to do that it is necessary to install NodeJS for npm support. After NodeJS is installed start a terminal session and using the command ```npm install http-server``` the needed plugin will be installed and activated for use. 

Browse to the directory of the project, the one containing ```index.html``` file, from there open a terminal/powershell instance and start the local server using the command ```http-server```. Now using a browser like Mozilla Firefox go to ```localhost:8080``` and the project will show up. 

Maintainers
------------

- Andrea Giorgi
