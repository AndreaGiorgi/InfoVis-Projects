import d3 from "d3";
import jsdom from "jsdom";

var document = jsdom.jsdom()
	svg = d3.select(document.body).append("svg")

