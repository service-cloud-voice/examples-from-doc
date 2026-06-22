const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");

async function generateJWT(params) {
  const { orgId, callCenterApiName, expiresIn, privateKey } = params;

  const signOptions = {
    issuer: orgId,
    subject: callCenterApiName,
    expiresIn,
    algorithm: "RS256",
    jwtid: uuid(),
  };

  return jwt.sign({}, privateKey, signOptions);
}

const E164_REGEX = /^\+[1-9]\d{1,14}$/;

function isValidE164(phoneNumber) {
  return E164_REGEX.test(phoneNumber);
}

module.exports = { generateJWT, isValidE164 };
