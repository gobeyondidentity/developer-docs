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
  date: 07/27/2023
  author: Anna Garcia
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

<br />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SetupJavaScript from '../includes/\_sdk-setup/\_setup-javascript.mdx';

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a [Next](https://nextjs.org) application that uses [NextAuth](https://next-auth.js.org/) (which is becoming [Auth.js](https://authjs.dev)).

:::note  
This guide uses the **Embedded SDK** Beyond Identity authenticator type, which allows full customization in your app. This solution involves creating more routes. For a lighter weight solution, see guidance using the **Hosted Web** authenticator type, in the guide: **[Getting Started with Next.js](/docs/next/get-started-nextjs)**.
For more information on authenticator types, check out the article **[here](/docs/next/authentication)**.  
:::

In this guide, you'll:

- Configure Beyond Identity as an Identity Provider
- Create an identity and generate a passkey
- Authenticate with a passkey

## Prerequisites

- A [Beyond Identity developer account](https://www.beyondidentity.com/developers/signup)
- The JavaScript SDK [installed](/docs/next/sdk-setup#installation) and [initialized](/docs/next/sdk-setup#setup)
- Next.js Application with NextAuth installed.

## NextAuth

The following are provided for your reference:

- [NextAuth.js Initialization](https://next-auth.js.org/configuration/initialization)
- [NextAuth.js OAuth Providers](https://next-auth.js.org/configuration/providers/oauth)

- [Auth.js Introduction](https://authjs.dev/getting-started/introduction)
- [Auth.js Guides](https://authjs.dev/guides)
- [Beyond Identity Provider](https://authjs.dev/reference/core/providers_beyondidentity)

<h3>Example</h3>

You'll overwrite the _wellKnown_, _clientId_ and _clientSecret_ values later in this process, so you can use a dummy value for now.

If you are using Next.js Version 12, create a route at **pages/api/auth/[...nextauth].js**.  
If you are using Next.js Version 13, create a route at **app/api/auth/[...nextauth]/route.ts**.

Add the following content:

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

```javascript
import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    {
      id: 'beyondidentity',
      name: 'Beyond Identity',
      type: 'oauth',
      wellKnown: process.env.BEYOND_IDENTITY_DISCOVERY,
      authorization: { params: { scope: 'openid' } },
      clientId: process.env.BEYOND_IDENTITY_CLIENT_ID,
      clientSecret: process.env.BEYOND_IDENTITY_CLIENT_SECRET,
      idToken: true,
      checks: ['state', 'pkce'],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          email: profile.sub,
        };
      },
    },
  ],
});
```

</TabItem>
<TabItem value="auth" label="Auth.js">

```javascript
import { Auth } from '@auth/core';
import BeyondIdentity from '@auth/core/providers/beyondidentity';

const request = new Request('https://example.com');
const response = await Auth(request, {
  providers: [BeyondIdentity({ clientId: '', clientSecret: '', issuer: '' })],
});
```

You'll overwrite the `Request` _url_ and `BeyondIdentity` _clientId_, _clientSecret_ and _issuer_ values later in this process, so you can use the dummy value for now.

</TabItem>
</Tabs>

## Set up Beyond Identity as an Identity Provider

To set up Beyond Identity as an Identity Provider, you need to create a Realm to hold identities and configuration. Inside that realm, you'll also create an [Application](../how-to/add-an-application.mdx) that contains the authentication flow configuration. These can be configured in you admin console that was created for you when you signed up for a developer account.

### Create a Realm

import CreateRealmAdminConsole from '../includes/\_create-realm-console.mdx';

<CreateRealmAdminConsole />

### Create an Application

import AddAppAdminConsole from '../includes/\_add-application-console.mdx';

<AddAppAdminConsole />

3. On the **External Protocol** tab, use the following values to complete this tab.

| Property                       | Value                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Display Name**               | any name you choose                                                                                                                                                                                                                                                                                                                                                                |
| **Protocol**                   | OIDC                                                                                                                                                                                                                                                                                                                                                                               |
| **Client Type**                | Confidential                                                                                                                                                                                                                                                                                                                                                                       |
| **PKCE**                       | S256                                                                                                                                                                                                                                                                                                                                                                               |
| **Redirect URIs**              | Use your application's App Scheme or Universal URL.<br /><br />Your redirect URI follows the pattern:<br /> http://localhost:3000/api/auth/callback/beyondidentity <br /><br />(Note that `'beyondidentity'` in this URI is the id of the OAuth provider as configured in the providers array in NextAuth.js. `/api/auth/callback/` is based on the Next.js route file structure.) |
| **Token Endpoint Auth Method** | Client Secret Basic                                                                                                                                                                                                                                                                                                                                                                |
| **Grant Type**                 | Authorization Code                                                                                                                                                                                                                                                                                                                                                                 |
| **All other options**          | Use the default values for the remaining options                                                                                                                                                                                                                                                                                                                                   |

4. On the **Authenticator Config** tab, use the following values to complete this tab.

| Property               | Value                                               |
| ---------------------- | --------------------------------------------------- |
| **Configuration Type** | Embedded SDK                                        |
| **Invocation Type**    | Automatic                                           |
| **Invoke URL**         | Use your application's App Scheme or Universal URL. |
| **Trusted Origin**     | Use your application's App Scheme or Universal URL. |

5. Click **Submit** to save the new app.

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

We will need to store a few more Beyond Identity values for API calls.

1. `BEYOND_IDENTITY_REGION`: This your tenant's region, either "us" or "eu", that can be found in the URL of the Beyond Identity Admin Console.

1. `BEYOND_IDENTITY_TENANT_ID`: From your realm's Home page, click **Edit realm**, then copy the **Tenant ID** from the Edit realm page. For help, see the guidance [here](docs/next/find-tenant-id).

1. `BEYOND_IDENTITY_REALM_ID`: From your realm's Home page, click **Edit realm**, then copy the **Realm Id** from the Edit realm page..

1. `BEYOND_IDENTITY_APPLICATION_CONFIG_ID`: From **Applications > {New Application} > Authenticator Config > Authenticator Config ID**

Your **.env** file's contents should look something like the example below:

```javascript
# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate one here: https://generate-secret.vercel.app/32
...

# Beyond Identity
BEYOND_IDENTITY_CLIENT_ID=Njlb6brHbCofRyCWGkiUQweTz
BEYOND_IDENTITY_CLIENT_SECRET=zs2oENddYNes ... 7uamRhvRJ9d3ZJcI97X
BEYOND_IDENTITY_DISCOVERY=https://auth-us.beyondidentity.com/v1/tenants/000111222333/realms/444555666777888/applications/1233449b-11c4-4884-b622-0bfbaefd44d3/.well-known/openid-configuration

BEYOND_IDENTITY_REGION=us
BEYOND_IDENTITY_TENANT_ID=000150caae867219
BEYOND_IDENTITY_REALM_ID=898e1e08d7da2373
BEYOND_IDENTITY_APPLICATION_CONFIG_ID=2e540d7a-4caf-7448-94ba-70183a82b4ad
```

## Create an Identity and generate a passkey

Once you have an application in the admin console you are ready to provision users in your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API.

**Using the Admin Console**:

import AddAnIdentity from '../includes/\_add-an-identity.mdx';

<AddAnIdentity />

For more information about identities, see [Add an identity](/docs/next/add-an-identity).

**Creating an API**:

In your application, create an API to make a call to the Beyond Identity Cloud. All API's require an Authorization with an accessToken. For information, see [Access tokens](docs/next/api-tokens).

```javascript
const identityResponse = await fetch(
  `https://api-${process.env.BEYOND_IDENTITY_REGION}.beyondidentity.com/v1/tenants/${process.env.BEYOND_IDENTITY_TENANT_ID}/realms/${process.env.BEYOND_IDENTITY_REALM_ID}/identities`,
  {
    body: JSON.stringify({
      identity: {
        display_name: email,
        traits: {
          type: 'traits_v0',
          username: email,
          primary_email_address: email,
        },
      },
    }),
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    method: 'POST',
  }
);
```

The response should contain an identity ID that you will need to generate a passkey.

```javascript
let identityResponseJson = await identityResponse.json();
let identityId = identityResponseJson.id;
```

### Generate a passkey

Once you have an identity you can generate a passkey.

**Using the Admin Console**:

import BindPasskeyToAnIdentity from '../includes/\_bind-passkey-to-an-identity-send-an-email-to-user.mdx';

<BindPasskeyToAnIdentity />

For more information, [How passkeys are created](/docs/next/universal-passkeys#how-passkeys-are-created).

**Creating an API**:

Continuing your API, use the `identityId` you generated above, create a credential binding job. A device enrollment email will be sent to you user's primary email address.

The `postBindingRedirectUri` is the URL that you would like the user to be redirected to after successfully binding a passkey.

```javascript
const credentialBindingLinkResponse = await fetch(`https://api-${process.env.BEYOND_IDENTITY_REGION}.beyondidentity.com/v1/tenants/${process.env.BEYOND_IDENTITY_TENANT_ID}/realms/${process.env.BEYOND_IDENTITY_REALM_ID}/identities/${identityId}/credential-binding-jobs`,
    {
      body: JSON.stringify({
        job: {
          delivery_method: 'EMAIL',
          authenticator_config_id: ${process.env.BEYOND_IDENTITY_APPLICATION_CONFIG_ID},
          post_binding_redirect_uri: postBindingRedirectUri,
        },
      }),
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      method: 'POST',
    }
  );

  let credentialBindingLinkResponseJson =
    await credentialBindingLinkResponse.json();
  res.send(credentialBindingLinkResponseJson);
```

For more information on this API, see [Add a passkey](/docs/next/add-passkey#api).

## Configure your application

### Bind passkey to device

When the user clicks or taps the link in the enrollment email, they are redirected to your application. You will need to create a route in your application to intercept the link.

1. Intercept the link from the enrollment email. The link that is redirected to your application will have the `/bind` path appended to your Invoke URL and several other query parameters.

```
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

2. Pass the link from the enrollment email into the SDK to complete the binding process.

You can validate the incoming URL with `isBindPasskeyUrl`. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

**Create a bind route**:

If you are using Next.js version 12, create a `bind.tsx` page under `/pages/`.  
If you are using Next.js version 13, create a `page.tsx` page under `/app/bind/`.

As long as your `Invoke URL` is configured properly in your [Authenticator Config](/docs/next/authentication), this is the page that will be redirected to during a bind passkey flow. Copy the following code snippet into that page.

<Tabs groupId="nextjs" queryString>
<TabItem value="nextauth" label="NextAuth.js">

```javascript
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { signIn } from 'next-auth/react';
import { Passkey } from '@beyondidentity/bi-sdk-js';

const BIBindPasskey = () => {
  const [bindPasskeyResult, setBindPasskeyResult] = useState('');

  useEffect(() => {
    // -- 1
    const bindPasskey = async () => {
      const BeyondIdentityEmbeddedSdk = await import(
        '@beyondidentity/bi-sdk-js'
      );
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
                <code>{JSON.stringify(bindPasskeyResult, null, 2)}</code>
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

1. After tapping the email sent to the user's device, the user is directed to your application's `/bind` route appending to the `invoke_url` configured in the application config.

2. The `useEffect` is only called once on page load. In this function, we initialize the Beyond Identity SDK and use `embedded.isBindPasskeyUrl` to check if the current page that was redirected to is in fact a valid `bind` URL.

3. If the URL is valid, we pull the URL using `window.location.href` and pass that directly into `embedded.bindPasskey` to complete the binding process.

4. Finally, the response of `embedded.bindPasskey` contains a `passkey` object, which represents the passkey bound to the device.

Once you have one passkey bound to a device, you can use it to [authenticate](#authenticate).

</TabItem>
<TabItem value="auth" label="Auth.js">

:::caution WIP
@auth/nextjs is work in progress. For now, use [NextAuth.js](?nextjs=nextauth#bind-passkey-to-device).
:::

</TabItem>
</Tabs>

### Configure the NextAuth Provider

If you are using Next.js version 12, create a `[...nextauth].ts` page under `/pages/api/auth/`.  
If you are using Next.js version 13, create a `page.tsx` page under `/app/auth/[...nextauth]/`.

Add the following Beyond Identity provider. The provider will go through an OAuth/OIDC that will result in fetching an id token that will log you in to the example app. Use the values you saved in your environment variables when creating an application above.

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
    issuer: process.env.BEYOND_IDENTITY_DISCOVERY,
  })
],
...
```

</TabItem>
</Tabs>

### Authenticate

The authenticate URL that is redirected to your application will append a `/bi-authenticate` path to your Invoke URL. Create a `/bi-authenticate` route to intercept this URL in your application:

```
$invoke_url/bi-authenticate?request=<request>
```

**Create a bi-authenticate route**:

If you are using Next.js version 12, create a `bi-authenticate.tsx` page under `/pages/`.  
If you are using Next.js version 13, create a `page.tsx` page under `/app/bi-authenticate/`.

As long as your `Invoke URL` is configured properly in your [Authenticator Config](/docs/next/authentication), this is the page that will be redirected to during an authorization flow. Copy the following code snippet into that page.

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

### Configure UI

NextAuth has a `useSession` hook to access session data and authentication status on the client side. In order to use this hook your components must be wrapped in a `SessionProvider` which uses React Context.

1. Wrap your main components in a `SessionProvider`

```javascript
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

2. Use the `useSession()` hook as well as `signIn` and `signOut` from `next-auth/react` inside a component.

Note that `'beyondidentity'` in `signIn` is the id of the OAuth provider as configured in the providers array above.

```javascript
import { signIn, signOut, useSession } from 'next-auth/react';
const { data: session } = useSession();
const [email, setEmail] = useState('');

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');

  const handleRegistration = () => {
    // Call your registration API that you created above
    // to generate an identity and bind a passkey
    callAPICreatedAbove(email);
  };

  return (
    <div>
      {session?.user && (
        <div>
          <p>{`Welcome ${session.user.name}!`}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
      {!session && (
        <div>
          <div>
            <button onClick={() => signIn('beyondidentity')}>Sign In</button>
          </div>
          <div>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <button onClick={handleRegistration}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

Next.js version 13 introduces React Server Components. The above assumes you are working only with client side components. To work with a server componet we can use `getServerSession`.

1. Update **app/api/auth/[...nextauth]/route.ts** to export the handler so we can use this in `getServerSession`.

```javascript
const handler = NextAuth({
  providers: [
    {
      id: 'beyondidentity',
      name: 'Beyond Identity',
      type: 'oauth',
      wellKnown: process.env.BEYOND_IDENTITY_DISCOVERY,
      authorization: { params: { scope: 'openid' } },
      clientId: process.env.BEYOND_IDENTITY_CLIENT_ID,
      clientSecret: process.env.BEYOND_IDENTITY_CLIENT_SECRET,
      idToken: true,
      checks: ['state', 'pkce'],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          email: profile.sub,
        };
      },
    },
  ],
});

export { handler as GET, handler as POST };
```

2. In your `/app/page.tsx` use `getServerSession` to access the `session`.

```javascript
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <Login session={session} />;
}
```

3. Modify your Login component above to accept a `session` prop and remove `useSession`.

```javascript
interface LoginProps {
  session: Session | null;
}

export default function Login({ session }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

...
```
