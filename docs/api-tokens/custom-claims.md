---
title: Custom claims
id: custom-claims
description: ''
slug: /custom-claims
keywords: 
 - api-tokens
 - workflow
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
   author: Patricia McPhee
doc_type: overview
displayed_sidebar: howToGuidesSidebar
---


import { Alert, Col, Row } from 'antd';
import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';

<Row>
  <Col span={12}>
    <Alert message="This article is only about one parameter, and the info has been integrated into the /create-api-token article. We can remove this page" type="info" />
  </Col>
</Row>
<br />

<Alert message="Do we have Admin Console instructions?" type="error" />
<br />


The `custom_claims` parameter allows for additional information to be stored within a token. Any data may be associated with a token by using the custom_claims URL parameter. The provided data must be a valid JSON object. All fields are accessible, when parsed from a token within the `bi_custom` field of the JWT payload. 

<MultiLanguageCodeBlock
curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(APPLICATION_ID)/token?principal_type=application&principal_id=$(APPLICATION_ID)&"
-u "$(MANAGEMENT_API_CLIENT_ID):$(MANAGEMENT_API_CLIENT_SECRET)" --basic \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials&scope=$(SCOPES)&custom_claims=$(CLAIMS_JSON_OBJECT)"'
title="/tokens"
/>

After a token is created, when introspected, the token will contain the `bi_custom` field with all of the claims.

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
  "bi_custom": {
    "a":"b",
    "c":"d"
  }
}
```

In this case, we set the `CLAIMS_JSON_OBJECT` to `{"a": "b", "c": "d"}`.