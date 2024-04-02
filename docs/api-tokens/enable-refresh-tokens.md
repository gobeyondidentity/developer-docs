---
title: Refresh token request
id: enable-refresh-tokens
description: ''
slug: /enable-refresh-tokens
keywords:
 - api token
 - create
pagination_next: null
pagination_prev: null
last_update:
   date: 07/07/2023
   author: Jen Field
doc_type: how-to
displayed_sidebar: mainSidebar
---

import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';


When you [request an access token](/docs/create-api-token#api), it is possible to receive an additional token called a [refresh token](https://datatracker.ietf.org/doc/html/rfc6749#section-1.5) in the response.  The refresh token can be used to request additional access tokens with identical or narrower scope.

## Prerequisites

In order to request a refresh token, you need to have an [app configured in your Beyond Identity tenant](/docs/add-an-application) with the **Enable Refresh Tokens** setting enabled.

If enabled, the [create token](/docs/create-api-token#api) response JSON object will contain an additional field called `refresh_token`, similar to [RFC6749#4.1.4](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.4).

You can use that refresh token to obtain a new access token for the same identity with the same settings.

## API

Use a refresh token to obtain a new access token as follows:

### Endpoints

The request uses the app's `/token` endpoint:

```http
https://auth-{us|eu}.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/applications/{application_id}/token
```

### Create HTTP Request

Create the HTTP request as follows:

**Request URL**

```http
https://auth-{us|eu}.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/applications/{application_id}/token
```

**Request method**: POST

**Request headers**:

```json
    "content-type": "application/x-www-form-urlencoded"
```

**Request body**:

```json
    "grant_type": "refresh_token",
    "refresh_token": "{refresh_token}"
```
where `{refresh_token}` is the base64 encoded refresh_token returned from the previous access token request

### Example

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
-X POST \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=refresh_token&refresh_token=$(REFRESH_TOKEN)"'
title="/token"
/>

You can read more about refresh flow in [RFC-6749#6](https://datatracker.ietf.org/doc/html/rfc6749#section-6)
