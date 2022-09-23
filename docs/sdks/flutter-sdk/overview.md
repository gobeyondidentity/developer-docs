---
title: Overview
sidebar_position: 0
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

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

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since flutter is not available and dart doesn't highlight at all. -->
```javascript
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