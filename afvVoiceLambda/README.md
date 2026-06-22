# AFV Global PSTN Dynamic Routing Lambda

Sample AWS Lambda function for **Agentforce Voice Global PSTN Dynamic Routing**. This Lambda integrates with Amazon Connect contact flows to reserve dynamic routing numbers via the Salesforce scrt2-telephony API.

## Overview

This Lambda supports one operation invoked from Amazon Connect contact flows:

| Method | Description |
|--------|-------------|
| `reserveRoutableNumber` | Reserves a dynamic routing number for a given country and caller, enabling dynamic number assignment before routing |

## Prerequisites

- **Node.js** 18.x or later
- **yarn** (package manager)
- **AWS CLI** configured with appropriate credentials
- **AWS Secrets Manager** secret containing your Salesforce configuration (see [Secret Configuration](#secret-configuration))

## Quick Start

### 1. Install Dependencies

```bash
yarn install
```

### 2. Run Tests

```bash
yarn test
```

### 3. Build Deployment Package

```bash
bash scripts/compile.bash
```

This produces a deployment-ready `.zip` file at `dist/invokeAfvGlobalPstnRouting.zip`.

### 4. Deploy to AWS Lambda

Upload the `.zip` to your Lambda function:

```bash
aws lambda update-function-code \
  --function-name invokeAfvGlobalPstnRouting \
  --zip-file fileb://dist/invokeAfvGlobalPstnRouting.zip
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_NAME` | Yes* | Name of the AWS Secrets Manager secret containing Salesforce config. Can also be passed via contact attributes. |
| `LOG_LEVEL` | No | Logging level (`info`, `debug`, `warn`, `error`). Defaults to `info`. |

*Required unless provided in contact flow attributes.

### Secret Configuration

This Lambda reuses the **same AWS Secrets Manager secret** that was automatically created during your Contact Center setup. You do not need to create a new secret.

To find your secret name:
1. Open **AWS Secrets Manager** in the same region as your Amazon Connect instance
2. Look for the secret created during Contact Center provisioning (typically named after your Call Center API name)
3. Copy the secret name/ARN

Then set it as the `SECRET_NAME` environment variable on your Lambda function:

```bash
aws lambda update-function-configuration \
  --function-name invokeAfvGlobalPstnRouting \
  --environment "Variables={SECRET_NAME=your-existing-secret-name}"
```

The secret contains the following keys (already populated from Contact Center creation):

| Key | Description |
|-----|-------------|
| `SALESFORCE_ORG_ID` | Your Salesforce Organization ID (18-character) |
| `SCRT_ENDPOINT_BASE` | Base URL for the SCRT2 telephony endpoint |
| `CALL_CENTER_API_NAME` | API name of your Call Center configuration in Salesforce |
| `<CallCenterApiName>-scrt-jwt-auth-private-key` | RSA private key for JWT authentication (PEM format) |

## Amazon Connect Integration

### Contact Flow Setup

Invoke this Lambda from an Amazon Connect contact flow using the **Invoke AWS Lambda function** block. Pass parameters as follows:

**For `reserveRoutableNumber`:**

```json
{
  "methodName": "reserveRoutableNumber",
  "countryCode": "US",
  "fromNumber": "+14155550123",
  "toNumber": "+15551234567",
  "callId": "0LQfi1000000m6H",
  "transactionId": "8f3c9e2a-1b4d-4e7f-9a0c-2d6e1f3b5a8c"
}
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `methodName` | Yes | Must be `reserveRoutableNumber` |
| `countryCode` | Yes | ISO country code for the dynamic routing number |
| `fromNumber` | Yes | The customer's phone number in E.164 format |
| `toNumber` | Yes | The SIP Voice channel number (the number configured in your Voice channel) in E.164 format |
| `callId` | No | The Salesforce Voice Call record ID (VC1) to link related calls |
| `transactionId` | No | A unique transaction identifier for tracing |

### Response Format

**`reserveRoutableNumber` response:**

```json
{
  "statusCode": 200,
  "routableNumber": "+12156716097",
  "uid": "ldid_12156716097_1781686468312055214",
  "expiresAt": "2026-06-17T08:57:28.312055214Z",
  "mode": "number"
}
```

### Passing the Secret Name

The secret name can be provided in three ways (checked in order):

1. Contact attribute: `secretName`
2. Lambda parameter: `fieldValues.secretName`
3. Environment variable: `SECRET_NAME`

## Lambda Warm-Up

The Lambda supports CloudWatch scheduled events to keep it warm:

```json
{
  "detail-type": "Scheduled Event"
}
```

This returns `{ statusCode: 200, message: "Keep Lambda Warm" }` without executing any business logic.

## Scripts

| Script | Description |
|--------|-------------|
| `scripts/compile.bash` | Install dependencies, run tests, and produce a deployment `.zip` |
| `scripts/test.bash` | Install dependencies and run unit tests |
| `scripts/scriptLib.bash` | Shared shell utilities (colors, `set -e`) |

## Project Structure

```
.
├── handler.js                 # Lambda entry point
├── globalPstnRoutingApi.js    # API client for scrt2-telephony
├── secretUtils.js             # AWS Secrets Manager integration
├── utils.js                   # JWT generation and validation utilities
├── axiosWrapper.js            # HTTP client with optional debug logging
├── SCVLoggingUtil.js          # Structured logging (winston)
├── config.js                  # Environment configuration
├── package.json
├── tests/
│   ├── handler.test.js
│   └── globalPstnRoutingApi.test.js
├── scripts/
│   ├── compile.bash           # Build deployment package
│   ├── test.bash              # Run tests
│   └── scriptLib.bash         # Shell utilities
└── README.md
```

## Troubleshooting

| Error | Cause | Resolution |
|-------|-------|------------|
| `Secret name not provided` | No secret name in attributes or env var | Set `SECRET_NAME` env var or pass via contact attributes |
| `Invalid or missing fromNumber` | Customer number not in E.164 format | Ensure the fromNumber parameter is a full E.164 number (e.g., `+14155550123`) |
| `countryCode is required` | Missing countryCode parameter | Pass `countryCode` in Lambda parameters or contact attributes |
| `Error reserving routable number` (429) | Rate limited by scrt2-telephony | Implement retry logic; check `retryAfter` in response |
