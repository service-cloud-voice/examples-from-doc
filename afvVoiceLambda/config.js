module.exports = {
  logLevel: process.env.LOG_LEVEL || "info",
  secretName: process.env.SECRET_NAME,
  tokenValidFor: "5m",
  audience: "https://scrt.salesforce.com",
};
