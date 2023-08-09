---
title: Validate an access token
id: validate-access-tokens
description: ''
slug: /validate-access-tokens
keywords: 
 - api-tokens
 - configuration
pagination_next: null
pagination_prev: null
last_update: 
   date: 07/07/2023
   author: Jen Field
draft: false
doc_type: how-to
displayed_sidebar: howToGuidesSidebar
---

import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';  

If your app consumes access tokens, you need to know how to validate them. This article will show you how to do that.  

The easiest and most recommended way to validate tokens is by using the token validation API. 

Both `self-contained` and `referential` tokens can be validated online via the API.    

If your app has specific requirements such as accepting revoked tokens, then you can validate tokens within your own code using the steps [at the end of this article](#offline-validation). 

:::note  
Access tokens cannot be validated in the Admin Console  
:::  

## Prerequisites

In order to validate an access token, you need the following:  

- the base64 encoded access token you wish to validate (can be self contained or referential)  

- the client credentials (client ID and client secret) of the app for which the token was issued, or otherwise a bearer token with the `tokens:introspect` scope and audience 'beyondidentity' for authorization (to create a Beyond Identity API token. See the examples in [Create an access token](/docs/next/create-api-token#example-create-tokens-for-the-beyond-identity-management-api)).

## Token validation API

The token validation API consists of the '/introspect' endpoint, which is compliant with 
[RFC-7662](https://datatracker.ietf.org/doc/html/rfc7662).   

### Introspection endpoint

The introspection endpoint has the following structure:  

```http
https://auth-us.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/introspect  
```

### Token validation request  

Create the HTTP request with the following properties:  

**Request method:** POST  

**Request URL:** 

```http
https://auth-us.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/introspect
```

**Request headers:**  

```http
Authorization: Bearer {authorization_token}
content-type: application/x-www-form-urlencoded  
```

where 

{authorization_token} is a Bearer token that contains the scope 'tokens:introspect' and audience 'beyondidentity'  

-OR-

```http
Authorization: Basic {app_client_credentials_b64}
content-type: application/x-www-form-urlencoded  
```

where 

{app_client_credentials_b64} is the value of the application's Client ID and Client secret in the format {client_id}:{client_secret} and base64 encoded  

:::note
The that token validation requests can be authenticated with the client credentials of the application for which the token was issued.  
:::  

**Request body:**  

```http
token: {token_to_introspect} 
```

where {token_to_introspect} is the base64 encoded access token you wish to validate  

### Example

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/introspect" \
-X POST \
-u "$(APP_CLIENT_ID):$(APP_CLIENT_SECRET)" --basic \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "token=$(TOKEN_TO_INTROSPECT)"'
title="/introspect"
/>

#### Successful Response

A successful introspect query will return a JSON object containing the key
`"active"` set to the boolean value `true`, plus information about the token.

```json
{
  "active": true,
  "bi_ty": "authorization_code",
  "iss": "https://auth-us.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/applications/{application_id}",
  "sub": "7a8cce58fd160449",
  "aud": [
      "{client_id}",
      "http://myexampleapi"
  ],
  "exp": 1688488934,
  "nbf": 1688402534,
  "iat": 1688402534,
  "jti": "cKigHwlWRW5h3Dv4CCMBICiqf-j1i1yJ",
  "scope": "myapp:read myapp:write",
  "azp": "tenants/{tenant_id}/realms/{realm_id}/applications/{application_id}",
  "bi_p": "tenants/{tenant_id}/realms/{realm_id}/identities/7a8cce58fd160449",
  "bi_s": "",
  "bi_x": "c6EBNy5gJnhfSmDr1Q70fzfw5v7kpssL"
}
```

#### Unsuccessful Response

Pursuant to RFC-7662, the introspect endpoint returns HTTP 200 status code even
if the token is revoked. If the token is revoked, expired or its signature is
invalid the introspect endpoint returns a JSON object with a single key
`"active"` set to the boolean value `false`.

```json
{
  "active": false
}
```

Apart from this, the introspect endpoint might return other error codes in case
the request is malformed or unauthorized.

### Offline Validation

In order to validate a token offline, the JWT header and claims must be decoded. Decode both and follow the steps below:


1. Parse the [host](https://datatracker.ietf.org/doc/html/rfc3986#section-3.2.2) of the URI in the `jku` header field. If it equals `auth-$REGION.beyondidentity.com`, then proceed. Otherwise, reject the token.

2. Download the public key for token validation from the `jku` in the JWT header. The key can be cached for the number of seconds specified by the [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#response_directives) max-age directive. Check the token signature against the key with matching `kid` downloaded from `jku`.

3. Check that either the application id or resource server identifier is listed in the `aud` of the JWT claims. It is sufficient if at least one of the allowed audiences is in the token `aud` claim.

4. Check timestamps in JWT claims where `nbf` <= current time as unix timestamp in seconds <= `exp`

5. Check that JWT claims target tenant `bi_t` and target realm `bi_r` match the tenant and realm for the given application.

6. Check that JWT claims has the expected scopes.