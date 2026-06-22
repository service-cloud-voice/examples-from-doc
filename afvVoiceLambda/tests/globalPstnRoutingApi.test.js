jest.mock("../axiosWrapper", () => ({
  getScrtEndpoint: jest.fn(),
}));

jest.mock("../utils", () => ({
  generateJWT: jest.fn().mockResolvedValue("mock-jwt-token"),
  isValidE164: jest.fn().mockReturnValue(true),
}));

const api = require("../globalPstnRoutingApi");
const axiosWrapper = require("../axiosWrapper");

const mockConfigData = {
  orgId: "00Dxx0000004CFGEA2",
  scrtEndpointBase: "https://test.my.salesforce-scrt.com",
  callCenterApiName: "TestCallCenter",
  privateKey: "mock-private-key",
  tokenValidFor: "5m",
};

describe("globalPstnRoutingApi", () => {
  let mockPost;

  beforeEach(() => {
    mockPost = jest.fn();
    axiosWrapper.getScrtEndpoint.mockReturnValue({ post: mockPost });
  });

  describe("reserveRoutableNumber", () => {
    it("posts to /voiceCalls/reserveRoutableNumber and returns data", async () => {
      const responseData = {
        status: "success",
        mode: "number",
        handle: {
          routableNumber: "+12156716097",
          uid: "ldid_12156716097_1781686468312055214",
          expiresAt: "2026-06-17T08:57:28.312055214Z",
        },
      };
      mockPost.mockResolvedValue({ data: responseData });

      const payload = {
        countryCode: "US",
        fromNumber: "+14155550123",
        context: {
          scrt2Domain: "https://test.my.salesforce-scrt.com",
          toNumber: "+15551234567",
          callId: "0LQLT000001jmnt",
          transactionId: "8f3c9e2a-1b4d-4e7f-9a0c-2d6e1f3b5a8c",
        },
      };

      const result = await api.reserveRoutableNumber(payload, mockConfigData);

      expect(mockPost).toHaveBeenCalledWith(
        "/voiceCalls/reserveRoutableNumber",
        payload,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer mock-jwt-token",
            "Telephony-Provider-Name": "amazon-connect",
          }),
        })
      );
      expect(result).toEqual(responseData);
    });

    it("throws with status and retryAfter on API error", async () => {
      mockPost.mockRejectedValue({
        response: {
          status: 429,
          headers: { "retry-after": "30" },
          data: { error: "TOO_MANY_REQUESTS" },
        },
        message: "Request failed with status 429",
      });

      const payload = {
        countryCode: "US",
        fromNumber: "+14155550123",
        context: {},
      };

      try {
        await api.reserveRoutableNumber(payload, mockConfigData);
        fail("Expected error to be thrown");
      } catch (error) {
        expect(error.message).toBe("Error reserving routable number");
        expect(error.status).toBe(429);
        expect(error.retryAfter).toBe("30");
      }
    });
  });

});
