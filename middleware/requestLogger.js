const Logger = require('../common/Logger');

const requestLogger = (req, res, next) => {
  Logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
