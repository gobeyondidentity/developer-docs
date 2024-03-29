---
title: initialize
last_update: 
   date: 01/27/2023
---

The **initialize** function creates an instance of the Beyond Identity Javascript SDK class `Embedded`, providing access to the rest of the SDK functions. The **initialize** function must be called first, before any other SDK functions.

## Dependencies
The **initialize** function requires the Beyond Identity Javascript SDK.
```
npm install @beyondidentity/bi-sdk-js
```
## Prerequisites
Before making a call to **initialize**, you must import the Embedded namespace from the SDK
```javascript
import {Embedded} from '@beyondidentity/bi-sdk-js';
```  
## Parameters
none

## Returns
On success, returns an instance of the **Embedded** class.

## Examples
### Example: create an instance of the Embedded namespace prior to calling its functions
```javascript
let embedded = await Embedded.initialize();

```
