class Logger {
  static LogLevel = {
    INFO: 'INFO',
    ERROR: 'ERROR',
    WARNING: 'WARNING'
  };

  static log(level, message) {
    console.log(`[${level}] ${message}`);
  }

  static info(message) {
    Logger.log(Logger.LogLevel.INFO, message);
  }

  static error(message) {
    Logger.log(Logger.LogLevel.ERROR, message);
  }

  static warn(message) {
    Logger.log(Logger.LogLevel.WARNING, message);
  }
}

module.exports = Logger;
