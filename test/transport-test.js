const { expect } = require('chai');
const rewire = require('rewire');
const { spy } = require('sinon');
let NullTransport;
let winston;

describe("NullTransport", function () {

  before(function(){
    winston = require('winston');
    expect(winston.transports).to.not.have.ownProperty("NullTransport");
    NullTransport = require('../index').NullTransport;
    expect(winston.transports).to.have.ownProperty("NullTransport");
    removeConsole();
  });

  it('should exist', function () {
    expect(NullTransport).to.exist;
    expect(NullTransport).to.be.a("function");
  });

  it('should be able to add it as a transport', function () {
    const transport = new NullTransport();
    winston.add(transport);
    winston.remove(transport);
  });

  it('should have NullTransport available as a transport', function () {
    expect(winston.transports).to.have.ownProperty("NullTransport");
  });

  it('should not write anything', function () {
    const transport = new (rewire('../index').NullTransport)();
    const msg = "hi there";

    spy(transport, 'log');

    winston.add(transport);
    winston.log('info', msg);

    expect(transport.log.callCount).to.equal(1);
    expect(transport.log.firstCall.args[0].message).to.equal(msg);

    transport.log.restore();
  });

  function removeConsole () {
    if (winston.transports.Console) winston.remove(winston.transports.Console);
  }

});

