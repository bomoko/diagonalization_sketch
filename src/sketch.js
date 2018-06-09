var theGrid;
var GRIDHEIGHT = 500;
var GRIDWIDTH = 500;
var CELLWIDTH = 50;

function setup() {
  createCanvas(GRIDHEIGHT, GRIDWIDTH);
  theGrid = new Grid(GRIDHEIGHT, GRIDWIDTH, CELLWIDTH);
  clear();
  theGrid.render();
}

function keyPressed() {
	if(keyCode === RIGHT_ARROW) {
		theGrid.moveRight();
  }
	if(keyCode === LEFT_ARROW) {
		theGrid.moveLeft();
  }
	if(keyCode === UP_ARROW) {
		theGrid.moveUp();
  }
	if(keyCode === DOWN_ARROW) {
		theGrid.moveDown();
  }

  clear();
  theGrid.render();
}

function Grid(gridWidth, gridHeight, cellWidth) {
	var currCenter = {numerator: 0, denominator: 1}; //these are the numerator and denominator of the top left cell.

	this.moveRight = function() {
    currCenter.denominator++;
  }
  
  this.moveLeft = function() {
    if(currCenter.denominator > 1) {
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
    //start with currCenter, go till we're out of bounds on x and y
    var currCoord = {numerator: currCenter.numerator, denominator: currCenter.denominator};
    var projectCurrCoord = projectOnToXY(currCoord.numerator, currCoord.denominator);
		while(projectCurrCoord.y < gridHeight) {
	    while(projectCurrCoord.x < gridWidth) {
    	  stroke(0, 0, 0);
				strokeWeight(1);
    		rect(projectCurrCoord.x, projectCurrCoord.y, cellWidth, cellWidth);

				//write out the rational number ...
        textSize(10);
        textAlign(CENTER);
				text(currCoord.numerator + "/" + currCoord.denominator, cellWidth/2 + projectCurrCoord.x, cellWidth/2 + projectCurrCoord.y); 

				strokeWeight(3);
    	  stroke(0, 255, 0);
				//join this to its neighbors
        if(currCoord.numerator == 0 && (currCoord.denominator % 2 == 0)) {
					line(projectCurrCoord.x + cellWidth/2,
					  projectCurrCoord.y + cellWidth/2,
					  projectCurrCoord.x + (cellWidth/2) - cellWidth,
					  projectCurrCoord.y + cellWidth/2);
				} else if (currCoord.denominator == 1 && (currCoord.numerator % 2 == 0) && currCoord.numerator !== 0) {
					line(projectCurrCoord.x + cellWidth/2,
					  projectCurrCoord.y + cellWidth/2,
					  projectCurrCoord.x + (cellWidth/2),
					  projectCurrCoord.y + (cellWidth/2) - cellWidth);
				} 

				if (currCoord.numerator !== 0) { //join it to the right and up
					line(projectCurrCoord.x + cellWidth/2,
					  projectCurrCoord.y + cellWidth/2,
					  projectCurrCoord.x + (cellWidth/2) + cellWidth,
					  projectCurrCoord.y + (cellWidth/2) - cellWidth);

				}

				currCoord.denominator++;
      	projectCurrCoord = projectOnToXY(currCoord.numerator, currCoord.denominator);
      }	
      currCoord.numerator++; 
      currCoord.denominator = currCenter.denominator;
      projectCurrCoord = projectOnToXY(currCoord.numerator, currCoord.denominator);
    }
  };


}




