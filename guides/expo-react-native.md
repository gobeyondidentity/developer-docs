---
title: Expo React Native
sidebar_position: 6
---

import Arcade, {Clip} from '../src/components/Arcade.tsx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InvocationTip from '../docs/workflows/\_invocation-type-tip.mdx';
import RNExpoInstallation from '../docs/workflows/\_sdk-setup/\_installation-react-native-expo.mdx';

# Integrate Beyond Identity Passwordless Authentication into Expo

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a React Native application that uses Expo.

This guide will cover:

- How to install the React Native SDK
- How to configure Beyond Identity as an Identity Provider
- How to create an identity and generate a passkey
- How to authenticate with a passkey

## Prerequisites

- Set up a [developer account](https://developer.beyondidentity.com/docs/v1/workflows/account-setup)

## Install the React Native SDK

In order to use Beyond Identity functionality in your application, you will need to install the SDK. The [React Native SDK](https://github.com/gobeyondidentity/bi-sdk-react-native) provides functionality from passkey creation to passwordless authentication. A set of functions are provided to you through an `Embedded` namespace.

The React Native SDK is a wrapper around our native SDKs ([Android](https://github.com/gobeyondidentity/bi-sdk-android) and [iOS](https://github.com/gobeyondidentity/bi-sdk-swift)), so it has [custom native code](https://docs.expo.dev/workflow/customizing/). Expo Go only directly works with libraries in the Expo SDK, so to leverage the Beyond Identity React Native SDK and other libraries outside of Expo Go, you will need to either use an expo [development build](https://docs.expo.dev/development/introduction/) or a [prebuild](https://docs.expo.dev/workflow/prebuild/).

Once your application is using a development build or prebuild you are ready to install the SDK:

```bash
expo install @beyondidentity/bi-sdk-react-native
```

Add the SDK [config plugin](https://docs.expo.dev/guides/config-plugins/) to the [plugins array](https://docs.expo.dev/versions/latest/config/app/#plugins) of your app.{json,config.js,config.ts}:

```json
{
  "expo": {
    "plugins": [["@beyondidentity/bi-sdk-react-native"]]
  }
}
```

The SDK requires certain minimun native versions. You can set these requirments either with another plugin, [expo-build-properties](https://docs.expo.dev/versions/latest/sdk/build-properties/), or by modifing project [static files](https://docs.expo.dev/guides/config-plugins/#static-modification).

<RNExpoInstallation/>

## Initialize the React Native SDK

Once you've installed the SDK, initialize the SDK. The SDK will need to be initialized before you can call any of the Embedded functions. A good place to initalize this is where you register your root component. You may also add a listener to log native events with `Embedded.logEventEmitter` after initializing.

```jsx title="index.tsx"
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

Embedded.initialize(Config.biometricAskPrompt).catch(console.error);

Embedded.logEventEmitter.addListener(
  'BeyondIdentityLogger',
  (message: string) => {
    console.log(message);
  }
);

AppRegistry.registerComponent(appName, () => App);
```

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

## Create an Identity and generate a Universal Passkey

Once you have an application in the admin console you are ready to provising users to your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API. This guide will use the admin console. Navigate to your realm in the console and click **Identities**, then click **Add identity**.

For more information visit [Workflows: User and Group Provisioning](https://developer.beyondidentity.com/docs/v1/workflows/user-provisioning).

<Arcade clip={Clip.CreateIdentity} />

### Generate a passkey

Once you have an identity you can generate a passkey. This step can also be done either in the admin console or through an API. This guide will use the admin console. Navigate back to **Identities** and select the identity you would like to bind to a passkey. Click **Add a passkey**, select your app and the click **Procees & send email**. The user will receive an enrollment email which they can tap on to bind a passkey to thier device.

For more information visit [Workflows: Bind Passkey To User](https://developer.beyondidentity.com/docs/v1/workflows/bind-passkey).

<Arcade clip={Clip.CreatePasskey} />

### Bind passkey to device

Once the user taps on the enrollment email, they will be redirected to your application. Follow Expo's [deep linking guide](https://docs.expo.dev/guides/deep-linking/) and [linking to your development build](https://docs.expo.dev/guides/linking/#linking-to-your-app). You may register a scheme in your Expo config by adding a string under the scheme key.

```json title="app.json/app.config.js"
{
  "expo": {
    "scheme": "myapp"
  }
}
```

Links that launched your app can be observed using [Linking](https://docs.expo.dev/versions/latest/sdk/linking/). Intercept the link from the enrollment email. The link that is redirected to your application will take on the following form. A `/bind` path will be appended to your Invoke URL (configured in your application above) as well as several other query parameters.

```
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

Once you receive the incoming URL, pass it into the SDK to complete the binding process. You can validate the incoming URL with `isBindPasskeyUrl`. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-react-native';
import * as Linking from 'expo-linking';

export default function App() {
  const url = decodeURI(Linking.useURL());

  const isBindUrl = await Embedded.isBindPasskeyUrl(url)

  if (isBindUrl) {
    const bindResponse = await Embedded.bindPasskey(bindingLink);
    console.log(bindResponse);
  }
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

If "Automatic" is selected, Beyond Identity will automatically redirect to your application using the Invoke URL (the App Scheme or Univeral URL pointing to your application). To handle a web browser based authentication you can use Expo's [Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/).

Note that the `response` from `useAuthRequest` hook does not need to be of type 'success'. It is sufficient if it has a `url`. This is becasue the state value is stored in a JWT in the url 'request' paramater. The url will be validated through the Beyond Identity Embedded SDK.

```jsx
import * as React from 'react';
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { Button } from 'react-native';
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

export default function App() {
  // Endpoint
  const discovery = useAutoDiscovery(
    `https://auth-${REGION}.beyondidentity.com/v1/tenants/${TENANT_ID}/realms/${REALM_ID}/applications/${APPLICATION_ID}`
  );

  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${CLIENT_ID}`,
      scopes: ['openid'],
      redirectUri: makeRedirectUri({
        scheme: 'your.app',
      }),
    },
    discovery
  );

  React.useEffect(() => {
    const authenticate = async (url) => {
      // Display UI for user to select a passwordless passkey if there are multiple.
      const passkeys = await Embedded.getPasskeys();

      if (await Embedded.isAuthenticateUrl(url)) {
        // Pass url and a selected passkey ID into the Beyond Identity Embedded SDK authenticate function
        const { redirectUrl } = await Embedded.authenticate(
          url,
          passkeys[0].id
        );
      }
    };

    if (response?.url) {
      authenticate(url);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Passwordless Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
```

#### Manual

If "Manual" is selected, an authentication URL be returned to you as part of a JSON response. No redirects are needed and will not require authentication through a web service. The result is a completley silent OAuth 2.0 authentication using passkeys. Since the challenge is packaged as part of the authentication URL, following the URL will result in the same behavior as if an Invocation Type of "Automatic" were selected.

```jsx
import * as React from 'react';
import { Button } from 'react-native';
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

export default function App() {
  async function authenticate() {
    const BeyondIdentityAuthUrl = `https://auth-${REGION}.beyondidentity.com/v1/tenants/${TENANT_ID}/realms/${REALM_ID}/applications/${APPLICATION_ID}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${URI_ENCODED_REDIRECT_URI}&scope=openid&state=${STATE}&code_challenge_method=S256&code_challenge=${PKCE_CODE_CHALLENGE}`;

    let response = await fetch(BeyondIdentityAuthUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    const data = await response.json();

    // Display UI for user to select a passwordless passkey if there are multiple.
    const passkeys = await Embedded.getPasskeys();

    if (await Embedded.isAuthenticateUrl(data.authenticate_url)) {
      // Pass url and selected Passkey ID into the Beyond Identity Embedded SDK authenticate function
      const { redirectUrl } = await Embedded.authenticate(
        data.authenticate_url,
        passkeys[0].id
      );
    }
  }

  return <Button title="Passwordless Login" onPress={authenticate} />;
}
```

### Token Exchange

Calling the token endpoint is the second step in the authorization flow and usually happens in your backend if your application's Client Type is `Confidential`.

Parse the `redirectUrl` returned when calling the function `Embedded.authenticate` for a `code` in the query parameters and then exchange that code for an access token.

See [Workflows: Authenticate with Passkey: Token Exchange](https://developer.beyondidentity.com/docs/v1/workflows/authentication#token-exchange) for more details.
