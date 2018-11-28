const { expect } = require('chai');
const rewire = require('rewire');
const { spy } = require('sinon');

let NullTransport;
let winston;

function removeConsole() {
  if (winston.transports.Console) winston.remove(winston.transports.Console);
}

describe('NullTransport', () => {
  before(() => {
    winston = require('winston'); // eslint-disable-line global-require
    expect(winston.transports).to.not.have.ownProperty('NullTransport');
    ({ NullTransport } = require('../index')); // eslint-disable-line global-require
    expect(winston.transports).to.have.ownProperty('NullTransport');
    removeConsole();
  });

  it('should exist', () => {
    expect(NullTransport).to.exist();
    expect(NullTransport).to.be.a('function');
  });

  it('should be able to add it as a transport', () => {
    const transport = new NullTransport();
    winston.add(transport);
    winston.remove(transport);
  });

  it('should have NullTransport available as a transport', () => {
    expect(winston.transports).to.have.ownProperty('NullTransport');
  });

  it('should not write anything', () => {
    const transport = new (rewire('../index').NullTransport)();
    const msg = 'hi there';

    spy(transport, 'log');

    winston.add(transport);
    winston.log('info', msg);

    expect(transport.log.callCount).to.equal(1);
    expect(transport.log.firstCall.args[0].message).to.equal(msg);

    transport.log.restore();
  });
});
