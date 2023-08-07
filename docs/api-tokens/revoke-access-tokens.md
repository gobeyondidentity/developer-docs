---
title: Revoke access tokens
id: revoke-access-tokens
description: ''
slug: /revoke-access-tokens
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
displayed_sidebar: mainSidebar
---


import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';

Both access tokens and refresh tokens can be revoked.  

For applications that use the client credentials grant type, an admin can revoke the token using the Beyond Identity console.  

Otherwise, tokens can be revoked via the token revocation API.  

## Prerequisites

In order to revoke an access token, you need the following:  

- the application_id of the application that was used to issue the token  

- the base64 encoded access token you wish to revoke (can be self contained or referential), or otherwise the token id of the token you wish to revoke (as returned from the [list access tokens api](/docs/next/list-access-tokens))

- if revoking a token by token id, a bearer token with the `tokens:delete` scope and audience 'beyondidentity' for authorization (to create a Beyond Identity API token. See the examples in the [Create an access token](/docs/next/create-api-token#example-create-tokens-for-the-beyond-identity-management-api)).  

- if revoking a token by passing the entire token, either the client credentials (client ID and client secret) of the app for which the token was issued, or otherwise a bearer token with the `tokens:delete` scope and audience 'beyondidentity' for authorization  (to create a Beyond Identity API token, see examples [here](/docs/next/create-api-token#example-create-tokens-for-the-beyond-identity-management-api))   
 
## Admin Console

The console enables you to revoke API tokens for applications that use the client credentials grant type, such as the built in Beyond Identity Management API. For apps that use the authorization code grant type, you'll need to [revoke tokens via the API](/docs/next/revoke-access-tokens#api).  

For applications that use the client credentials grant type, revoke API tokens in the Admin console as follows:  

1. Under **Apps**, select the app for which you want to view issued tokens, such as the **Beyond Identity Management API** application.

  ![Beyond Identity Management API](../images/apps-beyond-identity-management-api.png)

1. Select the **API Tokens** tab.  

2. For the token you wish to revoke, click the trash bin icon to revoke the token.  

## API  
### Endpoints
Beyond Identity exposes two different endpoints to revoke a token. Both endpoints achieve the same goal.

1. The Revoke Endpoint is [RFC-7009](https://www.rfc-editor.org/rfc/rfc7009) compliant, needs the whole token and accepts bearer or basic auth.

  ```http
  https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(MANAGEMENT_APPLICATION_ID)/revoke
  ```

2. Revoke Token by ID is not RFC-7009 compliant, only needs the token_id and only accepts bearer.

  ```http
  https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/tokens/$(TOKEN_ID)
  ```

### Revoke Token Scenarios

Which endpoint to use is based on the information available to you, which depends on the use case. For example:  

- Imagine an administrator configures an application to use referential tokens. Then, a user logs into the application and their token leaks somewhere. Now, the administrator wants to revoke the token. For this use case, it's only possible to use the [RFC-7009](https://www.rfc-editor.org/rfc/rfc7009) endpoint as the administrator has no way of knowing the token_id of the referential token.

- Imagine a developer uses the Beyond Identity Management API to implement session management. They display a screen with a list of active tokens. For each token, they want to display a button that revokes the token. The token listing endpoint as specified provides only token_id. It doesn't provide the cryptographic string representing the token, which makes it impossible to use the [RFC-7009](https://www.rfc-editor.org/rfc/rfc7009) endpoint.

### Revoke Token by passing whole token

You can revoke a token by passing the whole token as follows:  

#### Create HTTP Request

Create the HTTP request as follows:  

**Request URL**

```http
https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/revoke  
```

**Request method**: POST  

**Request headers**:

```http
Authorization: Basic {client_credentials}
content-type: application/x-www-form-urlencoded  
```
 
where {client_credentials} is the value of the **Client ID** and **Client Secret** of the app that issued the token, concatenated together in the format '{client_id}:{client_secret}' and base64 encoded

:::note important
Using client credentials for authorization only works for apps configured with **Protocol** setting 'OAuth2'. Apps configured with **Protocol** 'OIDC' need to use bearer authorization as described below.  
:::  

-OR-  

```http
Authorization: Bearer {authorization_token}
content-type: application/x-www-form-urlencoded  
```

where 

{authorization_token} is a Bearer token that contains the scope 'tokens:delete' and audience 'beyondidentity'  

**Request body**:  
```json
  "token": "{token_to_revoke}"
```

where {token_to_revoke} is the base64 encoded token you wish to revoke  

**Response**

The response will be an HTTP 200 with no contents.  

:::note
The passing an invalid token, or a token which has already been revoked or expired, will produce a success response, pursuant to [RFC7009§2.2](https://www.rfc-editor.org/rfc/rfc7009#section-2.2).
:::


### Revoke Token by passing token ID

In order to revoke a token by token ID, you must use Bearer authentication with a token containing the scope 'tokens:delete' and audience 'beyondidentity' for authorization (to create a Beyond Identity API token, see examples [here](/docs/next/create-api-token#example-create-tokens-for-the-beyond-identity-management-api))  

You can revoke a token by passing its ID as follows:  

#### Create HTTP Request

Create the HTTP request as follows:  

**Request URL**

```http
https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/tokens/$(TOKEN_ID)  
```

where {TOKEN_ID} is the id of the token as returned from a call to the [list tokens API](/docs/next/list-access-tokens) for the app that issued the token

:::note
The revoke token by ID API hostname is prefixed with "api-us" or "api-eu", not "auth-us" or "auth-eu"  
:::

**Request method**: DELETE  

**Request headers**:

```http
Authorization: Bearer {authorization_token}
content-type: application/x-www-form-urlencoded  
```

where 

{authorization_token} is a Bearer token that contains the scope 'tokens:delete' and audience 'beyondidentity' (to create a Beyond Identity API token, see examples [here](/docs/next/create-api-token#example-create-tokens-for-the-beyond-identity-management-api))  

**Response**

The response will be an HTTP 200 with no contents.  

### Example: Revoke by passing whole token

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(MANAGEMENT_APPLICATION_ID)/revoke" \
-X POST \
-H "Authorization: Bearer $(MANAGEMENT_API_TOKEN)" \
-H "Content-Type: application/json" \
-d "token=$(TOKEN_TO_REVOKE)"'
title="/revoke"
/>

### Example: Revoke Token by ID

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/tokens/$(TOKEN_ID)" \
-X DELETE \
-H "Authorization: Bearer $(MANAGEMENT_API_TOKEN)" \
-H "Content-Type: application/json"'
title="DELETE /tokens/{TOKEN_ID}"
/>