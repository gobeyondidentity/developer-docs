---
title: Swift SDK
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

```swift
dependencies: [
    .package(url: "https://github.com/gobeyondidentity/bi-sdk-swift.git", from: [version])
]
```

2. Run `swift build`

### Cocoapods

Add the pod to your Podfile:

```swift 
pod 'BeyondIdentityEmbedded'
```

And then run:
```swift 
pod install
```

After installing import with
```swift
import BeyondIdentityEmbedded
```

## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

```swift
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

```swift
Embedded.shared.bindCredential(
    url: URL,
    callback: @escaping(Result<BindCredentialResponse, BISDKError>) -> Void
)
```

Where the response type consists of an object containing a `Credential` and an optional `postBindingRedirectURI` URL to redirect to upon succesfully binding a credential.

```swift
struct BindCredentialResponse: Codable, Equatable {
    let credential: AuthNCredential
    let postBindingRedirectURI: URL?
}
```

## Authentication

The `authenticate` function expects a URL. This Beyond Identity specific URL is generated during on OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. You will be required to select from one of the credentials bound to your device if more than one credential belongs to a single Realm. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

#### Usage

```swift
Embedded.shared.authenticate(
    url: URL,
    onSelectCredential: @escaping ([Credential], @escaping ((CredentialID?) -> Void)) -> Void,
    callback: @escaping(Result<AuthenticateResponse, BISDKError>) -> Void
)

// Example
Embedded.shared.authenticate(url: URL(string: "some_url")!) { credentials, onSelectCredentialId in
    // Where you can perform some logic here to select a credential, or
    // present UI to a user to enable them to select a credential.
    let foundCredential = credentials.first { $0.identity.username == "some_username" }
    onSelectCredentialId(foundCredential?.id)
} callback: { result in
    // Handle result
}
```

Where the response consists of an object containing a `redirectURL` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```swift
struct BiAuthenticateResponse: Codable, Equatable {
    let redirectURL: URL
    let message: String?
}
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```swift
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

```swift
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