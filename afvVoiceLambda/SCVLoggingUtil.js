const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

function info({ message, context }) {
  logger.info(message, context);
}

function debug({ message, context }) {
  logger.debug(message, context);
}

function warn({ message, context }) {
  logger.warn(message, context);
}

function error({ message, context }) {
  logger.error(message, context);
}

module.exports = { info, debug, warn, error };
