---
title: redeemOtp
id: js-reference-redeemOtp
description: ""
slug: /js-reference-redeemOtp
keywords:
  - javascript sdk
pagination_next: null
pagination_prev: null
last_update:
  date: 07/25/2023
  author: William May
draft: false
doc_type: reference
displayed_sidebar: sdkSidebar
---

The **redeemOtp** function enables an app using the Beyond Identity Javascript SDK to redeem an otp for a grant code. This function is used in conjunction with [authenticateOtp](js-reference-authenticateOtp).

## Dependencies

The **redeemOtp** function requires the Beyond Identity Javascript SDK.

```
npm install @beyondidentity/bi-sdk-js
```

## Prerequisites

Before making a call to **redeemOtp**, you must complete the following prerequisite calls:

1. Import the required types and functions from the SDK

  ```javascript
  import { Embedded } from "@beyondidentity/bi-sdk-js";
  ```

2. Initialize the SDK

  ```javascript
  const embedded = await Embedded.initialize();
  ```

3. Use **authenticateOtp** to initiate authentication using an OTP

  ```javascript
  await embedded.authenticateOtp(url, email);
  ```

4. Use **redeemOtp** to redeem an otp for a grant code

  ```javascript
  await embedded.redeemOtp(url, otp);
  ```

## Parameters

| Parameter | Type  | Description |
| --- | --- | --- |
| **url**       | string | Required. The authentication URL of the current transaction. This url is generated from [authenticateOtp](js-reference-authenticateOtp). |
| **otp**       | string | Required. The OTP to redeem.  |

## Returns

On success, the **redeemOtp** function returns a Promise that resolves to an **AuthenticateResponse**, which itself is a JSON object that contains the following keys:

- **redirectUrl**: string containing the redirect URL that originates from the /authorize call's `redirect_uri` parameter. The OAuth2 authorization `code` and the `state` parameter of the /authorize call are attached with the "code" and "state" parameters to this URL.

- **message**: optional string containing a displayable message defined by policy returned by the cloud on success.

- **passkeyBindingToken**: string containing a one-time-token that may be redeemed for a CredentialBindingLink.

You can exchange the token for a link by calling the [credential-binding-jobs](https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs) endpoint.

```javascript
const response = await fetch(
  `https://auth-${region}.beyondidentity.run/v1/tenants/${tenantId}/realms/${realmId}/applications/${applicationId}/credential-binding-jobs`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${passkeyBindingToken}` },
  }
);
```

On failure, the **redeemOtp** function returns a Promise that resolves to an **OtpChallengeResponse**, which itself is a JSON object that contains the following keys:

Note: This url should be used when calling [redeemOtp](js-reference-redeemOtp) or [authenticateOtp](js-reference-authenticateOtp) on retries.

- **url**: object containing a URL containing the state of the authentication.

## Examples

### Example: Call **redeemOtp**

```javascript
let authenticateResponse = await embedded.redeemOtp(url, otp);
```
