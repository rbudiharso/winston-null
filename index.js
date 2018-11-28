const { Transport, transports } = require('winston');

class NullTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.name = 'NullTransport';
  }

  log(...args) { // in winston >= 3 and winston < 3 callback is the last argument
    const callback = args[args.length - 1];
    callback(null);
  }
}

transports.NullTransport = NullTransport;
module.exports.NullTransport = NullTransport;
