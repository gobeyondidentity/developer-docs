---
title: Embedded SDK
sidebar_position: 1
---

### Early Access

## Overview

The Flutter SDK is a holistic native wrapper around the native Android and Swift Embedded SDKs, offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through a library. This SDK supports OIDC and OAuth2.

### Sample app

:::info Live Demo
Sample apps are available to explore. Check out:

[BI SDK Flutter Repo](https://github.com/gobeyondidentity/bi-sdk-flutter)
:::


To run the Android example app

1. Run `flutter pub get` from the root of the repo
2. Run `flutter run` from the example directory or use Android Studio. Make sure an Android device is running.

To run the iOS example app

1. Run `flutter pub get` from the root of the repo
2. Run `pod install --repo-update` from `example/ios` directory
3. Run `flutter run` from the example directory or use XCode.

## Installation

### pubspec.yaml

To integrate Add the Beyond Identity Embedded SDK to your dependencies.

```dart
dependencies:
  embeddedsdk: x.y.z
```
and run an implicit `flutter pub get`

:::note
Add initialize to embeddedsdk class
:::

```dart 
await _channel.invokeMethod("initialize", {
      'clientId': clientId,
      'biometricPrompt': biometricPrompt,
      'redirectUri': redirectUri,
      'enableLogging': enableLogging
 });
```

## Registration and Recovery

If the user has never set up an account with Beyond Identity, then the user will need to complete a registration flow. If the user previously had credentials but has since been deleted and no other device has a credential, then the user should complete the recovery flow.

In either case, the end result is that the user creates a Credential on the device in question. At a high level, a Credential can be thought of as an X.509 Certificate (in fact, it’s just a wrapper on top of one). iOS Each Credential contains a public/private key pair where the private key is stored securely in the Secure Enclave. Android Each Credential contains a public/private key pair where the private key is stored securely in the Keystore. When a user sets up an account with Beyond Identity, the device in which they register creates a Credential that becomes their identity. This private key associated with this Credential can never be removed from the device in question. It is however possible to extend the Credential’s chain of trust by creating a new Credential on a different device and signing it with the private key of the first Credential. This process is covered in the Adding a New Device section.

Registration and recovery are not offered as functions in the Embedded SDK. Instead, please use the following guides to integrate registration and recovery into your application:

- [User Sign-Up Flow](/docs/integration-guides/user-sign-up-flow)
- [User Recovery Flow](/docs/integration-guides/user-recovery-flow)

## Intercepting A Redirect From A New or Recovered User

After a successful creation or recovery, the user will receive an email. When the user taps on the email link, the user will be redirected using a redirect url specified by your tenant. See [Registration Redirect URI](/docs/getting-started/account-configuration/registration-redirect-uri) for more information.

### Usage

```dart
// uri is the uri you intercept when the user clicks on their welcome email.

credential = await Embeddedsdk.registerCredentialsWithUrl(uri);
```

## Authentication

### Confidential Client

This flow only completes the authorization code flow and relies on a backend to make the token exchange. On successful completion the ` AuthorizationCode` grant is returned.

Optional` PKCE` support is available to mitigate authorization code injection. Use `Embedded.shared.createPKCE` to create one or generate your own and use the `PKCE.CodeChallenge` initializer.

Make sure to use your configured confidential client id.

### Usage

```dart
authz = await Embeddedsdk.authorize(
    "openid",
    _pkce?.codeChallenge,
);
```

### Create PKCE

### Usage

```dart
pkce = await Embeddedsdk.createPkce();
```

## Public Client

This flow authenticates and authorizes the user by completing the authorization flow and token exchange. PKCE is handled internally to mitigate against an authorization code interception attack. The scope “openid” is set internally. You do not need a backend for this flow.

On successful authentication, you’ll receive a TokenResponse containing the AccessToken and JWT idToken.

Make sure to use your configured public client id.

### Usage

```dart
token = await Embeddedsdk.authenticate();
```

## Adding a New Device

If the user already has a Credential and would like to log in with another device, the user may extend a Credential from one device to another.


## Extend a Credential
In order to add a new device, the user must first extend a Credential from a device that contains a Credential.

On a successful extend credential, you’ll receive an `ExtendCredentialStatus` indicating the extending status. The first time a token is received, the callback will fire with a status of `.started(CredentialToken)`. Every 90 seconds, the token is cycled and `.tokenUpdated(CredentialToken)` will fire with a new token. A status of `.done` indicates that a `Credential` extension completed successfully. Upon receiving a `CredentialToken`, it is up to you to display it to the user.

### Usage

```dart
Embeddedsdk.extendCredentials(List.generate(1, (index) => tenant_handle), exportUpdateCallback);
```
## cancelExtendCredentials an extendCredentials

Once an extendCredentials is started, it needs to be either completed or canceled. This is because all EmbeddedSDK functions are blocking. Since extendCredentials is a long running function, it will block all other function calls to EmbeddedSDK until you explicitly call EmbeddedSDK.cancelExtendCredentials.

### Usage

```dart
await Embeddedsdk.cancelExtendCredentials();
```

## Register a Credential
Once extendCredentials is initiated, you can handle registering the code on another device in one of two ways:

Create a TextField or TextView in which the user can enter the 9 digit code that they see on the extended device.
Initialize and capture the contents of the QR code as a String. This will also be a 9 digit code.
In either case, you’ll need to take the 9 digit code and initialize a CredentialToken to pass into the register function. A successful register will return a list of registered credentials.

```dart
await Embeddedsdk.registerCredentialsWithToken(extendCredentialsToken);
```

## Get a Credential

This will get all current credentials on the device. If no credential is found, create a user first.

:::note
Only one credential per device is currently supported. 
:::

```dart
credentials = await Embeddedsdk.getCredentials();
```

## Delete a Credential
This will remove the current credential. If no other device contains a credential to extend, then the credential will be lost unless a recovery is done. 

```dart
handle = await Embeddedsdk.deleteCredential(tenant_handle);
```
