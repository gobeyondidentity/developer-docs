---
title: deleteCredential
id: js-reference-deleteCredential
description: ""
slug: /js-reference-deleteCredential
keywords:
  - javascript sdk
pagination_next: null
pagination_prev: null
last_update: 
   date: 07/18/2023
   author: Jen Field
draft: false
doc_type: reference
displayed_sidebar: sdkSidebar
---

The **deletePasskey** function enables your app to delete a passkey given its passkey ID.

## Dependencies

The **deletePasskey** function requires the Beyond Identity Javascript SDK.

```
npm install @beyondidentity/bi-sdk-js
```

## Prerequisites

Before making a call to **deletePasskey**, you must complete the following prerequisite calls:

1. Import the required types and functions from the SDK

```javascript
import { Embedded } from "@beyondidentity/bi-sdk-js";
```

2. Initialize the SDK

```javascript
const embedded = await Embedded.initialize();
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| **id** | string | Required. The ID of the passkey to be deleted. This should match the **id** property of a [Passkey](/docs/next/js-reference-passkey-type) that is available on the device. |

## Examples

### Example: Delete a passkey

```javascript
await embedded.deletePasskey(passkey.id);
```
