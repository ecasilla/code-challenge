var expect      = require('chai').expect,
    chai        = require("chai"),
    sinonChai   = require("sinon-chai"),
    GraphixMask = require('../index.js'),
    context     = describe;
    chai.use(sinonChai); 


describe("Graphix Mask: ", function() {
  
  context("Should solve the base case",function() {
    it('should solve for the base case parameter', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject.ArrayList).to.be.eql([116800,  116800])
    });
    it('should solve for the second base case with multiple strings', function(){
      var subject2 = new GraphixMask(["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);
      expect(subject2.ArrayList).to.be.eql([22816,  192608])

    });
    it('should slove for the third base case', function(){
      var subject3 = new GraphixMask(["0 192 399 207", "0 392 399 407", "120 0 135 599", "260 0 275 599"]);
    expect(subject3.ArrayList).to.be.eql([22080,  22816,  22816,  23040,  23040,  23808,  23808,  23808,  23808])

    });
    it('should slove for the fourth base case', function(){
      var subject4 = new GraphixMask(["50 300 199 300", "201 300 350 300", "200 50 200 299", "200 301 200 550"]);
     expect(subject4.ArrayList).to.be.eql([ 1,  239199])

    });
  })
  context("Implementation Details",function() {

    it('should have the setup method defined', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject).to.respondTo("_board_setup");
    });
    it('should parse and [] of strings to multiple arrays of strings', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
      console.log(subject.queue);
      expect(subject)
    });
    it('should have the bit array method defined', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject).to.respondTo("bit_arrays");
    });
    it('should create a 2d bit array', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
      
    });
    it('should set the inital value for every element to true', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
      
    });
    it('should set row 1 and col 1 to false', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
    
    });
    it('should have a queue defined', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
    expect(subject.queue).to.be.ok
    });
    it('should have an empty queue', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
    expect(subject.queue.size).to.be.equal(0)
    });
    it('should have the results array defined', function(){
    var subject = new GraphixMask(["0 292 399 307"]);
    expect(subjec.ArrayList).to.have.length.of.at.least(2);
    });
  });
});
