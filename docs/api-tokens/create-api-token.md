---
title: Create an access token 
id: create-api-token
description: ''
slug: /create-api-token 
keywords: 
 - api token
 - create
pagination_next: null
pagination_prev: null
last_update: 
   date: 07/10/2023
   author: Jen Field
doc_type: how-to
displayed_sidebar: mainSidebar
---

import ApiTokenDescription from '../includes/_api-token-description.mdx';
import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Prerequisites

In order to request a token, you need to have an [app configured in your Beyond Identity tenant](/docs/next/add-an-application). 

This can be an application you configure yourself, or you can request a token for the built in Beyond Identity Management API app.  

Several [app properties](/docs/next/api-token-overview#app-properties-that-impact-token-requests-and-token-validation) impact how tokens should be requested and validated. The examples below illustrate several variations of those properties.  

## Admin Console

The simplest way to acquire an access token is through the Beyond Identity Admin Console. 
The console enables you to create an access token for applications that use the client credentials grant type, such as the built in Beyond Identity Management API. For apps that use the authorization code grant type, you'll need to [request the token programmatically](#api).  

### Create an access token in the console

import CreateApiTokenConsole from '../includes/_create-api-token-console.mdx';

<CreateApiTokenConsole />  

:::note  
Note that the list of **Scopes** available to request comes from the **Resource Server** associated with the app.  
::: 

## API

To request tokens for an app programmatically, send a request to the app's token request API. 

These requests follow the OAuth and OIDC protocols.  

### Token Request URL and Endpoints

The token request API URL is based on the Beyond Identity tenant, realm, and application for which a token is being requested. 

The API host name is prefixed with "auth-us" or "auth-eu", depending on the region of the tenant. 

:::note  
Note that the host name for token requests is distinct from the Beyond Identity Management API, which uses "api-us" or "api-eu".  
:::  

There are two main endpoints for requesting tokens:   

The /authorize endpoint: 

```
https://auth-{us|eu}.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/applications/{application_id}/authorize  
```

and the /token endpoint:  

```
https://auth-{us|eu}.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/applications/{application_id}/token  
```

where:  

- {tenant_id} is the [ID of the tenant](/docs/next/find-tenant-id) in which the app is configured  

- {realm_id} is the **Realm Id** of the realm in which the application is configured

- {application_id} is the **Application ID** of the app

### Token Request Scenarios

There are three main scenarios for requesting an access token:  

- Using the OAuth [client credentials grant type with a confidential client](#client-credentials-grant-type-confidential-client)

- Using the OIDC [authorization code grant type with a public client (PKCE required)](#authorization-code-with-pkce-public-client)

- Using the OIDC [authorization code grant type with a confidential client (PKCE recommended)](#authorization-code-with-pkce-confidential-client)

### Client credentials grant type (Confidential client)

import AccessTokenCreateConfClientCreds  from '../includes/_access_token_create_conf_client_creds.mdx';

<AccessTokenCreateConfClientCreds />

### Authorization code with PKCE (Public client)

import AccessTokenCreatePublicClientPkce  from '../includes/_access_token_create_public_client_pkce.mdx';

<AccessTokenCreatePublicClientPkce />

### Authorization code with PKCE (Confidential client)

import AccessTokenCreateConfClientPkce  from '../includes/_access_token_create_conf_client_pkce.mdx';

<AccessTokenCreateConfClientPkce />

### Example: Create a Token for the Beyond Identity Management API

<Tabs>
<TabItem value="client-credentials" label="Client Credentials">

The Beyond Identity Management API application created during developer setup only supports the **Client Credentials** flow. Use the below example to create an access token. 

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(MANAGEMENT_APPLICATION_ID)/token" \
-X POST \
-u "$(MANAGEMENT_API_CLIENT_ID):$(MANAGEMENT_API_CLIENT_SECRET)" --basic \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&scope=$(SCOPES)"'
title="/token"
/>  

where:  

- MANAGEMENT_APPLICATION_ID is the **Application ID** of the built in app 'Beyond Identity Management API', or of an app created with the built in **Resource Server** 'Beyond Identity Management API'  

- MANAGEMENT_API_CLIENT_ID and MANAGEMENT_API_CLIENT_SECRET are the **Client ID** and **Client Secret**, respectively, of the built in app 'Beyond Identity Management API', or of an app created with the built in **Resource Server** 'Beyond Identity Management API'

- SCOPES is one or more of the app's **Allowed Scopes**, space delimited  

:::info important  
We recommend that you create a copy of the built in 'Beyond Identity Management API' app, pointing to the 'Beyond Identity Management API' **Resource Server**, and use the credentials of the new app rather than using the built in app's credentials.  
:::  


</TabItem>
<TabItem value="authorization-code" label="Authorization Code">

To use this flow, create an application referencing the built in 'Beyond Identity Management API' **Resource Server** in the **Beyond Identity Admin** Realm. Set the application's **Protocol** to 'OIDC' and **Grant Type** to 'Authorization Code'.  
<br />

Use the following examples to obtain an authorization code and then to create a token with that code. 

:::tip
Our example uses `S256`, but using the `plain` `code_challenge_method` might be easier to get started. This is because PKCE requires storing the hash of the value passed as `code_challenge` so it gets passed to the token endpoint later. 
:::

1. Authenticate to obtain an authorization code.

  <MultiLanguageCodeBlock
  curl='curl -G "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/authorize" \
  --data-urlencode "response_type=code" \
  --data-urlencode "client_id=$(APPLICATION_CLIENT_ID)" \
  --data-urlencode "redirect_uri=$(REDIRECT_URI)" \
  --data-urlencode "scope=$(SCOPES)" \
  --data-urlencode "state=$(STATE)" \
  --data-urlencode "code_challenge=$(CODE_CHALLENGE)" \
  --data-urlencode "code_challenge_method=S256"'
  title="/authorize"
  />

  where:  
  
   - APPLICATION_CLIENT_ID is the app's **Client ID**  
  
   - REDIRECT_URI is one of the app's configured **Redirect URI** values  
 
   - SCOPES is 'openid' plus one or more of the app's **Allowed Scopes**, space delimited  
 
   - STATE is a value generated by your app to maintain state betewen the request and response  
 
   - CODE_CHALLENGE is generated as defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636#section-4.2), example JavaScript snippet below:  

  ```javascript
    codeVerifier = crypto.randomBytes(32).toString('base64url');
    codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64url');
  ```

2. Create an access token with the authorization code.

  <MultiLanguageCodeBlock
  curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
  -X POST \
  -u "$(MANAGEMENT_API_CLIENT_ID):$(MANAGEMENT_API_CLIENT_SECRET)" --basic \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=$(CODE)&redirect_uri=${REDIRECT_URI}&client_id=$(APP_CLIENT_ID)&code_verifier=$(CODE_VERIFIER)"'
  title="/token"
  />  

  where:  

   - MANAGEMENT_API_CLIENT_ID and MANAGEMENT_API_CLIENT_SECRET are the **Client ID** and **Client Secret**, respectively, of the app created with the built in **Resource Server** 'Beyond Identity Management API'  

   - CODE is the code returned from the '/authorize' call  
 
   - REDIRECT_URI is one of the app's configured **Redirect URI** values and matches the redirect_uri sent in the '/authorize' call  

   - APP_CLIENT_ID is the app's configured **Client ID**  

   - CODE_VERIFIER is defined as in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636#section-4.1), example JavaScript snippet below:  

  ```javascript
    codeVerifier = crypto.randomBytes(32).toString('base64url');
    codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64url');
  ```

</TabItem>
</Tabs>

### Example: Create a Token with a Limited Expiration Time

This parameter is used to set a custom expiration time on individual tokens, to a value that is less than what was  originally configured. This is done by passing an `expiration_time` parameter to the `/token` endpoint.

<Tabs>
<TabItem value="client-credentials" label="Client Credentials">

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
-X POST \
-u "$(CLIENT_ID):$(CLIENT_SECRET)" --basic \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&scope=$(SCOPES)&expiration_time=3600"'
title="/token"
/>  

where:  

- CLIENT_ID and CLIENT_SECRET are the **Client ID** and **Client Secret**, respectively, of the app  

- SCOPES is one or more of the app's **Allowed Scopes**, space delimited  

- the value of expiration_time parameter is the desired lifetime, in seconds, of the requested token, for example 3600 would indicate 1 hour

</TabItem>
<TabItem value="authorization-code" label="Authorization Code">

  <MultiLanguageCodeBlock
  curl='curl -G "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/authorize" \
  --data-urlencode "response_type=code" \
  --data-urlencode "client_id=$(APPLICATION_CLIENT_ID)" \
  --data-urlencode "redirect_uri=$(REDIRECT_URI)" \
  --data-urlencode "scope={SCOPES}" \	//for example scope=openid%20myapp%3Aread%20myapp%3Awrite
  --data-urlencode "state=$(STATE)" \
  --data-urlencode "code_challenge=$(CODE_CHALLENGE)" \
  --data-urlencode "code_challenge_method=S256"'
  title="/authorize"
  />  

where:  

- APPLICATION_CLIENT_ID is your app's **Client ID**  

- REDIRECT_URI is one of the app's configured **Redirect URI** values  

- SCOPES is 'openid' plus one or more of the app's **Allowed Scopes**, space delimited  

- STATE is a value generated by your app to maintain state betewen the request and response  

- CODE_CHALLENGE is generated as defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636#section-4.2), example JavaScript snippet below:  
  
```javascript
  codeVerifier = crypto.randomBytes(32).toString('base64url');
  codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64url');
```

<MultiLanguageCodeBlock
  curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
  -X POST \
  -u "$(CLIENT_ID):$(CLIENT_SECRET)" --basic \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=$(CODE)&redirect_uri=${REDIRECT_URI}&client_id=$(CLIENT_ID)&code_verifier=$(CODE_VERIFIER)&expiration_time=3600"'
  title="/token"
  />  

where:  

- CLIENT_ID and CLIENT_SECRET are the **Client ID** and **Client Secret**, respectively, of the app  

- CODE is the code returned from the '/authorize' call  

- REDIRECT_URI is one of the app's configured **Redirect URI** values and matches the redirect_uri sent in the '/authorize' call  

- CLIENT_ID is the app's configured **Client ID**  

- CODE_VERIFIER is defined as in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636#section-4.1), example JavaScript snippet below:  

  ```javascript
    codeVerifier = crypto.randomBytes(32).toString('base64url');
    codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64url');
  ```

- the value of expiration_time parameter is the desired lifetime, in seconds, of the requested token, for example 3600 would indicate 1 hour

</TabItem>
</Tabs>

When calling inspect on the newly created token you will see the following
fields. You can now verify that the difference between expiration time ('exp') and issued at time ('iat') is equal to the value sent as the expiration_time request parameter, in this example 3600 seconds.  

```json
{
    "active": true,
    "bi_ty": "authorization_code",
    "iss": "https://auth-us.beyondidentity.com/v1/tenants/00018c7edb8e1e3c/realms/1fa458f68ece5b5d/applications/235231f7-bd5d-404a-bb58-c6370b544c54",
    "sub": "7a8cce58fd160449",
    "aud": [
        "RY-N2xUjQb5PqKl9HwBLgpnV",
        "http://myexampleapi"
    ],
    "exp": 1689041630,
    "nbf": 1689038030,
    "iat": 1689038030,
    "jti": "7USu6gCUKhmQuvMmrhwam7QnYiGyl4aq",
    "scope": "myapp:write myapp:read",
    "azp": "tenants/00018c7edb8e1e3c/realms/1fa458f68ece5b5d/applications/235231f7-bd5d-404a-bb58-c6370b544c54",
    "bi_p": "tenants/00018c7edb8e1e3c/realms/1fa458f68ece5b5d/identities/7a8cce58fd160449",
    "bi_s": "",
    "bi_x": "n3eBAmnWIDw3amXoCgaSn-b2Yo3_JtWe"
}
```
### Example: Create a Token with Custom Claims

The `custom_claims` parameter allows for additional information to be stored within a token. The provided data must be a valid JSON object. Upon a successful token request, the data will be available within the `bi_custom` field of the response JWT payload.  

<Tabs>
<TabItem value="client-credentials" label="Client Credentials">

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
-X POST \
-u "$(CLIENT_ID):$(CLIENT_SECRET)" --basic \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&scope=$(SCOPES)&custom_claims={"a": "b", "c": "d"}"'
title="/token"
/>  

where:  

- CLIENT_ID and CLIENT_SECRET are the **Client ID** and **Client Secret**, respectively, of the app  

- SCOPES is one or more of the app's **Allowed Scopes**, space delimited  

- the value of the custom_claims parameter is a JSON string containing the key/value pairs you wish the token to include 

</TabItem>
<TabItem value="authorization-code" label="Authorization Code">

<MultiLanguageCodeBlock
  curl='curl -G "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/authorize" \
  --data-urlencode "response_type=code" \
  --data-urlencode "client_id=$(APPLICATION_CLIENT_ID)" \
  --data-urlencode "redirect_uri=$(REDIRECT_URI)" \
  --data-urlencode "scope={SCOPES}" \	//for example scope=openid%20myapp%3Aread%20myapp%3Awrite
  --data-urlencode "state=$(STATE)" \
  --data-urlencode "code_challenge=$(CODE_CHALLENGE)" \
  --data-urlencode "code_challenge_method=S256"'
  title="/authorize"
  />  

where:  

- APPLICATION_CLIENT_ID is your app's **Client ID**  

- REDIRECT_URI is one of the app's configured **Redirect URI** values  

- SCOPES is 'openid' plus one or more of the app's **Allowed Scopes**, space delimited  

- STATE is a value generated by your app to maintain state betewen the request and response  

- CODE_CHALLENGE is generated as defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636#section-4.2), example JavaScript snippet below:  
  
  ```javascript
      codeVerifier = crypto.randomBytes(32).toString('base64url');
      codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64url');
  ```

<MultiLanguageCodeBlock
  curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
  -X POST \
  -u "$(CLIENT_ID):$(CLIENT_SECRET)" --basic \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=$(CODE)&redirect_uri=${REDIRECT_URI}&client_id=$(APP_CLIENT_ID)&code_verifier=$(CODE_VERIFIER)&expiration_time=3600&custom_claims={"a": "b", "c": "d"}"'
  title="/token"
  />  

where:  

- CLIENT_ID and CLIENT_SECRET are the **Client ID** and **Client Secret**, respectively, of the app  

- CODE is the code returned from the '/authorize' call  

- REDIRECT_URI is one of the app's configured **Redirect URI** values and matches the redirect_uri sent in the '/authorize' call  

- CLIENT_ID is the app's configured **Client ID**  

- CODE_VERIFIER is defined as in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636#section-4.1), example JavaScript snippet below:  

  ```javascript  
    codeVerifier = crypto.randomBytes(32).toString('base64url');
    codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest().toString('base64url');
  ```

- the value of the custom_claims parameter is a JSON string containing the key/value pairs you wish the token to include 

</TabItem>
</Tabs>


After a token is created, when introspected, the token will contain the `bi_custom` field with all of the claims. In this case, we sent `{"a": "b", "c": "d"}` as the custom_claims parameter.  


```json
{
    "active": true,
    "bi_ty": "authorization_code",
    "iss": "https://auth-us.beyondidentity.com/v1/tenants/00018c7edb8e1e3c/realms/1fa458f68ece5b5d/applications/c08e8bd9-d41d-4fc8-aa8e-309fe8843d5d",
    "sub": "7a8cce58fd160449",
    "aud": [
        "btSEEvQcWay6F_lGI6lI-V8z",
        "http://myexampleapi"
    ],
    "exp": 1689126046,
    "nbf": 1689039646,
    "iat": 1689039646,
    "jti": "xJE5aS6_nZgmmWaY9fMnFD6F3YxiwjmL",
    "scope": "myapp:read myapp:write",
    "azp": "tenants/00018c7edb8e1e3c/realms/1fa458f68ece5b5d/applications/c08e8bd9-d41d-4fc8-aa8e-309fe8843d5d",
    "bi_p": "tenants/00018c7edb8e1e3c/realms/1fa458f68ece5b5d/identities/7a8cce58fd160449",
    "bi_custom": {
        "a": "b",
        "c": "d"
    },
    "bi_s": "",
    "bi_x": "UdTa2Lh1_bRKr3mdOTt3yE1dHE1UlUlH"
}
```

