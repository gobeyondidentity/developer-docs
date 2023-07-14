---
title: Expiration time
id: expiration-time
description: ''
slug: /expiration-time
keywords: 
 - api-tokens
 - workflow
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
   author: Patricia McPhee
draft: false
doc_type: overview
displayed_sidebar: mainSidebar
---

import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';


This parameter is used to set a custom expiration time on individual tokens, to a value that is less than what was  originally configured. This is done by passing an `expiration_time` parameter to the `/token` endpoint.

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token" \
-X POST \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=authorization_code&code=$(CODE)&scope=$(SCOPES)&client_id=$(API_CLIENT_ID)&code_verifier=$(OPTIONAL_CODE_VERIFIER)&expiration_time=$(EXPIRES_IN_SECONDS)"'
title="/token"
/>

When calling inspect on the newly created token you will see the following
fields.

```json
{
  "active": true,
  "iss": "https://auth-us.beyondidentity.com/v1/tenants/0001b18ee979ce2c/realms/eb381961f60ce222/applications/4d3b2c7f-69c9-4edf-8c21-4b098af8d40a",
  "sub": "2eDWKMf4sr5gwPjgu_1MTCgD",
  "aud": [
    "beyondidentity"
  ],
  "exp": 1685353182,
  "nbf": 1677577182,
  "iat": 1677577182,
  "jti": "1waXvcIcr4PHW3Q2HDI1Im4nUXh32dZ5",
  "scope": "tenants:read realms:create realms:read realms:update realms:delete identities:create identities:read identities:update identities:delete groups:create groups:read groups:update groups:delete applications:create applications:read applications:update applications:delete authenticator-configs:create authenticator-configs:read authenticator-configs:update authenticator-configs:delete policy-v1:create policy-v1:read resource-servers:create resource-servers:read resource-servers:update resource-servers:delete tokens:create tokens:read tokens:update tokens:delete tokens:introspect credentials:read credentials:revoke credential-binding-jobs:create credential-binding-jobs:read themes:create themes:read themes:update events:read console-configs:read console-configs:update tenants:update",
  "azp": "tenants/0001b18ee979ce2c/realms/eb381961f60ce222/applications/4d3b2c7f-69c9-4edf-8c21-4b098af8d40a",
  "bi_p": "tenants/0001b18ee979ce2c/realms/eb381961f60ce222/applications/4d3b2c7f-69c9-4edf-8c21-4b098af8d40a",
  "bi_t": "0001b18ee979ce2c",
  "bi_r": "*",
}
```

We can now verify that the difference of expiration time and issued at time
`(exp- iat)` is equal to what we send in expiration_time request parameter.