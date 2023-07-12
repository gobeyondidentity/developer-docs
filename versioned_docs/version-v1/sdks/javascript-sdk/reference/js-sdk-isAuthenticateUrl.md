---
title: isAuthenticateUrl
---

Validates that a URL is able to be used by the **authenticate** function.  

## Dependencies
The **isAuthenticateUrl** function requires the Beyond Identity Javascript SDK.
```
npm install @beyondidentity/bi-sdk-js
```
## Prerequisites
Before making a call to **isAuthenticateUrl**, you must complete the following prerequisite calls:  

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
|url| string| Required. Url to be validated as Beyond Identity authentication url.|

## Returns
Returns a boolean.

## Examples
### Example: Authenticate only if the provided url is valid 
```javascript
if (embedded.isAuthenticateUrl(url)) {
    // authenticate against a passkey bound to the device
}
```