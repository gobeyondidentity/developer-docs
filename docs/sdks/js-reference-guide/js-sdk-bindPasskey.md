---
title: bindPasskey
id: js-reference-bindPasskey
description: ""
slug: /js-reference-bindPasskey
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

The **bindPasskey** function enables your app to generate and bind a new passkey to an identity. The identity can be one that you create via the Beyond Identity [API](https://developer.beyondidentity.com/api/v1#tag/Identities/operation/CreateIdentity) or one that exists already in the tenant you target.

_This is a reference article that describes the **bindPasskey** function. For a complete walk-through on creating a new passkey, see our guide [Bind Passkey to an identity](/docs/next/add-passkey)._

## Dependencies

The **bindPasskey** function requires the Beyond Identity Javascript SDK.

```
npm install @beyondidentity/bi-sdk-js
```

1. Import the functions in the Embedded namespace from the SDK.

  ```javascript
  import {Embedded} from '@beyondidentity/bi-sdk-js';
  ```  

2. Initialize the SDK.

  ```javascript
  const embedded = await Embedded.initialize();
  ```  

3. Get a passkey binding link URL using the Beyond Identity [API](https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs).  

  > _Generating a passkey binding link has several inputs and options. For details, see [passkey-binding-jobs](https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs)._   

4. Use **isBindPasskeyUrl** to verify passkey binding link.
  
  ```javascript
  await embedded.isBindPasskeyUrl(passkeyBindingLink)
  ```

## Parameters

| Parameter | Type |Description|
|---|---|---|
|**url**| string| Required. Passkey binding link URL. Using our public [API](https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs/operation/CreateCredentialBindingJob), this can be fetched directly or sent to the email address associated with the identity. This URL enables **bindPasskey** to kick off the passkey creation and binding sequence for the identity that you specify.  |

## Returns

On success, the **bindPasskey** function returns a Promise that resolves to a **BindPasskeyResponse**, which itself is a JSON object that contains the following keys:

  - **passkey**: an object representing the newly created passkey. See example [passkey](/docs/next/js-reference-passkey-type).  
  
  - **postBindRedirect**: a string containing the URL to redirect to upon successfully binding a passkey. This is the URL that you specified in the earlier call to the [API](https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs) to get the passkey binding link

## Notes

Call this function from client-side code, as it needs to run in the browser context.  

In the [sample app](https://github.com/gobeyondidentity/bi-sdk-js/tree/main/example) for the Javascript SDK, calls to this function are located in > src > components > bind-passkey.tsx.  
  

## Examples
### Example: Call **bindPasskey*- after validating passkey binding URL
```javascript
if (await embedded.isBindPasskeyUrl(passkeyBindingLink)) {
  let result = await embedded.bindPasskey(passkeyBindingLink);
  //consume result and redirect the user
}
```

### Example: Create an identity and get passkey binding URL

In this example from the [sample app](https://github.com/gobeyondidentity/bi-sdk-js/tree/main/example), you'll first create a new identity using the API, then generate and retrieve the passkey binding URL.  

To achieve this, we use several data elements:  

1. Configuration from your BI tenant:

  | Property | Description |
  | --- | --- |
  | **TENANT_ID**  |  The Tenant ID of the tenant in which the app is configured. |
  | **REALM_ID**  | The Realm ID of the realm in which the app is configured.  |
  | **AUTHENTICATOR_CONFIG_ID**  |  The Authenticator Config ID from the Authenticator Config tab of the app's configuration page. |

1. Other passkey binding API parameters:  

  | Property | Description |
  | --- | --- |
  | **delivery_method**  | Select **RETURN** to deliver the URL directly in the response.   |
  | **post\_binding\_redirect\_uri**  | An optional parameter that specifies a URL the user gets redirected to _after_ a successful binding (see **Returns** above). |

3. The **identityId** returned from the first call is used for the second call. 

4. A username passed into the function is used to create the user and establish their email name 

You can find the resulting passkey binding URL in the **credential_binding_link** member of the response JSON returned from the second call.  
   
```javascript
// Step 1. Create an identity
const identityResponse = await fetch(
  `${apiUrl().toString()}v1/tenants/${TENANT_ID}/realms/${REALM_ID}/identities`,
  {
    body: JSON.stringify({
      identity: {
        display_name: username,
        traits: {
          type: "traits_v0",
          username: username,
          primary_email_address: `${username}@example.com`,
        },
      },
    }),
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    method: "POST",
  }
);

let identityResponseJson = await identityResponse.json();

if (identityResponse.status !== 200) {
  return res.status(400).json(identityResponseJson);
}

let identityId = identityResponseJson.id;

// Step 2. Get passkey binding link for identity
const passkeyBindingLinkResponse = await fetch(
  `${apiUrl().toString()}v1/tenants/${TENANT_ID}/realms/${REALM_ID}/identities/${identityId}/credential-binding-jobs`,
  {
    body: JSON.stringify({
      job: {
        delivery_method: "RETURN",
        authenticator_config_id: AUTHENTICATOR_CONFIG_ID,
        post_binding_redirect_uri: "http://example.com",
      },
    }),
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    method: "POST",
  }
);
let passkeyBindingLinkResponseJson = await passkeyBindingLinkResponse.json();

if (passkeyBindingLinkResponse.status !== 200) {
  return res.status(400).json(passkeyBindingLinkResponseJson);
}

res.send(passkeyBindingLinkResponseJson);
```

### Example: Extract passkey binding URL from passkey binding link response

```javascript
let jsonResponse = await response.json();
let passkeyBindingLink = jsonResponse.credential_binding_link;
```

### Example: Get passkey binding URL for existing identity

To obtain a passkey binding URL for an existing identity, replace Step 1 above with an API call such as the below to retrieve the identity ID for a known user. Once you have the identity ID, the process to retrieve the passkey binding URL is identical to Step 2 above.

```javascript
//get identity ID for identity
app.get("/example", function (req, res) {
  let apiToken = "eyJ030 ... KJHZQkr";
  let userName = req.query.username;
  let identityId;

  return fetch(
    "https://api-us.beyondidentity.com/v1/tenants/{TENANT_ID}/realms/{REALM_ID}/identities",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    }
  )
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then((jsonResponse) => {
      identityMatch = jsonResponse.identities.find(
        (identity) => identity.traits.username == userName
      );

      res.send(identityMatch.id);
    });
});
```

### Example: Get passkey binding URL via email

The following example shows how to obtain a passkey binding URL for a known identity ID via email.

```javascript
const credentialBindingLinkResponse = await fetch(
  `${apiUrl().toString()}v1/tenants/${TENANT_ID}/realms/${REALM_ID}/identities/${identityId}/credential-binding-jobs`,
  {
    body: JSON.stringify({
      job: {
        delivery_method: "EMAIL",
        authenticator_config_id: AUTHENTICATOR_CONFIG_ID,
        post_binding_redirect_uri: "http://example.com",
      },
    }),
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    method: "POST",
  }
);
let credentialBindingLinkResponseJson =
  await credentialBindingLinkResponse.json();

  res.send(credentialBindingLinkResponseJson);
```  

where the following data elements are used: 

| Data element | Description |
| --- | --- |
| **TENANT_ID**  |  The Tenant ID of the tenant in which the app is configured. |
| **REALM_ID**  | The Realm ID of the realm in which the app is configured.  |
| **AUTHENTICATOR_CONFIG_ID**  |  The Authenticator Config ID from the Authenticator Config tab of the app's configuration page. |
| **delivery_method**  | Select **EMAIL** so that the url will be delivered to the primary_email_address from the user's profile.   |
| **post\_binding\_redirect\_uri**  | An optional parameter that specifies a URL the user gets redirected to _after_ a successful binding (see **Returns** above). |
| **identityId**  | The ID property from the user's profile. |

When the user clicks the link in the Beyond Identity registration email, they will be redirected to your application's Invoke URL, as configured in the Authenticator Config tab in your BI tenant, with an automatically appended '/bind' route, for example, 'http://example.com/bind', with several query string parameters appended.

Your app must have a route or page to intercept this redirect, take the complete URL (window.location.href), and send it to the **bindPasskey** function as follows:

```javascript
if (embedded.isBindPasskeyUrl(window.location.href)) {
  // Only bind if the URL is a "bind" URL
  let bindPasskeyUrl = window.location.href;
  // -- 3
  embedded
    .bindPasskey(bindPasskeyUrl)
    .then((result) => {
      setBindPasskeyResult(result.credential);
    })
    .catch((error) => {
      setBindPasskeyResult(error.toString());
    });
}
```  
For complete guidance on binding a passkey to a user, see [Bind Passkey to an identity](/docs/next/add-passkey).
