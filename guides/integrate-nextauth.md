---
title: NextAuth
sidebar_position: 6
---

import Arcade, {Clip} from '../src/components/Arcade.tsx';
import InvocationTip from '../docs/workflows/\_invocation-type-tip.mdx';
import SetupJavaScript from '/docs/workflows/_sdk-setup/_setup-javascript.mdx';

# Integrate Beyond Identity Passwordless Authentication into NextAuth

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Next application that uses NextAuth.

This guide will cover:

- How to install the JavaScript SDK
- How to configure Beyond Identity as an Identity Provider
- How to create an identity and generate a passkey
- How to authenticate with a passkey
- How to configure the OIDC NextAuth plugin

## Prerequisites

- Set up a [developer account](https://developer.beyondidentity.com/docs/v1/workflows/account-setup)

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

To set up Beyond Identity as an Identity Provider, you need to create a [Realm](https://developer.beyondidentity.com/docs/v1/workflows/realms) to hold identities and configuration. Inside that realm, you'll need to create an [Application](https://developer.beyondidentity.com/docs/v1/workflows/applications) that contains the authentication flow configuration. These can be configured in you admin console that was created for you when you signed up for a developer account.

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

- [Workflows: Applications](https://developer.beyondidentity.com/docs/v1/workflows/applications)
- [Authenticator Config](https://developer.beyondidentity.com/docs/v1/platform-overview/authenticator-config)

<Arcade clip={Clip.CreateApplication} />

Now that we have created our application, we are ready to update our values.

1. For `BeyondIdentity` _clientId_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
1. For `BeyondIdentity` _clientSecret_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
1. For `BeyondIdentity` _issuer_, copy and paste the value from Applications -> Your New Application -> External Protocol -> Issuer

## Create an Identity and generate a Universal Passkey

Once you have an application in the admin console you are ready to provising users to your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API. This guide will use the admin console. Navigate to your realm in the console and click **Identities**, then click **Add identity**.

For more information visit [Workflows: User and Group Provisioning](https://developer.beyondidentity.com/docs/v1/workflows/user-provisioning).

<Arcade clip={Clip.CreateIdentity} />

### Generate a passkey

Once you have an identity you can generate a passkey. This step can also be done either in the admin console or through an API. This guide will use the admin console. Navigate back to **Identities** and select the identity you would like to bind to a passkey. Click **Add a passkey**, select your app and the click **Proceed & send email**. The user will receive an enrollment email which they can tap on to bind a passkey to their device.

For more information visit [Workflows: Bind Passkey To User](https://developer.beyondidentity.com/docs/v1/workflows/bind-passkey).

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

Once you have one passkey bound to a device, you can use it to authenticate. For more information visit [Workflows: Authenticate with Passkey](https://developer.beyondidentity.com/docs/v1/workflows/authentication).

### Craft an Authorization URL

First you will need to craft an authorization URL. You can find the base URL in the admin console under your application, select "EXTERNAL PROTOCOL". Copy the `Authorization Endpoint` and add the following additional query parameters:

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

### Authenticate

There are two ways to authenticate depending on your Application Config's [Invocation Type](http://localhost:3000/docs/v1/platform-overview/authenticator-config#invocation-type). Invocation Type can have one of two values: [Automatic](#automatic) or [Manual](#manual).

<InvocationTip/>

#### Automatic

If "Automatic" is selected, Beyond Identity will automatically redirect to your application using the Invoke URL (the App Scheme or Univeral URL pointing to your application). The url will be validated through the Beyond Identity Embedded SDK.

```javascript
import { Auth } from "@auth/core"
import BeyondIdentity from "@auth/core/providers/beyondidentity"
import { Embedded } from '@beyondidentity/bi-sdk-js';

export default function AutomaticAuthentication() {
  const embedded = await Embedded.initialize();

  // Request
  const request = new Request("https://example.com")

  // Response
  const response = await Auth(request, {
    providers: [BeyondIdentity({ clientId: "", clientSecret: "", issuer: "" })],
  })

  // Authenticate
  const authenticate = async (url) => {
    // Display UI for user to select a passwordless passkey if there are multiple.
    const passkeys = await embedded.getPasskeys();

    if (await embedded.isAuthenticateUrl(url)) {
      // Pass url and a selected passkey ID into the Beyond Identity Embedded SDK authenticate function
      const { redirectUrl } = await embedded.authenticate(
        url,
        passkeys[0].id
      );
    }
  };

  if (response?.url) {
    authenticate(url);
  }
}
```

#### Manual

If "Manual" is selected, an authentication URL be returned to you as part of a JSON response. No redirects are needed and will not require authentication through a web service. The result is a completley silent OAuth 2.0 authentication using passkeys. Since the challenge is packaged as part of the authentication URL, following the URL will result in the same behavior as if an Invocation Type of "Automatic" were selected.

```javascript
import { Auth } from "@auth/core"
import BeyondIdentity from "@auth/core/providers/beyondidentity"
import { Embedded } from '@beyondidentity/bi-sdk-js';

export default function ManualAuthentication() {
  const embedded = await Embedded.initialize();

  // Request
  const request = new Request("https://example.com")

  // Response
  const response = await Auth(request, {
    providers: [BeyondIdentity({ clientId: "", clientSecret: "", issuer: "" })],
  })

  // Authenticate
  const authenticate = async (url) => {
    // Display UI for user to select a passwordless passkey if there are multiple.
    const passkeys = await embedded.getPasskeys();

    if (await embedded.isAuthenticateUrl(url)) {
      // Pass url and a selected passkey ID into the Beyond Identity Embedded SDK authenticate function
      const { redirectUrl } = await embedded.authenticate(
        url,
        passkeys[0].id
      );
    }
  };

  if (response?.url) {
    authenticate(url);
  }
}
```

### Token Exchange

Calling the token endpoint is the second step in the authorization flow and usually happens in your backend if your application's Client Type is `Confidential`.

Parse the `redirectUrl` returned when calling the function `Embedded.authenticate` for a `code` in the query parameters and then exchange that code for an access token.

See [Workflows: Authenticate with Passkey: Token Exchange](https://developer.beyondidentity.com/docs/v1/workflows/authentication#token-exchange) for more details.
