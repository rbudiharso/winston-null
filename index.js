const winston = require('winston');
const compat = require('winston-compat');
const semver = require('semver');

const Transport = semver.major(winston.version) === 2 ? compat.Transport : require('winston-transport');

class NullTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.name = 'NullTransport';
  }

  log(...args) {
    // in winston >= 3 and winston < 3 callback is the last argument
    const callback = args[args.length - 1];
    callback();

    return this;
  }
}

winston.transports.NullTransport = NullTransport;
module.exports.NullTransport = NullTransport;
