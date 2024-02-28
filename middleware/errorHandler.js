const Logger = require('../common/Logger');

const errorHandler = (err, req, res, next) => {
  Logger.error(err.stack);
  // Return an appropriate error response to the client
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
