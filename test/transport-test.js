const { transports, version } = require('winston');
const { expect } = require('chai');
const rewire = require('rewire');
const { spy } = require('sinon');
const semver = require('semver');

const { createLogger, addTransport } = require('./utils.js');

let NullTransport;

describe('NullTransport', () => {
  before(() => {
    expect(transports).to.not.have.ownProperty('NullTransport');
    ({ NullTransport } = require('../index')); // eslint-disable-line global-require
    expect(transports).to.have.ownProperty('NullTransport');
  });

  it('should exist', () => {
    expect(NullTransport).to.exist();
    expect(NullTransport).to.be.a('function');
  });

  it('should be able to add it as a transport', () => {
    const logger = createLogger();

    addTransport(logger, NullTransport);
  });

  it('should have NullTransport available as a transport', () => {
    expect(transports).to.have.ownProperty('NullTransport');
  });

  it('should not write anything', () => {
    const Null = rewire('../index').NullTransport;
    spy(Null.prototype, 'log');

    const logger = createLogger();
    const msg = 'hi there';

    addTransport(logger, Null);
    logger.log('info', msg);

    expect(Null.prototype.log.callCount).to.equal(1);

    if (semver.major(version) < 3) {
      expect(Null.prototype.log.firstCall.args[1]).to.equal(msg);
    } else {
      expect(Null.prototype.log.firstCall.args[0].message).to.equal(msg);
    }

    Null.prototype.log.restore();
  });
});
