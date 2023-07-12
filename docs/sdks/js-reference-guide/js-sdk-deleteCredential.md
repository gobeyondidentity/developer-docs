---
title: deleteCredential
description: ''
keywords: 
 - javascript sdk
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
   author: Patricia McPhee
draft: false
doc_type: reference
displayed_sidebar: mainSidebar
---

import { Alert, Col, Row } from 'antd';

<Row>
  <Col span={12}>
    <Alert message="In progress (needs a copy edit)" type="info" />
  </Col>
</Row>
<br />

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
import {Embedded} from '@beyondidentity/bi-sdk-js';
```  

2. Initialize the SDK
```javascript
const embedded = await Embedded.initialize();
```  

## Parameters
| Parameter | Type |Description|
|---|---|---|
|id| string| Required. The ID of the passkey to be deleted. This should match the **id** property of a [Passkey](./js-sdk-passkey-type) that is available on the device.|

## Examples
### Example: Delete a passkey
```javascript
await embedded.deletePasskey(passkey.id);
```