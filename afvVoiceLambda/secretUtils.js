const aws = require("aws-sdk");
const config = require("./config");
const SCVLoggingUtil = require("./SCVLoggingUtil");

const secretsManager = new aws.SecretsManager();

const CONFIG_KEYS = {
  SALESFORCE_ORG_ID: "SALESFORCE_ORG_ID",
  SCRT_ENDPOINT_BASE: "SCRT_ENDPOINT_BASE",
  CALL_CENTER_API_NAME: "CALL_CENTER_API_NAME",
};

async function readSecret(secretName) {
  if (!secretName) {
    throw new Error("Secret name is required");
  }

  try {
    const secretResponse = await secretsManager
      .getSecretValue({ SecretId: secretName })
      .promise();
    return JSON.parse(secretResponse.SecretString);
  } catch (error) {
    SCVLoggingUtil.error({
      message: "Error reading secret from AWS Secrets Manager",
      context: { secretName, error: error.message },
    });
    throw error;
  }
}

async function getSecretConfigs(secretName) {
  try {
    const secretData = await readSecret(secretName);

    const orgId = secretData[CONFIG_KEYS.SALESFORCE_ORG_ID];
    const endpointBase = secretData[CONFIG_KEYS.SCRT_ENDPOINT_BASE];
    const callCenterApiName = secretData[CONFIG_KEYS.CALL_CENTER_API_NAME];

    const privateKeyParam = `${callCenterApiName}-scrt-jwt-auth-private-key`;
    const privateKey = secretData[privateKeyParam];

    return {
      audience: config.audience,
      orgId,
      scrtEndpointBase: endpointBase,
      callCenterApiName,
      privateKey,
      tokenValidFor: config.tokenValidFor,
    };
  } catch (error) {
    SCVLoggingUtil.error({
      message: "Error getting config from secret",
      context: { secretName, error: error.message },
    });
    throw error;
  }
}

module.exports = { getSecretConfigs, CONFIG_KEYS };
