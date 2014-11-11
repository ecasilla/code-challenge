var expect      = require('chai').expect,
    chai        = require("chai"),
    sinonChai   = require("sinon-chai"),
    sinon       = require("sinon"),
    GraphixMask = require('../index.js'),
    test_arry,
    context     = describe;


describe("Graphix Mask: ", function() {
 "use-strict";
  context("Should solve the base case",function() {
    it('should solve for the base case parameter', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject.ArrayList).to.be.eql([116800,  116800]);
    });
    it('should solve for the second base case with multiple strings', function(){
      var subject2 = new GraphixMask(["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]);
      expect(subject2.ArrayList).to.be.eql([22816,  192608]);

    });
    it('should slove for the third base case', function(){
      var subject3 = new GraphixMask(["0 192 399 207", "0 392 399 407", "120 0 135 599", "260 0 275 599"]);
    expect(subject3.ArrayList).to.be.eql([22080,  22816,  22816,  23040,  23040,  23808,  23808,  23808,  23808]);

    });
    it('should slove for the fourth base case', function(){
      var subject4 = new GraphixMask(["50 300 199 300", "201 300 350 300", "200 50 200 299", "200 301 200 550"]);
     expect(subject4.ArrayList).to.be.eql([ 1,  239199]);

    });
  });
  context("Implementation Details",function() {
  before(function(){
   test_arry = 
           [
           [true,true,true,true,true],
           [true,true,true,true,true],
           [true,true,true,true,true],
           [true,true,true,true,true],
           [true,true,true,true,true]
           ];

  });
    it('should have the setup method defined', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject).to.respondTo("_board_setup");
    });
    it('should have the parser method defined', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject).to.respondTo('array_parser');
    });
    it('should have the create 2d array method defined', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject).to.respondTo("_create_2d_arrays");
    });
    it('should create a 2d bit array', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject._create_2d_arrays(5,5)).to.be.eql(test_arry);
    });
    it('should set the inital value for every element to true', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject._create_2d_arrays(5,5));
    });
    it('should have a queue defined', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject.queue).to.be.ok();
    });
    it('should have an empty queue', function(){
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject.queue.size).to.be.equal(0);
    });
    it('should have the results array defined', function(){
      this.timeout(9000);
      var subject = new GraphixMask(["0 292 399 307"]);
      expect(subject.ArrayList).to.have.length.of.at.least(2);
    });
  });
});
