---
 title: Create an API token
 sidebar_position: 6
 # Display h2 to h2 headings
 toc_min_heading_level: 2
 toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an API Token

All [Beyond Identity API](https://developer.beyondidentity.com/api/v1) endpoints require authentication using an access token. The access token is generated through OAuth 2.0 or OIDC, using the authorization code flow or the client credentials flow.

You can obtain an access token either through:

1. [Beyond Identity Admin Console](api-token#create-token-with-the-beyond-identity-admin-console)
2. [Beyond Identity APIs](api-token#create-token-with-the-beyond-identity-api)

The access token should be generated with your Beyond Identity Management API application in order to access any of the Beyond Identity APIs. The "Beyond Identity Management API" application is provided by default as part of the tenant onboarding process.

The access token must be provided in the Authorization header of an API request like the following:

```bash
curl https://api-us.beyondidentity.com/v1/... \
  -X $HTTP_METHOD -H "Authorization: Bearer $TOKEN"
```

API access tokens are valid for 3 months (TTL 7776000 seconds). You can restrict the token's access with [scopes](../apis/scopes) by selecting a list in the Beyond Identity Admin Console or specifying a space-separated string of scopes in your API request.

## Create Token with the Beyond Identity Admin Console

The simplest way to acquire an access token is through the Beyond Identity Admin Console. Under the "Applications" tab, select the "Beyond Identity Management API" application, navigate to the "API TOKENS" tab, and then click on "Create token". From there you can configure the token with a Name and specified list of Scopes.

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
	<iframe src='https://demo.arcade.software/OQge5lspW7TRuqvghZQd?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
	</iframe>
</div>

## Create Token with the Beyond Identity API

Alternatively, an access token may also be generated directly via API by requesting a token for the `Beyond Identity Management API` application. You will need the "Beyond Identity Management API" application's `CLIENT_ID`, `CLIENT_SECRET` and `APPLICATION_ID`. These values can be found either through the Beyond Identity Admin Console under the "Beyond Identity Admin" realm and selecting the "Beyond Identity Management API" application, or by [API](https://developer.beyondidentity.com/api/v1) after retrieving the management application. If you do not specify a list of scopes, all of the available scopes will be assigned to your token on creation.

### Client Credentials Flow:

<Tabs groupId="api-token-platform" queryString>
 <TabItem value="curl" label="Curl">

```bash title="/token"
curl https://auth-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$MANAGEMENT_APPLICATION_ID/token \
  -X POST \
  -u "$MANAGEMENT_API_CLIENT_ID:$MANAGEMENT_API_CLIENT_SECRET" --basic \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&scope=$SCOPES"
```

 </TabItem>
 <TabItem value="node" label="Node">

```jsx title="/token"
const apiTokenResponse = await fetch(
  `https://api-${REGION}.beyondidentity.com/v1/tenants/${TENANT_ID}/realms/${REALM_ID}/applications/${MANAGEMENT_APPLICATION_ID}/token`,
  {
    body: (() => {
      let formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      return formData;
    })(),
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${MANAGEMENT_API_CLIENT_ID}:${MANAGEMENT_API_CLIENT_SECRET}`
        ).toString('base64'),
    },
    method: 'POST',
  }
);

const apiTokenResponseJson = await tokenResponse.json();
const accessToken = apiTokenResponseJson.access_token;
```

 </TabItem>
</Tabs>

### Authorization Code Flow:

If you would like to use the authorization code flow, use the following curl examples below to optain an authorization code and then create a token with that code.

1. Authenticate to optain an authorization code:

```bash title="/authorize"
curl https://auth-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$MANAGEMENT_APPLICATION_ID/authorize?response_type=code&client_id=$MANAGEMENT_API_CLIENT_ID&redirect_uri=$REDIRECT_URI&scope=openid&state=$STATE&code_challenge=$OPTIONAL_CODE_CHALLENGE&code_challenge_method=S256
```

2. Create an access token the with authorization code:

```bash title="/token"
curl https://auth-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$MANAGEMENT_APPLICATION_ID/token \
  -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=$CODE&scope=$SCOPES&client_id=$MANAGEMENT_API_CLIENT_ID&code_verifier=$OPTIONAL_CODE_VERIFIER"
```

### Revoking Access Tokens:

In order to revoke an access token, you must be passed authentication in the form of either Bearer or Basic.

In the case of Basic authentication, the passed authentication must come from an Application registered in auth-config-service. The passed access token must be signed by the same client id as the application.

In the case of Bearer authentication, the passed authentication must contain the scope "token:delete".

Note that passing an invalid token, or a token which has already been revoked or expired, will produce a success response, pursuant to [RFC7009§2.2](https://www.rfc-editor.org/rfc/rfc7009).

```bash title="/revoke"
curl https://auth-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$MANAGEMENT_APPLICATION_ID/revoke \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"token":"$TOKEN"}'
```
