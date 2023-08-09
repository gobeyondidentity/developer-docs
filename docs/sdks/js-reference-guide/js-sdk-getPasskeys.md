---
title: getPasskeys
id: js-reference-getPasskeys
description: ""
slug: /js-reference-getPasskeys
keywords:
  - javascript sdk
pagination_next: null
pagination_prev: null
last_update:
  date: 08/01/2023
  author: William May
draft: false
doc_type: reference
displayed_sidebar: sdksSidebar
---

The **getPasskeys** function enables your app to get a list of all passkeys currently bound to the device, for example to create a user experience for selecting a passkey.

## Dependencies

The **getPasskeys** function requires the Beyond Identity Javascript SDK.

```bash
npm install @beyondidentity/bi-sdk-js
```

## Prerequisites

Before making a call to **getPasskeys**, you must complete the following prerequisite calls:

1. Import the required types and functions from the SDK.

  ```javascript
  import { Embedded } from "@beyondidentity/bi-sdk-js";
  ```

2. Initialize the SDK.

  ```javascript
  const embedded = await Embedded.initialize();
  ```

## Parameters

none

## Returns

Upon success, returns a Promise that resolves to an array of [Passkey](/docs/next/js-reference-passkey-type).

## Examples

### Example: Call getPasskeys and surface the list to the user to select a passkey

```javascript
const allPasskeys = await embedded.getPasskeys();
```
