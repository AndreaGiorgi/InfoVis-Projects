# InfoVis-Projects: Project 1 Triangles and Transitions

This project is focused on implementing a D3.js based project about Information Visualization. The task is divided in two parts:
* Create a JSON File with multivariate data, there are 10 data-cases and each data-case has five quantitative variables whose values are only positive.
* Using the multivariate data draw 10 isosceles triangles in the drawing area, each triangle represents a data-case. The first variable represents the horizontal position, the second one the vertical position, the third one the base edge, the fourth one the height (it manages the lenght of the other two edges) and the fifth one the tone. 
* If the user clicks with the left button on a characteristic while is pressed the y button, the related variable is used for the y position and y position is used for the variable (This transition is for all triangles). If the user clicks while pressed the x button it happens the same transformation but to the x variable. 
* The changes in dimension, position and colour of the triangles have to happen with a soft animation.
* Use scale D3.js in order to map the range of the variable with the range of the coordinates, which depends by your interface. 


Requirements
------------

This project requires some specific modules:

 * NPM (https://www.npmjs.com/)
 * http-server (https://github.com/http-party/http-server)

How to start
------------

First of all is necessary to install ```http-server```, in order to do that it is necessary to install NodeJS for npm support. After NodeJS is installed start a terminal session and using the command ```npm install http-server``` the needed plugin will be installed and activated for use. 

Browse to the directory of the project, the one containing ```index.html``` file, from there open a terminal/powershell instance and start the local server using the command ```http-server```. Now using a browser like Mozilla Firefox go to ```localhost:8080``` and the project will show up. 

How to start
------------

On screen will be shown ten different triangles with different dimensions and characteristics. Following the procedure explaned before it is possible to start the animation. The change in coordinates and variables values is one-way, if the procedure is applied again after the first transition the new dimensions will be used as starting point resulting in the end in a complete join of all triangles. 

Maintainers
------------

- Andrea Giorgi

