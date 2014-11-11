var expect = require('chai').expect,
    GraphixMask = require('../index.js')
    context = describe;


describe("Graphix Mask: ",function() {
  
  context("Should solve the base case",function() {
    it('should solve for the base case parameter', function(){
      var test = new GraphixMask(["0 292 399 307"]);

    });
    it('should solve for the second base case with multiple strings', function(){
      var test2 = new GraphixMask(["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);

    });
    it('should slove for the third base case', function(){
      var test3 = new GraphixMask([ "48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);

    });
    it('should slove for the fourth base case', function(){
      var test4 = new GraphixMask(["50 300 199 300", "201 300 350 300", "200 50 200 299", "200 301 200 550"]);

    });
  })
  context("Implementation Details",function() {
    //Setup the instance
    before(function(){
      graphixMask = new GraphixMask();
    });

    it('should parse and [] of strings to multiple arrays of strings', function(){
    });
    it('should create a 2d bit array', function(){
      
    });
    it('should set the inital value for every element to true', function(){
      
    });
    it('should set row 1 and col 1 to false', function(){
      
    });
    it('should have a queue defined', function(){
     expect(graphixMask.queue).to.be.defined()
    });
    it('should have the results array defined', function(){
      
    });
  });
});
