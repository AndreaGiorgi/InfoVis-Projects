# InfoVis-Projects: Project 1

Crea un file json con dei dati multivariati: ci sono 10 data-cases e ogni data-case ha cinque variabili quantitative i cui valori sono tutti positivi. In base a questi dati disegna 10 triangoli isosceli nell'area di disegno (ogni triangolo corrisponde ad un data-case). La prima variabile determina la posizione orizzontale del triangolo, la seconda variabile la posizione verticale, la terza variabile la lunghezza della base, la quarta variabile l'altezza del triangolo (e dunque la lunghezza dei due altri lat)i, e la quinta variabile la tonalità del riempimento. Facendo click con il pulsante sinistro su una caratteristica mentre si tiene premuto il tasto "y", la variabile corrispondente alla caratteristica viene utilizzata per la posizione "y" e la variabile prima utilizzata per la posizione "y" viene utilizzata per la caratteristica specifica (per tutti i triangoli). Facendo click mentre si tiene permuto il tasto "x" avviene lo stesso scambio rispetto alla variabile "x". Fai in modo che i cambi di dimensione, di posizione e di colore dei triangoli avvengano con un'animazione fluida. Usa le scale D3.js per mappare l'intervallo dei valori delle variabili (che è arbitrario) sull'intervallo dei valori delle coordinate, che dipende dalla tua interfaccia.

# Project 1: Triangles and Transitions

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

How to use
------------

First of all is necessery to install ```http-server```, in order to do that it is necessary to install NodeJS for npm support. After NodeJS is installed start a terminal session and using the command ```npm install http-server``` the needed plugin will be installed and activated for use. 

Browse to the directory of the project, the one containing ```index.html``` file, from there open a terminal/powershell instance and start the local server using the command ```http-server. Now using a browser like Mozilla Firefox go to ```localhost:8080``` and the project will show up. 

Maintainers
------------

- Andrea Giorgi

