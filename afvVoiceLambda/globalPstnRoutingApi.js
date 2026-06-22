const SCVLoggingUtil = require("./SCVLoggingUtil");
const utils = require("./utils");
const axiosWrapper = require("./axiosWrapper");

const vendorFQN = "amazon-connect";

async function reserveRoutableNumber(payload, configData) {
  SCVLoggingUtil.info({
    message: "reserveRoutableNumber request created",
    context: { countryCode: payload.countryCode, fromNumber: payload.fromNumber },
  });

  const jwt = await utils.generateJWT({
    orgId: configData.orgId,
    callCenterApiName: configData.callCenterApiName,
    expiresIn: configData.tokenValidFor,
    privateKey: configData.privateKey,
  });

  const response = await axiosWrapper
    .getScrtEndpoint(configData)
    .post("/voiceCalls/reserveRoutableNumber", payload, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        "Telephony-Provider-Name": vendorFQN,
      },
    })
    .then((res) => res)
    .catch((error) => {
      const status = error.response?.status;
      const retryAfter = error.response?.headers?.["retry-after"];

      SCVLoggingUtil.error({
        message: "Error reserving routable number",
        context: {
          status,
          retryAfter,
          data: error.response?.data,
          error: error.message,
        },
      });

      const err = new Error("Error reserving routable number");
      err.status = status;
      err.retryAfter = retryAfter;
      err.responseData = error.response?.data;
      throw err;
    });

  return response.data;
}

module.exports = { reserveRoutableNumber };
