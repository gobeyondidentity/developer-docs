---
title: SDK Setup
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

<Tabs>
<TabItem value="android" label="Android">

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-android/tree/main/app) for the Embedded SDK.
:::

## Installation

### Gradle

To enable the retrieval of Cloudsmith hosted packages via Gradle, we need to add the Cloudsmith repository to
the `root/build.gradle` file.

```groovy
repositories {
    maven {
        url "https://packages.beyondidentity.com/public/bi-sdk-android/maven/"
    }
}
```

After the repository is added, we can specify the Beyond Identity dependencies.

```groovy
dependencies {
    implementation 'com.beyondidentity.android.sdk:embedded:[version]'
}
```

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since kt/kotlin is not available and java doesn't highlight at all. -->
```javascript
import com.beyondidentity.embedded.sdk.EmbeddedSdk

EmbeddedSdk.init(
    app: Application,
    keyguardPrompt: (((allow: Boolean, exception: Exception?) -> Unit) -> Unit)?,
    logger: (String) -> Unit,
    biometricAskPrompt: String, /* Optional */
    allowedDomains: List<String>?, /* Optional */
)
```

## Binding a Credential

The `bindCredential` function expects a URL. This can either be a binding credential link fetched directly from our public API, or a binding credential instruction that is the result of a redirection to your web application. This function should be used in conjunction with [isBindCredentialUrl](#bind-credential-url-validation) in order to determine if the URL being passed in is a valid bind credential URL.

#### Usage

```javascript
EmbeddedSdk.bindCredential(
    url: String,
) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

Where the response type consists of an object containing a `Credential` and an optional `postBindingRedirectUri` URL to redirect to upon succesfully binding a credential.

```javascript
data class BindCredentialResponse(
    val credential: Credential,
    val postBindingRedirectUri: String?,
)
```

## Authentication

The `authenticate` function expects a `URL` and a `CredentialID`. The Beyond Identity specific URL is generated during the OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

Before calling this function you will need to ask the user to select a credential that has been bound to the device. A selection view can be built in conjunction with [getCredentials](#listing-credentials).

#### Usage

```javascript
EmbeddedSdk.authenticate(
    url: String,
    credentialId: CredentialID,
) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

Where the response consists of an object containing a `redirectUrl` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
data class AuthenticateResponse(
    val redirectUrl: String?,
    val message: String?,
)
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```javascript
if (EmbeddedSdk.isBindCredentialUrl(url)) {
    // bind the credential using `bindCredential`
}
```

### Authenticate URL Validation

This function is used to validate if a given URL is able to be used by the `authenticate` function.

```javascript
if (EmbeddedSdk.isAuthenticateUrl(url)) {
    // authenticate against a credential bound to the device
}
```

## Credential Management

### Listing Credentials

The `getCredentials` function enables you to get all credentials currently bound to the device.

```javascript
EmbeddedSdk.getCredentials() { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

Where the response is a `List<Credential>`.

### Deleting a Credential

The `deleteCredential` function allows you to delete a credential given its ID.

```javascript
EmbeddedSdk.deleteCredential(
    id: String,
) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

</TabItem>
<TabItem value="ios" label="iOS">

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-swift/tree/main/Example) for the Embedded SDK.
:::

## Installation

### Swift Package Manager

#### From Xcode

1. From the Xcode `File` menu, select `Add Packages` and add the following url:

```
https://github.com/gobeyondidentity/bi-sdk-swift
```

2. Select a version and hit Next.
3. Select a target matching the SDK you wish to use.

#### From Package.swift

1. With [Swift Package Manager](https://swift.org/package-manager),
   add the following `dependency` to your `Package.swift`:

```javascript
dependencies: [
    .package(url: "https://github.com/gobeyondidentity/bi-sdk-swift.git", from: [version])
]
```

2. Run `swift build`

### Cocoapods

Add the pod to your Podfile:

```javascript
pod 'BeyondIdentityEmbedded'
```

And then run:
```javascript
pod install
```

After installing import with
```javascript
import BeyondIdentityEmbedded
```

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since swift doesn't highlight at all. -->
```javascript
import BeyondIdentityEmbedded

Embedded.initialize(
    allowedDomains: [String] = ["beyondidentity.com"],
    biometricAskPrompt: String,
    logger: ((OSLogType, String) -> Void)? = nil,
    callback: @escaping(Result<Void, BISDKError>) -> Void
)
```

## Binding a Credential

The `bindCredential` function expects a URL. This can either be a binding credential link fetched directly from our public API, or a binding credential instruction that is the result of a redirection to your web application. This function should be used in conjunction with [isBindCredentialUrl](#bind-credential-url-validation) in order to determine if the URL being passed in is a valid bind credential URL.

#### Usage

```javascript
Embedded.shared.bindCredential(
    url: URL,
    callback: @escaping(Result<BindCredentialResponse, BISDKError>) -> Void
)
```

Where the response type consists of an object containing a `Credential` and an optional `postBindingRedirectURI` URL to redirect to upon succesfully binding a credential.

```javascript
struct BindCredentialResponse: Codable, Equatable {
    let credential: Credential
    let postBindingRedirectURI: URL?
}
```

## Authentication

The `authenticate` function expects a `URL` and a `CredentialID`. The Beyond Identity specific URL is generated during the OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

Before calling this function you will need to ask the user to select a credential that has been bound to the device. A selection view can be built in conjunction with [getCredentials](#listing-credentials). 

#### Usage

```javascript
Embedded.shared.authenticate(
    url: URL,
    credentialID: CredentialID,
    callback: @escaping(Result<AuthenticateResponse, BISDKError>) -> Void
)
```

Where the response consists of an object containing a `redirectURL` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
struct AuthenticateResponse: Codable, Equatable {
    let redirectURL: URL
    let message: String?
}
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```javascript
if (Embedded.shared.isBindCredentialUrl(url)) {
    // bind the credential using `bindCredential`
}
```

### Authenticate URL Validation

This function is used to validate if a given URL is able to be used by the `authenticate` function.

```javascript
if (Embedded.shared.isAuthenticateUrl(url)) {
    // authenticate against a credential bound to the device
}
```

## Credential Management

### Listing Credentials

The `getCredentials` function enables you to get all credentials currently bound to the device.

```javascript
Embedded.shared.getCredentials(
    callback: @escaping (Result<[Credential], BISDKError>) -> Void
)
```

Where the response is a `[Credential]`.

### Deleting a Credential

The `deleteCredential` function allows you to delete a credential given its ID.

```javascript
Embedded.shared.deleteCredential(
    for id: CredentialID,
    callback: @escaping (Result<(), BISDKError>) -> Void
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-js/tree/main/example) for the Embedded SDK.
:::


## Installation

```
yarn add @beyondidentity/bi-sdk-js
```
or
```
npm install @beyondidentity/bi-sdk-js
```

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-js';

const embedded = await Embedded.initialize();
```

## Binding a Credential

The `bindCredential` function expects a URL. This can either be a binding credential link fetched directly from our public API, or a binding credential instruction that is the result of a redirection to your web application. This function should be used in conjunction with [isBindCredentialUrl](#bind-credential-url-validation) in order to determine if the URL being passed in is a valid bind credential URL.

#### Usage

```javascript
const bindCredentialResponse = await embedded.bindCredential(url);
```

Where the response type consists of an object containing a `Credential` and an optional `postBindRedirect` URL to redirect to upon succesfully binding a credential.

```javascript
{
    credential: Credential;
    postBindRedirect?: string;
}
```

## Authentication

The `authenticate` function expects a URL. This Beyond Identity specific URL is generated during on OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. You will be required to select from one of the credentials bound to your device if more than one credential belongs to a single Realm. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

Before calling this function you will need to ask the user to select a credential that has been bound to the device. A selection view can be built in conjunction with [getCredentials](#listing-credentials).

#### Usage

```javascript
const authenticateResponse = await embedded.authenticate(url, credentialID);
```

Where the response consists of an object containing a `redirectURL` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
{
    redirectURL: string;
    message?: string;
}
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```javascript
if (embedded.isBindCredentialUrl(url)) {
    // bind the credential using `bindCredential`
}
```

### Authenticate URL Validation

This function is used to validate if a given URL is able to be used by the `authenticate` function.

```javascript
if (embedded.isAuthenticateUrl(url)) {
    // authenticate against a credential bound to the device
}
```

## Credential Management

### Listing Credentials

The `getCredentials` function enables you to get all credentials currently bound to the device.

```javascript
const allCredentials = await embedded.getCredentials();
```

Where the response is a `[Credential]`.

### Deleting a Credential

The `deleteCredential` function allows you to delete a credential given its ID.

```javascript
await embedded.deleteCredential(credential.id);
```

</TabItem>
<TabItem value="flutter" label="Flutter">

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-flutter/tree/main/example) for the Embedded SDK.
:::

## Installation

### Pub.Dev

Add the Beyond Identity Embedded SDK to your dependencies

```
dependencies:
  bi_sdk_flutter: x.y.z
```

and run an implicit `flutter pub get`.

### Update Android

Please make sure your `android/build.gradle` supports `minSdkVersion` 26 or later.

```
buildscript {
  ext {
    minSdkVersion = 26
  }
}
```

### Update iOS

Please make sure your project supports "minimum deployment target" 13.0 or later.
In your `ios/Podfile` set:

```sh
platform :ios, '13.0'
```

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since flutter is not available and dart doesn't highlight at all. -->
```javascript
import 'package:bi_sdk_flutter/embeddedsdk.dart';

Embeddedsdk.initialize(
    String biometricPrompt,
    bool enableLogging,
    List<String>? allowedDomains, /* Optional */
)
```

## Binding a Credential

The `bindCredential` function expects a URL. This can either be a binding credential link fetched directly from our public API, or a binding credential instruction that is the result of a redirection to your web application. This function should be used in conjunction with [isBindCredentialUrl](#bind-credential-url-validation) in order to determine if the URL being passed in is a valid bind credential URL.

#### Usage

```javascript
await Embeddedsdk.bindCredential(
    String url,
)
```

Where the response type consists of an object containing a `Credential` and an optional `postBindingRedirectUri` URL to redirect to upon succesfully binding a credential.

```javascript
class BindCredentialResponse(
    Credential credential,
    String postBindingRedirectUri,
)
```

## Authentication

The `authenticate` function expects a `URL` and a `CredentialID`. The Beyond Identity specific URL is generated during on OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

Before calling this function you will need to ask the user to select a credential that has been bound to the device. A selection view can be built in conjunction with [getCredentials](#listing-credentials).

#### Usage

```javascript
await Embeddedsdk.authenticate(
    String url,
    String credentialId,
)
```

Where the response consists of an object containing a `redirectUrl` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
class AuthenticateResponse(
    String redirectUrl,
    String message,
)
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```javascript
if (await Embeddedsdk.isBindCredentialUrl(url)) {
    // bind the credential using `bindCredential`
}
```

### Authenticate URL Validation

This function is used to validate if a given URL is able to be used by the `authenticate` function.

```javascript
if (await Embeddedsdk.isAuthenticateUrl(url)) {
    // authenticate against a credential bound to the device
}
```

## Credential Management

### Listing Credentials

The `getCredentials` function enables you to get all credentials currently bound to the device.

```javascript
await Embeddedsdk.getCredentials()
```

Where the response is a `List<Credential>`.

### Deleting a Credential

The `deleteCredential` function allows you to delete a credential given its ID.

```javascript
await Embeddedsdk.deleteCredential(
    String id,
)
```

</TabItem>
<TabItem value="reactnative" label="React Native">

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

</TabItem>
</Tabs>
