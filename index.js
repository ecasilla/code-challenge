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
var BitArray = require('bit-array');
var LinkedList = require('data-structures').LinkedList;
var _ = require('underscore');

module.exports = GraphixMask;

/**
* Creates a new State
* @class
*/
function State(xx,yy) {
  this.x = xx;
  this.y = yy;
}

var ArrayList = []
/**
* Creates a new GraphixMask
* @class
*/
function GraphixMask(rectangles) {
  this.queue      = new LinkedList();
  this.visited    = new BitArray();
  this.rectangles = rectangles;
  this.board      = this._create_bit_arrays(400,600);
  this.ArrayList  = [];
  this.init();
}


/**
 * description this is the main function
 *
 */
GraphixMask.prototype.init = function() {
  var self = this,
  count    = 0
  if (this.rectangles.length > 2) {
    this.area = this.array_parser(this.rectangles)
    _.each(this.area, function(element) {
      self._board_setup(element)
      self.sortedAreas(element);
      count++
    });
  }else{
    this.area = this.string_parser(this.rectangles)
    self._board_setup(this.rectangles)
    self.sortedAreas(this.rectangles);
  }

  console.log("count: " + count);
}

GraphixMask.prototype.sortedAreas = function() {
  var queue = new LinkedList(),
  dx = [-1,1,0,0],
  dy = [0,0,-1,1];

  for(var i = 0; i < this.board.length; i++){
    for(var j = 0; j < this.board[i].length; j++){
      var ret = 0;
      if(this.board[i][j]){
        queue.add(new State(i,j));
      }
      this.board[i][j] = false;
      while(queue.size > 0){
        ret++;
        var temp = queue.removeAt(-1)
        var state = new State(temp.x,temp.y);
        for(var k = 0; k < dx.length; k++){
          var x = Number(state.x + dx[k]);
          var y = Number(state.y + dy[k]);
          if(x < 0 || y < 0 || x >= 400 || y >= 600 || !this.board[x][y]){
            continue;
          }
          this.board[x][y] = false;
          queue.add(new State(x,y));
        }
      }
      //extract method
      if(ret !== 0) ArrayList.push(ret);
    }
  }
  var ret_arr = [];
  for( i = 0; i < ArrayList.length; i++){
    ret_arr[i] = ArrayList[i];
  }
  ret_arr = _.sortBy(ret_arr,function(num) {
   return num;
  })
 // console.log(ArrayList);
};


GraphixMask.prototype._board_setup = function(area) {
  this.row1    = area[0];
  this.col1    = area[1];
  this.row2    = area[2];
  this.col2    = area[3];
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

GraphixMask.prototype._create_bit_arrays = function(arr,arr2) {
  var bit_arrys = _.range(1,arr + 1).map(function() {
    return _.range(1,arr2 + 1).map(function() {
      return true; 
    });
  });
  return bit_arrys;
};

/**
* description Overloading the Object.toString Method 
* @returns a print of the current state of bit_arrays
*/

GraphixMask.prototype.toString = function() {
  return this.bit_arrys.map(function(row) {
    return row.join(' ');
  }).join('\n');   
};

/**
* description  
* @param {string} takes in a {array} of {strings}
* @returns {array} of numbers
*/
GraphixMask.prototype.array_parser = function(rectangles) {
 var temp = [],
 self = this
  _.each(rectangles,function(element,index,list) {
    element = element.split(" ");
    console.log(element + " "  + index);
    element = self.string_parser(element)
    console.log(element + " "  + index);
    temp.push(element)
  });
  return temp;
};
/**
* description  
* @param {string} takes in a string of integers
* @returns {array} of numbers
*/

GraphixMask.prototype.string_parser = function(string_arry) {
 var temp = []
 console.log("string arry " + string_arry);
 _.each(string_arry,function(element,index,list) {
   temp.push(Number(element))
 }); 
 console.log("string parser: " + temp);
 return temp;
}
/**
* description  
* @param {string} takes in a string of integers
* @returns {array} of numbers
*/

// Base Case
//test = new GraphixMask(["0 292 399 307"])

tester = new GraphixMask(["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);

