---
title: authenticateOtp
id: js-reference-authenticateOtp
description: ''
slug: /js-reference-authenticateOtp
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

The **authenticateOtp** function enables an app using the Beyond Identity Javascript SDK to initiate authentication using an OTP. The OTP will be sent to the provided email address.

## Dependencies

The **authenticateOtp** function requires the Beyond Identity Javascript SDK.
```
npm install @beyondidentity/bi-sdk-js
```

## Prerequisites

Before making a call to **authenticateOtp**, you must complete the following prerequisite calls:

1. Import the required types and functions from the SDK
```javascript
import {Embedded} from '@beyondidentity/bi-sdk-js';
```

2. Initialize the SDK
```javascript
const embedded = await Embedded.initialize();
```

3. Use **authenticateOtp** to initiate authentication using an OTP
```javascript
await embedded.authenticateOtp(url, email);
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| url | string | Required. The authentication URL of the current transaction. |
| email | string | Required. The email address where the OTP will be sent. |

## Returns

On success, the **authenticateOtp** function returns a Promise that resolves to an **OtpChallengeResponse**, which itself is a JSON object that contains the following keys:
  - **url**: object containing a URL containing the state of the authentication.

## Examples

### Example: Call **authenticateOtp**

```javascript
let authenticateResponse = await embedded.authenticateOtp(url, email);
```
