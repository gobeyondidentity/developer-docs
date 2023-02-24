---
title: NextAuth
sidebar_position: 6
---

import SetupJavaScript from '/docs/workflows/_sdk-setup/_setup-javascript.mdx';
import Arcade, {Clip} from '/src/components/Arcade.tsx';
import AppSchemeCaution from '/docs/workflows/\_app-scheme-caution.mdx';
import InvocationTip from '/docs/workflows/\_invocation-type-tip.mdx';
import InvocationDiagram from '/docs/platform-overview/\_invocation-url-diagram.mdx';

# Integrate Beyond Identity Passwordless Authentication into NextAuth

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Next application that uses NextAuth.

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

For help choosing options, visit the following guides:

- [Workflows: Applications](/docs/v1/workflows/applications)
- [Authenticator Config](/docs/v1/platform-overview/authenticator-config)

<Arcade clip={Clip.CreateApplication} />

Now that we have created our application, we are ready to update our values.

1. For `BeyondIdentity` _clientId_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
1. For `BeyondIdentity` _clientSecret_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
1. For `BeyondIdentity` _issuer_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Issuer

## Create an Identity and generate a Universal Passkey

Once you have an application in the admin console you are ready to provising users to your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API. This guide will use the admin console. Navigate to your realm in the console and click **Identities**, then click **Add identity**.

For more information visit [Workflows: User and Group Provisioning](/docs/v1/workflows/user-provisioning).

<Arcade clip={Clip.CreateIdentity} />

### Generate a passkey

Once you have an identity you can generate a passkey. This step can also be done either in the admin console or through an API. This guide will use the admin console. Navigate back to **Identities** and select the identity you would like to bind to a passkey. Click **Add a passkey**, select your app and the click **Proceed & send email**. The user will receive an enrollment email which they can tap on to bind a passkey to their device.

For more information visit [Workflows: Bind Passkey To User](/docs/v1/workflows/bind-passkey).

<Arcade clip={Clip.CreatePasskey} />

### Bind passkey to device

Once the user taps on the enrollment email, they will be redirected to your application. Intercept the link from the enrollment email. The link that is redirected to your application will take on the following form. A `/bind` path will be appended to your Invoke URL (configured in your application above) as well as several other query parameters.

```
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

Once you receive the incoming URL, pass it into the SDK to complete the binding process. You can validate the incoming URL with `isBindPasskeyUrl`. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

```javascript
if (embedded.isBindPasskeyUrl(url)) {
  const bindPasskeyResponse = await embedded.bindPasskey(url);
}
```

## Authenticate with Passkey

Once you have one passkey bound to a device, you can use it to authenticate. For more information visit [Workflows: Authenticate with Passkey](/docs/v1/workflows/authentication).

### Craft an Authorization URL

First you will need to craft an authorization URL. The base url can be found in the Beyond Identity Admin Console
under your application, select "EXTERNAL PROTOCOL". Copy the `Authorization Endpoint` and add the following additional query parameters:

![Authorize Url](../docs/workflows/screenshots/authentication-auth-url.png)

```bash title="/authorize"
https://auth-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID/authorize?
response_type=code
&client_id=$APPLICATION_CLIENT_ID
&redirect_uri=$REDIRECT_URI
&scope=openid
&state=$STATE
&code_challenge_method=256
&code_challenge=$PKCE_CODE_CHALLENGE
```

Check your appliction config in the admin console for your `APPLICATION_CLIENT_ID`.

The `REDIRECT_URI` is your application's App Scheme or Universal URL.

:::info PKCE
Note that the following query parameters includes [PKCE](https://www.rfc-editor.org/rfc/rfc7636) as it is recommeded, but optional. If you send an authorization request with PKCE, you will need to store the hash of the `code_challenge` so that it can be passed to the token exchange endpoint later as a `code_verifier`.

You will need to set PKCE as a Client Configuration in your Application Config.
:::

:::info state
The `STATE` parameter is used to mitigiate [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery). Have your application generate a random string for the `STATE` value on each authentication request. You should check that this string is returned back to you to in the response.
:::

### Configure Authenticator Config

There are three pieces we need to check in the [Authenticator Config](/docs/v1/platform-overview/authenticator-config) before authentication. To check your config, navigate the Beyond Identity Admin Console and find your application. Select "AUTHENTICATOR CONFIG".

1. In order to use the Embedded SDKs, the `Configuration Type` should be set to [Embedded SDK](/docs/v1/platform-overview/authenticator-config#embedded-sdk).
2. Set the [Invoke URL](/docs/v1/platform-overview/authenticator-config#invoke-url) to a URL that "points" to where your application is. In the case of a native application (iOS, Android, Flutter, React Native), this is either an App Scheme or an Universal URL / App Link. In the case of a web application, this is just a URL to your web application or a specific page of your web application.

<AppSchemeCaution/>

3. Set the the [Invocation Type](/docs/v1/platform-overview/authenticator-config#invocation-type). This specifies how our authentication URL is delivered to your application. Invocation Type can be one of two values:

- **Automatic**: redirect to your application using the Invoke URL with a challenge that your app will need to sign.

- **Manual**: the challenge will be returned to you as part of a JSON response.

<InvocationTip/>

For **NextAuth**, we will use **Automatic**.

<InvocationDiagram />

![Invocation Type](../docs/workflows/screenshots/authentication-invocation.png)

### Start Authorization for Invocation Type

The authenticate url that is redirected to your application will append a `/bi-authenticate` path to your Invoke URL. Use a "/bi-authenticate" route to intercept this url in your application:

```
$invoke_url/bi-authenticate?request=<request>
```

#### Handle Authorization in your applicaiton

The authorization flow should begin in a webview with your [crafted authorization URL](/docs/v1/workflows/authentication#1-craft-authorization-url).

Don't forget to [initalize your SDK](/docs/v1/workflows/sdk-setup) and present some logic to the user to select a passkey ahead of time.

:::info
In a native application, the webview used should follows best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252). This means that on iOS applications [ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession) should be used, and [Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs/) should be used on Android devices.

`UIWebView`, `WKWebView`, and `WebView` are explicitly not supported due to the security and usability reasons explained in [Section 8.12 of RFC 8252](https://www.rfc-editor.org/rfc/rfc8252#section-8.12).
:::

1. Configuring NextAuth

Under `next-auth-example/pages/api/auth/[...nextauth].ts`, add the following Beyond Identity provider. The provider will go through an OAuth/OIDC that will result in fetching an id token that will log you in to the example app. Many of the values used to configure the request are the values from your [crafted authorization URL](/docs/v1/workflows/authentication#1-craft-authorization-url).

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

2. Wiring up `embedded.authenticate`

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

### Token Exchange

Calling the token endpoint is the second step in the authorization flow and usually happens in your backend if your application's Client Type is `Confidential`. Make sure to a call the [authorization endpoint](/docs/v1/workflows/authentication#1-craft-authorization-url) first to retrieve an authorization code.

If your application is using the [NextAuth](https://next-auth.js.org) provider (see the Javascript Authorization example using Automatic Invocation Type), you will not need to complete authentication with a token exchange.
