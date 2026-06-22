const axios = require("axios");
const logger = require("axios-logger");

function getScrtEndpoint(configData) {
  const instance = axios.create({
    baseURL: configData.scrtEndpointBase,
  });

  if (process.env.LOG_LEVEL === "debug") {
    instance.interceptors.request.use(
      logger.requestLogger,
      logger.errorLogger
    );
    instance.interceptors.response.use(
      logger.responseLogger,
      logger.errorLogger
    );
  }

  return instance;
}

module.exports = { getScrtEndpoint };
