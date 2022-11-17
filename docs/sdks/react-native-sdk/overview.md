---
title: Overview
sidebar_position: 0
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-react-native/tree/main/example) for the Embedded SDK.
:::

## Installation via yarn or npm

```javascript
yarn add @beyondidentity/embedded-react-native
```

or

```javascript
npm i --save @beyondidentity/embedded-react-native
```

:::warning
Note that this library is not compatible with Expo projects. This is because Expo's “managed” workflow does not allow usage of React Native libraries that introduce their own native code beyond the React Native APIs and components that are available in the Expo client app. If you have an Expo app and wish to use this project, you must eject.
:::

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK. This can be done where you register your root component.

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

Embedded.initialize(
  biometricAskPrompt: string,
  allowedDomains?: string[]
): Promise<Success>;
```

You may also add a listener to log native events with `Embedded.logEventEmitter` after initializing.

#### Usage

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

Embedded.initialize("Please verify it's really you").catch(console.error);

Embedded.logEventEmitter.addListener(
  'BeyondIdentityLogger',
  (message: string) => {
    console.log(message);
  }
);
```

## Binding a Credential

The `bindCredential` function expects a URL. This can either be a binding credential link fetched directly from our public API, or a binding credential instruction that is the result of a redirection to your web application. This function should be used in conjunction with [isBindCredentialUrl](#bind-credential-url-validation) in order to determine if the URL being passed in is a valid bind credential URL.

#### Usage

```javascript
Embedded.bindCredential(
    url: string,
): Promise<BindCredentialResponse>
```

Where the response type consists of an object containing a `Credential` and an optional `postBindingRedirectURI` URL to redirect to upon succesfully binding a credential.

```javascript
interface BindCredentialResponse {
  credential: Credential;
  postBindingRedirectURI?: string;
}
```

## Authentication

The `authenticate` function expects a `URL` and a `CredentialID`. The Beyond Identity specific URL is generated during the OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

Before calling this function you will need to ask the user to select a credential that has been bound to the device. A selection view can be built in conjunction with [getCredentials](#listing-credentials).

#### Usage

```javascript
Embedded.authenticate(
    url: string,
    credentialID: string,
): Promise<AuthenticateResponse>
```

Where the response consists of an object containing a `redirectURL` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
interface AuthenticateResponse {
  redirectURL: string;
  message?: string;
}
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```javascript
if (await Embedded.isBindCredentialUrl(url)) {
  // bind the credential using `bindCredential`
}
```

### Authenticate URL Validation

This function is used to validate if a given URL is able to be used by the `authenticate` function.

```javascript
if (await Embedded.isAuthenticateUrl(url)) {
  // authenticate against a credential bound to the device
}
```

## Credential Management

### Listing Credentials

The `getCredentials` function enables you to get all credentials currently bound to the device.

```javascript
Embedded.getCredentials(): Promise<Credential[]>
```

Where the response is a list of credentials.

### Deleting a Credential

The `deleteCredential` function allows you to delete a credential given its ID.

```javascript
Embedded.deleteCredential(id: string): Promise<string>
```

Where the response is credential id.
