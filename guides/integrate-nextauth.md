---
title: NextAuth
sidebar_position: 6
---

import SetupJavaScript from '/docs/workflows/_sdk-setup/_setup-javascript.mdx';
import Arcade, {Clip} from '/src/components/Arcade.tsx';

# Integrate Beyond Identity Passwordless Authentication into NextAuth

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a [Next](https://nextjs.org) application that uses [NextAuth](https://authjs.dev).

This guide will cover:

- How to install the JavaScript SDK
- How to configure Beyond Identity as an Identity Provider
- How to create an identity and generate a passkey
- How to authenticate with a passkey
- How to configure the OIDC NextAuth plugin

## Prerequisites

- Set up a [developer account](/docs/v1/workflows/account-setup)

## NextAuth

- [NextAuth Introduction](https://authjs.dev/getting-started/introduction)
- [NextAuth Guides](https://authjs.dev/guides)
- [Beyond Identity Provider](https://authjs.dev/reference/core/providers_beyondidentity)

### Example

```javascript
import { Auth } from "@auth/core"
import BeyondIdentity from "@auth/core/providers/beyondidentity"

const request = new Request("https://example.com")
const response = await Auth(request, {
  providers: [BeyondIdentity({ clientId: "", clientSecret: "", issuer: "" })],
})
```

We will overwrite the `Request` _url_ and `BeyondIdentity` _clientId_, _clientSecret_ and _issuer_ values later in this process, so you can use the dummy value for now.

## Install the JavaScript SDK

In order to use Beyond Identity functionality in your application, you will need to install the SDK. The [JavaScript SDK](https://github.com/gobeyondidentity/bi-sdk-js) provides functionality from passkey creation to passwordless authentication. A set of functions are provided to you through an `Embedded` namespace.

## Initialize the JavaScript SDK

Once you've installed the SDK, initialize it so that you can call the Embedded functions.

<SetupJavaScript />

## Set up Beyond Identity as an Identity Provider

To set up Beyond Identity as an Identity Provider, you need to create a [Realm](/docs/v1/workflows/realms) to hold identities and configuration. Inside that realm, you'll need to create an [Application](/docs/v1/workflows/applications) that contains the authentication flow configuration. These can be configured in you admin console that was created for you when you signed up for a developer account.

### Create a Realm

From the admin console, click the realm drop-down, and click **Create new realm**.

<Arcade clip={Clip.CreateRealm} />

### Create an Application

From the admin console, click **Apps**, then click **Add app**.

There is a lot to configure when creating an application. When creating your application make sure:

- Redirect URIs contains your application's App Scheme or Universal URL
- Configuration Type (in the Authenticator Config tab) is set to `Embedded SDK`
- Invoke URL (in the Authenticator Config tab) contains your application's App Scheme or Universal URL
- Invocation Type (in the Authenticator Config tab) is set to `Automatic`.

For help choosing options, visit the following guides:

- [Workflows: Applications](/docs/v1/workflows/applications)
- [Authenticator Config](/docs/v1/platform-overview/authenticator-config)

<Arcade clip={Clip.CreateApplication} />

Now that we have created our application, we are ready to update our values. Store these values in your Next application's environment variables to use with the Beyond Identity provider. 

1. For `BeyondIdentity` _clientId_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
1. For `BeyondIdentity` _clientSecret_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
1. For `BeyondIdentity` _issuer_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Issuer

## Create an Identity and generate a Universal Passkey

Once you have an application in the admin console you are ready to provision users in your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API. This guide will use the admin console. Navigate to your realm in the console and click **Identities**, then click **Add identity**.

For more information visit [Workflows: User and Group Provisioning](/docs/v1/workflows/user-provisioning).

<Arcade clip={Clip.CreateIdentity} />

### Generate a passkey

Once you have an identity you can generate a passkey. This step can also be done either in the admin console or through an API. This guide will use the admin console. Navigate back to **Identities** and select the identity you would like to bind to a passkey. Click **Add a passkey**, select your app and the click **Proceed & send email**. The user will receive an enrollment email which they can tap on to bind a passkey to their device.

For more information visit [Workflows: Bind Passkey To User](/docs/v1/workflows/bind-passkey).

<Arcade clip={Clip.CreatePasskey} />

## Configure Next Application

### Bind passkey to device

Once the user taps on the enrollment email, they will be redirected to your application. Intercept the link from the enrollment email. The link that is redirected to your application will take on the following form. A `/bind` path will be appended to your Invoke URL (configured in your application above) as well as several other query parameters.

```
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

Once you receive the incoming URL, pass it into the SDK to complete the binding process. You can validate the incoming URL with `isBindPasskeyUrl`. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

Create a `bind.tsx` page under `/next-auth-example/pages`. As long as your `Invoke URL` is configured properly in your [Authenticator Config](/docs/v1/platform-overview/authenticator-config), this is the page that will be redirected to during a bind passkey flow. Copy the following code snippet into that page.

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

What's happening here?

1. The `useEffect` is only called once on page load. In this function, we initialize the Beyond Identity SDK and use `embedded.isBindPasskeyUrl` to check if the current page that was redirected to is in fact a valid `bind` URL.
2. If the URL is valid, we pull the URL using `window.location.href` and pass that directly into `embedded.bindPasskey` to complete the binding process.
3. Finally, the response of `embedded.bindPasskey` contains a `passkey` object, which represents the passkey bound to the device.

Once you have one passkey bound to a device, you can use it to authenticate. For more information visit [Workflows: Authenticate with Passkey](/docs/v1/workflows/authentication).

### Configuring the NextAuth Provider

Under `next-auth-example/pages/api/auth/[...nextauth].ts`, add the following Beyond Identity provider. The provider will go through an OAuth/OIDC that will result in fetching an id token that will log you in to the example app. Use the values you saved in your environment variables when creating an application above. 

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

### Authenticate

The authenticate url that is redirected to your application will append a `/bi-authenticate` path to your Invoke URL. Use a "/bi-authenticate" route to intercept this url in your application:

```
$invoke_url/bi-authenticate?request=<request>
```

Create a `bi-authenticate.tsx` page under `/next-auth-example/pages`. As long as your `Invoke URL` is configured properly in your [Authenticator Config](/docs/v1/platform-overview/authenticator-config), this is the page that will be redirected to during an authorization flow. Copy the following code snippet into that page.

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

What's happening here?

1. The `useEffect` is only called once on page load. In this function, we initialize the Beyond Identity SDK and use `embedded.isAuthenticateUrl` to check if the current page that was redirected to is in fact a valid `bi-authenticate` URL.
2. If the URL is valid, we pull the URL using `window.location.href` and pass that directly into `biAuthenticate` in step 3.
3. `biAuthenticate` calls `embedded.authenticate` with a valid `bi-authenticate` URL. This function performs a challenge/response against a passkey bound to your browser. Note that the callback in `embedded.authenticate` contains logic in order to prompt a user to select a passkey if there is more than one.
4. Finally, the response of `embedded.authenticate` contains a `redirectURL`. Follow this redirectURL to complete the OAuth/OIDC flow.
