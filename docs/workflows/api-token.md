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

The access token will work for any application that you have configured to provide access to the Beyond Identity Management API Resource Server. The "Beyond Identity Management API" application is provided by default as part of the tenant onboarding process.

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

Alternatively, an access token may also be generated directly via API by requesting a token for the "Beyond Identity Management API" Application. If you do not specify a list of scopes, all of the available scopes will be assigned to your token on creation.

<Tabs groupId="api-token-platform" queryString>
 <TabItem value="curl" label="Curl">

```bash
curl https://auth-us.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID/token \
  -X POST \
  -u "$CLIENT_ID:$CLIENT_SECRET" --basic \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&scope=$SCOPES"
```

 </TabItem>
 <TabItem value="node" label="Node">

```jsx
const apiTokenResponse = await fetch(
  `https://api-${REGION}.beyondidentity.com/v1/tenants/${TENANT_ID}/realms/${REALM_ID}/applications/${APPLICATION_ID}/token`,
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
