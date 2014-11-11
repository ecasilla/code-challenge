/**
* This class requires the modules 
* {@link module:https://github.com/sorensen/node-bitarray} 
* {@link module:https://www.npmjs.org/package/underscore} 
* and
* {@link module:https://github.com/chenglou/data-structures}.
* @class
* @requires module:bit-array
* @requires data-structures/LinkedList
* @requires underscore
*/
var Queue = require('data-structures').Queue;
var _ = require('underscore');


/**
* Creates a new State
* @class
*/
function State(xx,yy) {
  this.x = xx;
  this.y = yy;
}

/**
* Creates a new GraphixMask
* @class
*/
function GraphixMask(rectangles) {
  this.queue      = new Queue();
  this.rectangles = rectangles;
  this.board      = this._create_2d_arrays(400,600);
  this.ArrayList  = [];
  this.init();
}


/**
 * description this is the main function
 *
 */
GraphixMask.prototype.init = function() {

  this.array_parser(this.rectangles);

  this.sortedAreas();

};

GraphixMask.prototype.sortedAreas = function() {
  var queue = this.queue,
  dx = [-1,1,0,0],
  dy = [0,0,-1,1];

  for(var i = 0; i < this.board.length; i++){
    for(var j = 0; j < this.board[i].length; j++){

      var ret = 0;

      if(this.board[i][j]){
        queue.enqueue(new State(i,j));
      }

      this.board[i][j] = false;
      while(queue.size > 0){

        ret++;

        var temp = queue.dequeue();
        var state = new State(temp.x,temp.y);

        for(var k = 0; k < dx.length; k++){
          var x = Number(state.x + dx[k]);
          var y = Number(state.y + dy[k]);
          if(x < 0 || y < 0 || x >= 400 || y >= 600 || !this.board[x][y]){
            continue;
          }
          this.board[x][y] = false;
          queue.enqueue(new State(x,y));
        }
      }
      //extract method
      if(ret !== 0) {this.ArrayList.push(ret);}
    }
  }
  this.ArrayList =  _.sortBy(this.ArrayList,function(num) {
    return num;
  });
};


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
* @returns 2D Array with a true inital value
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
* @param {string} takes in a {array} of {strings}
* @returns {array} of numbers
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

var test = new GraphixMask(["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);
