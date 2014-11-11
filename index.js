var Queue = require('data-structures').Queue;
var _ = require('underscore');


/**
* Creates a new State
* description This is a representation of pixel
* @class
*/
function State(xx,yy) {
  this.x = xx;
  this.y = yy;
}

/**
* Creates a new GraphixMask
* @constructor GraphixMask
* @param {array} rectangles - The rectangles array
*/
function GraphixMask(rectangles) {
  this.queue      = new Queue();
  this.rectangles = rectangles;
  this.board      = this._create_2d_arrays(400,600);
  this.ArrayList  = [];
  this.init();
}


/**
 * description this is the main function it kicks off the process of 
 * marking the rectangles as false then thereafter it starts the algorithm
 * 
 */
GraphixMask.prototype.init = function() {

  this.array_parser(this.rectangles);

  this.sortedAreas();

};

/**
 * description the main algorithm that does the exploration of the pixel board
 * @returns {array}
 */

GraphixMask.prototype.sortedAreas = function() {
  // queue of recently discovered pixels (from its neighbors)
  var queue = this.queue,
  
  // possible neighbor coordinates
  dx = [-1,1,0,0],
  dy = [0,0,-1,1];

// traversing the image
  for(var i = 0; i < this.board.length; i++){
    for(var j = 0; j < this.board[i].length; j++){

    //pixel counter
      var ret = 0;

      // adds a State for a valid pixel
      if(this.board[i][j]){
        queue.enqueue(new State(i,j));
      }

      this.board[i][j] = false;
      
      // consume the queue
      while(queue.size > 0){

        ret++; //increment the counter

        // getting first state from the queue 
        var temp = queue.dequeue();
        var state = new State(temp.x,temp.y);

        // iterating over 4 possibilities of neighbors to the current pixel at open[i][j]
        for(var k = 0; k < dx.length; k++){
        // Getting x,y pair for a new neighbor candidate
          var x = Number(state.x + dx[k]);
          var y = Number(state.y + dy[k]);
          // Skipping out invalid pixels
          if(x < 0 || y < 0 || x >= 400 || y >= 600 || !this.board[x][y]){
            continue;
          }
          // From now on, this neighbor is valid. So we are setting it to false and adding to the queue
          this.board[x][y] = false;
          queue.enqueue(new State(x,y));
        }
      }
      // found number of pixels, adding to the arraylist
      if(ret !== 0) {this.ArrayList.push(ret);}
    }
  }
  this.ArrayList =  _.sortBy(this.ArrayList,function(num) {
    return num;
  });
  console.log(this.ArrayList);
};

/**
 * description this method takes and array and for each item in the array 
 * it sets the pixel value on the board to false 
 * @params {array}
 * @returns {array} the new versions of the 2D array with the falsie values inserted
 */

GraphixMask.prototype._board_setup = function(area) {
  this.row1    = +area[0];
  this.col1    = +area[1];
  this.row2    = +area[2];
  this.col2    = +area[3];
  for(var j = this.row1; j <= this.row2; j++){
    for(var k = this.col1; k <= this.col2; k++){
      this.board[j][k] = false;
    }
  }
  return this.board; 
};

/**
* description this method return a 2d array with a default value
* @param {integer} of the row size 400
* @param {integer} of the column size 600
* @returns {arrays} 2D Array with a true initial value
*/

GraphixMask.prototype._create_2d_arrays = function(arr,arr2) {
  var bit_arrys = _.range(1,arr + 1).map(function() {
    return _.range(1,arr2 + 1).map(function() {
      return true; 
    });
  });
  return bit_arrys;
};


/**
* description  
* @param  {array} of {strings}
*/
GraphixMask.prototype.array_parser = function(rectangles) {
  var self = this;
  _.each(rectangles,function(element,index,list) {
    var area = element.split(" "); //array of four elements
    //for each element we want to set the area to false
    self._board_setup(area);
  });
};

module.exports = GraphixMask;

var test = new GraphixMask(["0 292 399 307"]);
var test1 = new GraphixMask(["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);
var test2 = new GraphixMask(["0 192 399 207", "0 392 399 407", "120 0 135 599", "260 0 275 599"]);
var test3 = new GraphixMask(["50 300 199 300", "201 300 350 300", "200 50 200 299", "200 301 200 550"]);
