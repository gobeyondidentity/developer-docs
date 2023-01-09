---
title: Overview
sidebar_position: 0
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-react-native/tree/main/example) for the Embedded SDK.
:::

## Installation

### Using a [bare expo](https://docs.expo.dev/bare/hello-world/) or [react-native init](https://reactnative.dev/docs/environment-setup) app.

1. Install the SDK:
```
yarn add @beyondidentity/bi-sdk-react-native
```
or
```
npm install @beyondidentity/bi-sdk-react-native
```
2. Update Native Requirements in your ios/android folders:

Please make sure your iOS project supports "minimum deployment target" 13.0 or later.

In your `ios/Podfile` set:

```sh
platform :ios, '13.0'
```

Go to your ios folder and run:

```sh
 pod install
```

Make sure your `android/build.gradle` supports minSdkVersion 26 or later

```
buildscript {
  ext {
    minSdkVersion = 26
  }
}
```

Add the following maven url to your repositories in your `android/build.gradle`

```
allprojects {
  repositories {
    maven {
      url "https://packages.beyondidentity.com/public/bi-sdk-android/maven/"
    }
  }
}
```

### Using `expo`
:::warning
This package cannot be used in "Expo Go" because [it requires custom native code](https://docsexpo.io/workflow/customizing/). However you can leverage this library with a [development build(https://docs.expo.dev/development/introduction/) or [prebuild](https://docs.expo.dev/workflowprebuild/). 
::: 

1. Install the SDK:
```
expo install @beyondidentity/bi-sdk-react-native
```

2. Add the SDK [config plugin](https://docs.expo.dev/guides/config-plugins/) to the [plugins array](https://docs.expo.dev/versions/latest/config/app/#plugins) of your app.{json,config.js,config.ts}:
```
{
  "expo": {
    "plugins": [
      ["@beyondidentity/bi-sdk-react-native"],
    ]
  }
}
```

3. Set native requirments either with [expo-build-properties](https://docs.expo.dev/versions/latest/sdk/build-properties/) or modify project [static files](https://docs.expo.dev/guides/config-plugins/#static-modification)

A. Modify the following static files

android/gradle.properties
```
android.minSdkVersion=26
```
ios/Podfile.properties.json
```
"ios.deploymentTarget": "13.0"
```

*or* 

B. Add [expo-build-properties](https://docs.expo.dev/versions/latest/sdk/build-properties/) to your app.{json,config.js,config.ts}:


```
expo install expo-build-properties
```

```
{
  "expo": {
    "plugins": [
      ["@beyondidentity/bi-sdk-react-native"],
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 26
          },
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ]
    ]
  }
}
```

4.  Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.dev/workflow/customizing/) guide.

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
