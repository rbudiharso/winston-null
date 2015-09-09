var util = require('util'),
winston = require('winston');

var NullTransport = winston.transports.NullTransport = function() {};

util.inherits(NullTransport, winston.Transport);

NullTransport.prototype.name = 'NullTransport';
NullTransport.prototype.log = function(level, msg, meta, callback) {
  callback(null);
};

module.exports = NullTransport;
