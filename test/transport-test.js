var expect = require('chai').expect;
var rewire = require('rewire');
var transport;
var winston;

describe("NullTransport", function () {

  before(function(){
    winston = require('winston');
    expect(winston.transports).to.not.have.ownProperty("NullTransport");
    transport = require('../index');
    expect(winston.transports).to.have.ownProperty("NullTransport");
    removeConsole();
  });

  it('should exist', function () {
    expect(transport).to.exist;
    expect(transport).to.be.a("function");
  });

  it('should be able to add it as a transport', function () {
    winston.add(transport);
    winston.remove(transport);
  });

  it('should have NullTransport available as a transport', function () {
    expect(winston.transports).to.have.ownProperty("NullTransport");
  });

  it('should not write anything', function (done) {
    transport = rewire('../index');
    var msg = "hi there";

    winston.add(transport);
    winston.log('info', msg, null, function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  function removeConsole () {
    if (winston.transports.Console) winston.remove(winston.transports.Console);
  }

});

