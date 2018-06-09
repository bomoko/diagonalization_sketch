var theGrid;
var GRIDHEIGHT = 500;
var GRIDWIDTH = 500;
var CELLWIDTH = 50;

function setup() {
  createCanvas(GRIDHEIGHT, GRIDWIDTH);
  theGrid = new Grid(GRIDHEIGHT, GRIDWIDTH, CELLWIDTH);
  theGrid.render();
}

function draw() {
}



function Grid(gridWidth, gridHeight, cellWidth) {
	var currCenter = {numerator: 0, denominator: 1}; //these are the numerator and denominator of the top left cell.

	this.moveRight = function() {
    currCenter.denominator++;
  }
  
  this.moveLeft = function() {
    if(currCenter.denominator > 0) {
      currCenter.denominator--;
    }
  }

	this.moveDown = function() {
    currCenter.numerator++;
  }
 
	function projectOnToXY(numerator, denominator) {
    //denominator gives us the x pos
    var denDiff = denominator - currCenter.denominator;
    var numDiff = numerator - currCenter.numerator;
    return {x: denDiff * cellWidth, y: numDiff * cellWidth};
  }
 
  this.moveUp = function() {
    if(currCenter.numerator > 0) {
      currCenter.numerator--;
    }
  }

	this.render = function() {
    color(255, 0, 0);
    //start with currCenter, go till we're out of bounds on x and y
    var currCoord = {numerator: currCenter.numerator, denominator: currCenter.denominator};
    var projectCurrCoord = projectOnToXY(currCoord.numerator, currCoord.denominator);
		while(projectCurrCoord.y < gridHeight) {
	    while(projectCurrCoord.x < gridWidth) {
    		rect(projectCurrCoord.x, projectCurrCoord.y, cellWidth, cellWidth);

				//write out the rational number ...
        textSize(10);
        textAlign(CENTER);
				text(currCoord.numerator + "/" + currCoord.denominator, cellWidth/2 + projectCurrCoord.x, cellWidth/2 + projectCurrCoord.y); 

				currCoord.denominator++;
      	projectCurrCoord = projectOnToXY(currCoord.numerator, currCoord.denominator);
      }	
      currCoord.numerator++; 
      currCoord.denominator = currCenter.denominator;
      projectCurrCoord = projectOnToXY(currCoord.numerator, currCoord.denominator);
    }
  };


}




