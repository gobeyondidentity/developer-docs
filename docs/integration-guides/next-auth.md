---
title: Integrate with NextAuth
id: next-auth
description: ''
slug: /next-auth
keywords: 
 - next-auth
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/15/2023
   author: Patricia McPhee
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

import { Alert, Col, Row } from 'antd';

<Row>
  <Col span={6}>
    <Alert message="Ready for review" type="success" />
  </Col>
</Row>
<br />

<p>
<mark>I'm starting to wonder if this topic would fit best under the JavaScript SDK. Maybe it would fit best under <b>Authentication > Embedded SDK > Integrations</b> and then call it "Authenticate with NextAuth", or something similar.</mark>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SetupJavaScript from '../includes/_sdk-setup/_setup-javascript.mdx';


This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a [Next](https://nextjs.org) application that uses [NextAuth](https://next-auth.js.org/) (which is becoming [Auth.js](https://authjs.dev)).

In this guide, you'll:

- Configure Beyond Identity as an Identity Provider
- Create an identity and generate a passkey
- Authenticate with a passkey

## Prerequisites

- A [Beyond Identity developer account](https://www.beyondidentity.com/developers/signup)
- The JavaScript SDK [installed](/docs/next/sdk-setup#installation) and [initialized](/docs/next/sdk-setup#setup)

## NextAuth

<p><mark>What's the guidance for this section? What's the user expected to do? We're providing links but we're not telling them what to do with them.  Are the links just for their reference in case they need them?</mark></p>

- [NextAuth.js Initialization](https://next-auth.js.org/configuration/initialization)
- [NextAuth.js OAuth Providers](https://next-auth.js.org/configuration/providers/oauth)

- [Auth.js Introduction](https://authjs.dev/getting-started/introduction)
- [Auth.js Guides](https://authjs.dev/guides)
- [Beyond Identity Provider](https://authjs.dev/reference/core/providers_beyondidentity)

<h3>Example</h3>

You'll overwrite the _wellKnown_, _clientId_ and _clientSecret_ values later in this process, so you can use a dummy value for now.

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

```javascript
import NextAuth from "next-auth"

export default NextAuth({
  providers: [
    {
      id: "beyondidentity",
      name: "Beyond Identity",
      type: "oauth",
      wellKnown: process.env.APP_DISCOVERY_ENDPOINT,
      authorization: { params: { scope: "openid" } },
      clientId: process.env.APP_CLIENT_ID,
      clientSecret: process.env.APP_CLIENT_SECRET,
      idToken: true,
      checks: ["state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          email: profile.sub,
        }
      }
    }
  ]
})
```


</TabItem>
<TabItem value="auth" label="Auth.js">

```javascript
import { Auth } from "@auth/core"
import BeyondIdentity from "@auth/core/providers/beyondidentity"

const request = new Request("https://example.com")
const response = await Auth(request, {
  providers: [BeyondIdentity({ clientId: "", clientSecret: "", issuer: "" })],
})
```

You'll overwrite the `Request` _url_ and `BeyondIdentity` _clientId_, _clientSecret_ and _issuer_ values later in this process, so you can use the dummy value for now.

</TabItem>
</Tabs>


## Set up Beyond Identity as an Identity Provider

To set up Beyond Identity as an Identity Provider, you need to create a Realm to hold identities and configuration. Inside that realm, you'll also create an [Application](../how-to/add-an-application.mdx) that contains the authentication flow configuration. These can be configured in you admin console that was created for you when you signed up for a developer account.

### Create a Realm

import CreateRealmAdminConsole from '../includes/_create-realm-console.mdx';

<CreateRealmAdminConsole />

### Create an Application

import AddAppAdminConsole  from '../includes/_add-application-console.mdx';

<AddAppAdminConsole />

3. On the **External Protocol** tab, use the following values to complete this tab.  

  | Property | Value | 
  | ----------- | ----------- |
  | **Protocol** | <mark>What's recommended for this particular use case?</mark> |
  | **Client Type** | <mark>What's recommended for this particular use case?</mark> | 
  | **PKCE** | Disabled <mark>Is this correct for this use case?</mark> | 
  | **Redirect URIs** | Use your application's App Scheme or Universal URL.<br /><br />Your real redirect URI follows the pattern:<br /><br /> <mark>Can we provide an example?</mark> | 
  | **Token Endpoint Auth Method** | <mark>What's recommended for this particular use case?</mark> | 
  | **Grant Type** | <mark>What's recommended for this particular use case?</mark> | 
  | **All other options** | Use the default values for the remaining options |  

1. Click the **Authenticator Config** tab, select **Embedded SDK** as the Configuration Type, and use the following values. 

  | Property | Value | 
  | ----------- | ----------- |
  | **Invocation Type** | Automatic |
  | **Invoke URL** | Use your application's App Scheme or Universal URL. | 
  | **Trusted Origin** | <mark>Are they leaving this blank?</mark> | 

1. Click **Submit** to save the new app.  


### Configure environment variables

Now that you've create an app in Beyond Identity, you're ready to update some values. Store these values in your Next application's environment variables to use with the Beyond Identity provider. 

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

1. For _wellKnown_, copy and paste the value from **Applications > {New Application} > External Protocol > Discovery Endpoint**.

2. For _clientId_, copy and paste the value from **Applications > {New Application} > External Protocol > Client ID**.

3. For _clientSecret_, copy and paste the value from **Applications > {New Application} > External Protocol > Client Secret**.

</TabItem>
<TabItem value="auth" label="Auth.js">

1. For `BeyondIdentity` _clientId_, copy and paste the value from **Applications > {New Application} > External Protocol > Client ID**.

1. For `BeyondIdentity` _clientSecret_, copy and paste the value from **Applications > {New Application} > External Protocol > Client Secret**.

1. For `BeyondIdentity` _issuer_, copy and paste the value from **Applications > {New Application} > External Protocol > Issuer**.

</TabItem>
</Tabs>

## Create an Identity and generate a passkey

Once you have an application in the admin console you are ready to provision users in your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API. This guide will use the admin console. 

import AddAnIdentity from '../includes/_add-an-identity.mdx';

<AddAnIdentity />

For more information about identities, see [Identity and groups](/docs/next/platform-overview#directory).

### Generate a passkey

Once you have an identity you can generate a passkey. This step can also be done either in the admin console or through an API. 

import BindPasskeyToAnIdentity from '../includes/_bind-passkey-to-an-identity-send-an-email-to-user.mdx';

<BindPasskeyToAnIdentity />

For more information, [How passkeys are created](/docs/next/universal-passkeys#how-passkeys-are-created).

## Configure your application

### Bind passkey to device

When the user clicks or taps the link in the enrollment email, they are redirected to your application. 

1. Intercept the link from the enrollment email. The link that is redirected to your application will have the `/bind` path appended to your Invoke URL and several other query parameters.

  ```
  $invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
  ```
2. Pass the link from the enrollment email into the SDK to complete the binding process. 

  You can validate the incoming URL with `isBindPasskeyUrl`. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

3. Create a `bind.tsx` page under `/next-auth-example/pages`. As long as your `Invoke URL` is configured properly in your [Authenticator Config](/docs/next/authenticator-config), this is the page that will be redirected to during a bind passkey flow. Copy the following code snippet into that page.

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

```javascript
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { signIn } from "next-auth/react";
import { Passkey } from "@beyondidentity/bi-sdk-js";

const BIBindPasskey = () => {
  const [bindPasskeyResult, setBindPasskeyResult] = useState('');

  useEffect(() => {
    // -- 1
    const bindPasskey = async () => {
      const BeyondIdentityEmbeddedSdk = await import("@beyondidentity/bi-sdk-js");
      let embedded = await BeyondIdentitySdk.EmbeddedSdk.initialize();
      if (embedded.isBindPasskeyUrl(window.location.href)) {
        // Only bind passkey if the URL is a "bind" URL
        let bindPasskeyUrl = window.location.href;
        // -- 2
        embedded
          .bindPasskey(bindPasskeyUrl)
          .then((result) => {
            // -- 3
            setBindPasskeyResult(result);
            signIn('beyondidentity', {
              tenant_id: tenantId,
            });
          })
          .catch((error) => {
            setBindPasskeyResult(error.toString());
          });
      }
    };

    bindPasskey().catch(console.error);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className="container">
         <div className="row">	
          <div className="d-flex justify-content-center">	
            <div className="spinner-border" role="status">	
              <span className="sr-only"></span>	
            </div>	
          </div>	
        </div>
        <div className="row">
          {bindPasskeyResult.length > 0 && (
            <div className="row row-cols-1 row-cols-md-1 mt-3">
              <div className="col">
                <code>
                  {JSON.stringify(bindPasskeyResult, null, 2)}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BIBindPasskey;
```

**What's happening here?**  

1. The `useEffect` is only called once on page load. In this function, we initialize the Beyond Identity SDK and use `embedded.isBindPasskeyUrl` to check if the current page that was redirected to is in fact a valid `bind` URL.

2. If the URL is valid, we pull the URL using `window.location.href` and pass that directly into `embedded.bindPasskey` to complete the binding process.

3. Finally, the response of `embedded.bindPasskey` contains a `passkey` object, which represents the passkey bound to the device.

Once you have one passkey bound to a device, you can use it to [authenticate](#authenticate).

</TabItem>
<TabItem value="auth" label="Auth.js">

:::caution WIP
@auth/nextjs is work in progress. For now, use [NextAuth.js](?nextjs=nextauth#bind-passkey-to-device).
:::

</TabItem>
</Tabs>

### Configure the NextAuth Provider

Under `next-auth-example/pages/api/auth/[...nextauth].ts`, add the following Beyond Identity provider. The provider will go through an OAuth/OIDC that will result in fetching an id token that will log you in to the example app. Use the values you saved in your environment variables when creating an application above. 

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

```javascript
...
import NextAuth from "next-auth"
...
providers: [
  {
    id: "beyondidentity",
    name: "Beyond Identity",
    type: "oauth",
    wellKnown: process.env.APP_DISCOVERY_ENDPOINT,
    authorization: { params: { scope: "openid" } },
    clientId: process.env.APP_CLIENT_ID,
    clientSecret: process.env.APP_CLIENT_SECRET,
    idToken: true,
    checks: ["state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.sub,
        email: profile.sub,
      }
    }
  }
]
...
```

</TabItem>
<TabItem value="auth" label="Auth.js">

```javascript
...
import BeyondIdentity from "@auth/core/providers/beyondidentity"
...
providers: [
  //@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
  BeyondIdentity({
    clientId: process.env.BEYOND_IDENTITY_CLIENT_ID,
    clientSecret: process.env.BEYOND_IDENTITY_CLIENT_SECRET,
    issuer: process.env.BEYOND_IDENTITY_ISSUER,
  })
],
...
```

</TabItem>
</Tabs>

### Authenticate

The authenticate URL that is redirected to your application will append a `/bi-authenticate` path to your Invoke URL. Use a `/bi-authenticate` route to intercept this URL in your application:

```
$invoke_url/bi-authenticate?request=<request>
```

Create a `bi-authenticate.tsx` page under `/next-auth-example/pages`. As long as your `Invoke URL` is configured properly in your [Authenticator Config](/docs/next/authenticator-config), this is the page that will be redirected to during an authorization flow. Copy the following code snippet into that page.

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

```javascript
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Passkey } from "@beyondidentity/bi-sdk-js";

const BIAuthenticate = () => {
  const [biAuthenticateResult, setBiAuthenticateResult] = useState("");

  useEffect(() => {
    // -- 1
    const authenticate = async () => {
      const BeyondIdentityEmbeddedSdk = await import("@beyondidentity/bi-sdk-js");
      let embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();
      if (embedded.isAuthenticateUrl(window.location.href)) {
        // Only authenticate if the URL is a "bi-authenticate" URL
        let biAuthenticateUrl = window.location.href;
        // -- 2
        biAuthenticate(biAuthenticateUrl).then(redirectURL => {
          // -- 4
          window.location.href = redirectURL;
        }).catch(error => {
          setBiAuthenticateResult(error.toString());
        });
      }
    }
    authenticate().catch(console.error);
  }, []);

  // -- 3
  async function biAuthenticate(url: string): Promise<string> {
    const BeyondIdentityEmbeddedSdk = await import("@beyondidentity/bi-sdk-js");
    let embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();

    // Display passkeys so user can select one
    let passkeys = await embedded.getPasskeys();
    let promptText = passkeys.map((passkey, index) => {
      return `${index}: ${passkey.identity.username}`;
    }).join("\n");
    let selectedIndex = parseInt(prompt(promptText, "index")!!);
    if (selectedIndex >= 0 && selectedIndex < passkeys.length) {
      let selectedId = passkeys[selectedIndex].id;
      // Perform authentication using selected id
      let result = await embedded.authenticate(url, selectedId);
      return Promise.resolve(result.redirectURL);
    } else {
      // This will fail in core as it won't match to any id
      return Promise.resolve("unknown_id");
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
        <div className="row">
          {
            biAuthenticateResult.length > 0 &&
            <div className="row row-cols-1 row-cols-md-1 mt-3">
              <div className="col">
                <code>
                  {JSON.stringify(biAuthenticateResult, null, 2)}
                </code>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default BIAuthenticate;
```

**What's happening here?**  

1. The `useEffect` is only called once on page load. In this function, we initialize the Beyond Identity SDK and use `embedded.isAuthenticateUrl` to check if the current page that was redirected to is in fact a valid `bi-authenticate` URL.

2. If the URL is valid, we pull the URL using `window.location.href` and pass that directly into `biAuthenticate` in step 3.

3. `biAuthenticate` calls `embedded.authenticate` with a valid `bi-authenticate` URL. This function performs a challenge/response against a passkey bound to your browser. Note that the callback in `embedded.authenticate` contains logic in order to prompt a user to select a passkey if there is more than one.

4. Finally, the response of `embedded.authenticate` contains a `redirectURL`. Follow this redirectURL to complete the OAuth/OIDC flow.

</TabItem>
<TabItem value="auth" label="Auth.js">

:::caution WIP
@auth/nextjs is work in progress. For now, use [NextAuth.js](?nextjs=nextauth#authenticate).
:::

</TabItem>
</Tabs>

