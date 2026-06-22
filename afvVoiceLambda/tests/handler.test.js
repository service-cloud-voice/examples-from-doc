jest.mock("../SCVLoggingUtil");
jest.mock("../globalPstnRoutingApi");
jest.mock("../secretUtils");
jest.mock("../config");

const handler = require("../handler");
const api = require("../globalPstnRoutingApi");
const secretUtils = require("../secretUtils");
const config = require("../config");

config.secretName = "test-secret";

const mockConfigData = {
  audience: "https://scrt.salesforce.com",
  orgId: "00Dxx0000004CFGEA2",
  scrtEndpointBase: "https://test.my.salesforce-scrt.com",
  callCenterApiName: "TestCallCenter",
  privateKey: "mock-private-key",
  tokenValidFor: "5m",
};

secretUtils.getSecretConfigs.mockResolvedValue(mockConfigData);

function buildEvent(methodName, overrides = {}) {
  return {
    Details: {
      Parameters: {
        methodName,
        countryCode: "US",
        fromNumber: "+14155550123",
        toNumber: "+15551234567",
        ...overrides.parameters,
      },
      ContactData: {
        ContactId: "contact-123",
        Attributes: {},
        ...overrides.contactData,
      },
    },
  };
}

describe("invokeAfvGlobalPstnRouting handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    secretUtils.getSecretConfigs.mockResolvedValue(mockConfigData);
  });

  it("returns warm response for scheduled events", async () => {
    const event = { "detail-type": "Scheduled Event" };
    const result = await handler.handler(event);
    expect(result.statusCode).toBe(200);
    expect(result.message).toBe("Keep Lambda Warm");
  });

  describe("reserveRoutableNumber", () => {
    it("calls API with correct payload and returns flattened response", async () => {
      api.reserveRoutableNumber.mockResolvedValue({
        status: "success",
        mode: "number",
        handle: {
          routableNumber: "+12156716097",
          uid: "ldid_12156716097_1781686468312055214",
          expiresAt: "2026-06-17T08:57:28.312055214Z",
        },
      });

      const event = buildEvent("reserveRoutableNumber");
      const result = await handler.handler(event);

      expect(api.reserveRoutableNumber).toHaveBeenCalledWith(
        expect.objectContaining({
          countryCode: "US",
          fromNumber: "+14155550123",
          context: expect.objectContaining({
            toNumber: "+15551234567",
          }),
        }),
        expect.any(Object)
      );

      expect(result.statusCode).toBe(200);
      expect(result.routableNumber).toBe("+12156716097");
      expect(result.uid).toBe("ldid_12156716097_1781686468312055214");
      expect(result.expiresAt).toBe("2026-06-17T08:57:28.312055214Z");
      expect(result.mode).toBe("number");
    });

    it("throws when countryCode is missing", async () => {
      const event = buildEvent("reserveRoutableNumber", {
        parameters: { countryCode: undefined },
      });
      delete event.Details.Parameters.countryCode;

      await expect(handler.handler(event)).rejects.toThrow(
        "countryCode is required for reserveRoutableNumber"
      );
    });

    it("throws on invalid E.164 fromNumber", async () => {
      const event = buildEvent("reserveRoutableNumber", {
        parameters: { fromNumber: "not-a-number" },
      });

      await expect(handler.handler(event)).rejects.toThrow(
        "Invalid or missing fromNumber"
      );
    });

    it("passes callId from parameters when provided", async () => {
      api.reserveRoutableNumber.mockResolvedValue({
        status: "success",
        mode: "number",
        handle: {
          routableNumber: "+12156716097",
          uid: "ldid_12156716097_1781686468312055214",
          expiresAt: "2026-06-17T08:57:28.312055214Z",
        },
      });

      const event = buildEvent("reserveRoutableNumber", {
        parameters: { callId: "0LQxx0000004ABcGAM" },
      });

      await handler.handler(event);

      expect(api.reserveRoutableNumber).toHaveBeenCalledWith(
        expect.objectContaining({
          context: expect.objectContaining({
            callId: "0LQxx0000004ABcGAM",
          }),
        }),
        expect.any(Object)
      );
    });

  });

  it("throws on unsupported method", async () => {
    const event = buildEvent("unknownMethod");
    await expect(handler.handler(event)).rejects.toThrow(
      "Unsupported method: unknownMethod"
    );
  });
});
