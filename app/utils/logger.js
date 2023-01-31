const { createLogger, transports } = require('winston');

const logger = createLogger({

  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
});

module.exports = logger;