var util = require('util'),
winston = require('winston');

var NullTransport = exports.NullTransport = function() {};

util.inherits(NullTransport, winston.Transport);
winston.transports.NullTransport = NullTransport;

NullTransport.prototype.name = 'NullTransport';
NullTransport.prototype.log = function(level, msg, meta, callback) {
  callback(null);
};
