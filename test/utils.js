const { Logger, createLogger, version } = require('winston');
const semver = require('semver');

module.exports.createLogger = () => (semver.major(version) < 3
  ? new Logger()
  : createLogger());

module.exports.addTransport = (logger, Transport) => {
  if (semver.major(version) < 3) {
    logger.add(Transport);
  } else {
    logger.add(new Transport());
  }
};
