---
title: Overview
sidebar_position: 0
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

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