---
title: isBindPasskeyUrl
id: reference-isBindPasskeyUrl
description: ""
slug: /isBindPasskeyUrl
keywords:
  - embedded sdk
pagination_next: null
pagination_prev: null
last_update:
  date: 08/01/2023
  author: William May
draft: false
doc_type: reference
displayed_sidebar: sdkSidebar
---

Validates that a URL is able to be used by the **bindPasskey** function.

## Dependencies

The **isBindPasskeyUrl** function requires the Beyond Identity Javascript SDK.

```bash
npm install @beyondidentity/bi-sdk-js
```

## Prerequisites

Before making a call to **isBindPasskeyUrl**, you must complete the following prerequisite calls:

1. Import the required types and functions from the SDK.

  ```javascript
  import { Embedded } from "@beyondidentity/bi-sdk-js";
  ```

2. Initialize the SDK.

  ```javascript
  const embedded = await Embedded.initialize();
  ```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| **url** | string | Required. Url to be validated as Beyond Identity passkey binding url. |

## Returns

Returns a boolean.

## Examples

### Example: Call **bindPasskey** after validating URL

```javascript
if (await embedded.isBindPasskeyUrl(passkeyBindingLink)) {
  let result = await embedded.bindPasskey(passkeyBindingLink);
}
```
