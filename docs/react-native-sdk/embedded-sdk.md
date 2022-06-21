---
title: Embedded SDK
sidebar_position: 1
---

### Early Access

## Overview

The React Native SDK is a wrapper around our Native Android and Swift Embedded SDKs, which allows you to embedded the Passwordless experience into your app. A set of functions are provided to you through this library. This SDK supports OIDC and OAuth2 and users will not need to download the Beyond Identity Authenticator.

### Sample app

:::info Live Demo
Sample apps are available to explore. Check out:

[BI SDK React Native Repo](https://github.com/gobeyondidentity/bi-sdk-react-native)
:::

## Installation

Install the React Native Embedded SDK:
```
yarn add @beyondidentity/embedded-react-native
```
or
```
npm i --save @beyondidentity/embedded-react-native
```

Note that this library is not currently compatible with Expo projects. This is because Expo's “managed” workflow does not allow usage of React Native libraries that introduce their own native code beyond the React Native APIs and components that are available in the Expo client app. If you have an Expo app and wish to use this project, make sure to `eject`.

### Update Native:

Make sure your `ios/Podfile` supports iOS 12 or later

```
platform :ios, '12.0'
```

Go to your ios folder and run:

```
pod install
```

Make sure your `android/build.gradle` supports minSdkVersion 28 or later

```typescript
buildscript {
  ext {
    minSdkVersion = 28
  }
}
```
Add the following maven url to your repositories in your `android/build.gradle`

```typescript
allprojects {
  repositories {
    maven {
      url "https://packages.beyondidentity.com/public/bi-sdk-android/maven/"
    }
  }
}
```

## Set Up

First, before calling the Embedded functions, you must initialize the SDK. This might be called where you register your app root components.

If you wish to display SDK logs, you can also set up the `logEventEmitter` here as well. 

```
import { AppRegistry } from 'react-native';
import { Embedded } from '@beyondidentity/embedded-react-native';

Embedded.initialize(
  "Your biometrics ask prompt",
  Config.clientID,
  Config.redirectURI
);

Embedded.logEventEmitter.addListener('Logger', (message: string) => {
  console.log(message);
});

AppRegistry.registerComponent(appName, () => App);
```

## Registration and Recovery


If the user has never set up an account with Beyond Identity, then the user will need to complete a registration flow. If the user previously had credentials but has since been deleted and no other device has a credential, then the user should complete the recovery flow.

In either case, the end result is that the user creates a Credential on the device in question. At a high level, a Credential can be thought of as an X.509 Certificate (in fact, it’s just a wrapper on top of one). Each Credential contains a public/private key pair where the private key is stored securely in the Secure Enclave (iOS) or Keystore (Android). When a user sets up an account with Beyond Identity, the device in which they register creates a Credential that becomes their identity. This private key associated with this Credential can never be removed from the device in question. It is however possible to extend the Credential’s chain of trust by creating a new Credential on a different device and signing it with the private key of the first Credential. This process is covered in the Adding a New Device section.

Registration and recovery are not offered as functions in the Embedded SDK. Instead, please use the following guides to integrate registration and recovery into your application:

- [User Sign-Up Flow](/docs/integration-guides/user-sign-up-flow)
- [User Recovery Flow](/docs/integration-guides/user-recovery-flow)

## Intercepting A Redirect From A New or Recovered User

After a successful creation or recovery, the user will receive an email. When the user taps on the email link, the user will be redirected using a redirect url specified by your tenant. See [Registration Redirect URI] (doc:registration-redirect-uri) for more information.

### Usage

```
import { Embedded } from '@beyondidentity/embedded-react-native';

   try {
      const credential = await Embedded.registerCredentialsWithUrl(
          linkedURL
      );
     console.log(credential.name);
   } catch (e) {
     if (e instanceof Error) {
     console.log(e.message);
     }
   }
```

## Authentication

### Confidential Client

This flow only completes the authorization code flow and relies on a backend to make the token exchange. On successful completion the ` AuthorizationCode` grant is returned.

Optional `PKCE` support is available to mitigate authorization code injection. Use `Embedded.createPKCE` to create one or generate your own and use the `PKCEChallenge` initializer.

Make sure to use your configured confidential client id.


```
 try {
    const code = await Embedded.authorize(
      {
      challenge: pkce.codeChallenge,
      method: pkce.codeChallengeMethod,
      },
      'openid'
   );
     console.log(code);
  } catch (e) {
    if (e instanceof Error) {
    console.log(e.message as string);
  }
}
```

### Create PKCE

```
try {
    const pkce = await Embedded.createPKCE();
    console.log(pkce);
 } catch (e) {
    if (e instanceof Error) {
    console.log(e.message);
 }
}
```

### Public Client

This flow authenticates and authorizes the user by completing the authorization flow and token exchange. PKCE is handled internally to mitigate against an authorization code interception attack. The scope “openid” is set internally. You do not need a backend for this flow.

On successful authentication, you’ll receive a `TokenResponse` containing the accessToken and JWT idToken.

Make sure to use your configured public client id.

```
try {
    const response = await Embedded.authenticate();
    console.log(response);
   } catch (e) {
      if (e instanceof Error) {
      console.log(e.message as string);
  }
}
```

## Adding a New Device

If the user already has a Credential and would like to log in with another device, the user may extend a Credential from one device to another.

## Extend a Credential

In order to add a new device, the user must first extend a Credential from a device that contains a Credential.

Subscribe to the `extendCredentialsEventEmitter` to get the status of `Embedded.extendCredentials`. The first time a token is received, the callback will fire with a status of `ExtendTokenReceived`. Every 90 seconds, the token is cycled and will fire a new event with a new token. A status of `ExtendCredentialCompleted` indicates that a `Credential` extension completed successfully.

### Usage

```
try {
    Embedded.extendCredentials([credentials[0].handle]);
    subscribeToExportListeners((token) => {
    console.log(token);
   });
  } catch (e) {
     if (e instanceof Error) {
     console.log(e.message as string);
  }
}

function subscribeToExportListeners(callback: (result: string) => void) {
  Embedded.extendCredentialsEventEmitter.addListener(
  'ExtendCredentialAborted',
  callback
 );
  Embedded.extendCredentialsEventEmitter.addListener(
  'ExtendTokenReceived',
  callback
 );
  Embedded.extendCredentialsEventEmitter.addListener(
  'ExtendCredentialCompleted',
  callback
 );
 Embedded.extendCredentialsEventEmitter.addListener('ExtendError', callback);
}
```

## Cancel extending credentials

Once an `extendCredentials` is started, it needs to be either completed or canceled. This is because all EmbeddedSDK functions are blocking. Since extendCredentials is a long running function, it will block all other function calls to the EmbeddedSDK until you explicitly call `Embedded.cancelExtendCredentials`.

### Usage

```
try {
     await Embedded.cancelExtendCredentials();
     unsubscribeFromExportListeners();
   } catch (e) {
      if (e instanceof Error) {
      console.log(e.message as string);
   }
 }

function unsubscribeFromExportListeners() {
  Embedded.extendCredentialsEventEmitter.removeListener(
  'ExtendCredentialAborted',
  (message) => {
   console.log(message);
  }
 );
 Embedded.extendCredentialsEventEmitter.removeListener(
 'ExtendTokenReceived',
 (message) => {
  console.log(message);
}
);
Embedded.extendCredentialsEventEmitter.removeListener(
'ExtendCredentialCompleted',
 (message) => {
  console.log(message);
 }
 );
Embedded.extendCredentialsEventEmitter.removeListener(
'ExtendError',
 (message) => {
 console.log(message);
 }
 );
}
```

## Register a Credential

Once extendCredentials is initiated, you can handle registering the code on another device.

Create a TextInput in which the user can enter the 9 digit code that they see on the extended device. A successful register will return a list of registered credentials.


```
try {
     const credentials = await Embedded.registerCredentialsWithToken(
     tokenToImport
    );
    console.log(credentials);
 } catch (e) {
    if (e instanceof Error) {
    console.log(e.message as string);
  }
}
```

## Get a Credential

This will get all current credentials on the device. If no credential is found, create a user first.

```
try {
   const credentials = await Embedded.getCredentials();
    if (credentials.length === 0) {
      console.log(credentials);
} catch (e) {
   if (e instanceof Error) {
   console.log(e.message as string);
  }
}
```

## Delete a Credential

This will remove the current credential. If no other device contains a credential to extend, then the credential will be lost unless a recovery is done. 

```try {
     const handle = await Embedded.deleteCredential(
     credentials[0].handle
    );
     console.log(handle);
   } catch (e) {
     if (e instanceof Error) {
     console.log(e.message as string);
   }
}
```






