const SCVLoggingUtil = require("./SCVLoggingUtil");
const api = require("./globalPstnRoutingApi");
const secretUtils = require("./secretUtils");
const utils = require("./utils");
const config = require("./config");

exports.handler = async (event) => {
  SCVLoggingUtil.debug({
    message: "InvokeAfvGlobalPstnRouting event received",
    context: { payload: event },
  });

  if (event["detail-type"] === "Scheduled Event") {
    return { statusCode: 200, message: "Keep Lambda Warm" };
  }

  const { methodName } = event.Details.Parameters;
  const contactId = event.Details.ContactData.ContactId;
  const fromNumber = event.Details.Parameters.fromNumber;
  const toNumber = event.Details.Parameters.toNumber;

  const secretNameFromAttributes =
    event.Details.ContactData?.Attributes?.secretName ||
    event.Details.Parameters?.fieldValues?.secretName ||
    null;

  const resolvedSecretName = secretNameFromAttributes || config.secretName;
  if (!resolvedSecretName) {
    throw new Error(
      "Secret name not provided in call attributes or SECRET_NAME environment variable"
    );
  }

  const configData = await secretUtils.getSecretConfigs(resolvedSecretName);

  SCVLoggingUtil.info({
    message: `Invoke ${methodName} for contact ${contactId}`,
    context: { contactId, methodName, fromNumber },
  });

  switch (methodName) {
    case "reserveRoutableNumber": {
      if (!fromNumber || !utils.isValidE164(fromNumber)) {
        throw new Error(
          `Invalid or missing fromNumber: ${fromNumber}. Must be E.164 format.`
        );
      }

      const countryCode =
        event.Details.Parameters.countryCode ||
        event.Details.ContactData?.Attributes?.countryCode;
      if (!countryCode) {
        throw new Error("countryCode is required for reserveRoutableNumber");
      }

      const callId =
        event.Details.Parameters.callId ||
        event.Details.ContactData?.Attributes?.callId ||
        null;

      const transactionId =
        event.Details.Parameters.transactionId ||
        event.Details.ContactData?.Attributes?.transactionId ||
        null;

      const context = {
        scrt2Domain: configData.scrtEndpointBase,
        toNumber,
      };
      if (callId) context.callId = callId;
      if (transactionId) context.transactionId = transactionId;

      const payload = {
        countryCode,
        fromNumber,
        context,
      };

      const result = await api.reserveRoutableNumber(payload, configData);

      return {
        statusCode: 200,
        routableNumber: result.handle.routableNumber,
        uid: result.handle.uid,
        expiresAt: result.handle.expiresAt,
        mode: result.mode,
      };
    }

    default:
      SCVLoggingUtil.warn({
        message: `Unsupported method ${methodName}`,
        context: { contactId },
      });
      throw new Error(`Unsupported method: ${methodName}`);
  }
};
