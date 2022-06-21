---
title: Overview
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

```mdx-code-block
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

<div className="video-container">
  <LiteYouTubeEmbed
    // cSpell:ignore YLmGQ IKkc
    id="YLmGQPqIKkc"
    params="autoplay=1&autohide=1&showinfo=0&rel=0"
    title="Beyond Identity Swift Embedded SDK"
    poster="maxresdefault"
    webp
  />
</div>
```

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-swift/tree/main/Example/Sources/EmbeddedExample) for the Embedded SDK.
:::


## Installation

### Swift Package Manager

**From Xcode**
1. From the Xcode `File` menu, select `Swift Packages` » `Add Package Dependency` and add the following url:
```
https://github.com/gobeyondidentity/bi-sdk-swift
```
2. Select a version and hit Next.
3. Select a the `BeyondIdentityEmbedded` target

**From Package.swift**

1. With [Swift Package Manager](https://swift.org/package-manager), add the following dependency to your `Package.swift`:

```
dependencies: [
    .package(url: "https://github.com/gobeyondidentity/bi-sdk-swift.git", from: "<<ios-sdk-embedded-version>>")
]
```
2. Run `swift build`


## Setup

First, before calling the Embedded functions, make sure to initialize the SDK. This can be called from your AppDelegate or SceneDelegate.

```swift
Embedded.initialize(
    biometricAskPrompt: viewModel.biometricAskPromptText,
    clientID: viewModel.confidentialClientID,
    redirectURI: viewModel.redirectURI,
    logger: viewModel.logger
)
```

## Registration and Recovery

If the user has never set up an account with Beyond Identity, then the user will need to complete a registration flow. If the user previously had credentials but have since been deleted and no other device has a credential, then the user should complete the recovery flow.

In either case, the end result is that the user creates a [Credential](/docs/core-concepts/credentials) on the device in question. At a high level, a Credential can be thought of as an X.509 Certificate (in fact, it’s just a wrapper on top of one). Each Credential contains a public/private key pair where the private key is stored securely in the Secure Enclave. When a user sets up an account with Beyond Identity, the device in which they register creates a Credential that becomes their identity. This private key associated with this Credential can never be removed from the device in question. It is however possible to extend the Credential’s chain of trust by creating a new Credential on a different device and signing it with the private key of the first Credential. This process is covered in the Adding a New Device section.

Registration and recovery are not offered as functions in the Embedded SDK. Instead, please use the following guides to integrate registration and recovery into your application:
- [User Sign-Up Flow](/docs/integration-guides/user-sign-up-flow)
- [User Recovery Flow](/docs/integration-guides/user-recovery-flow)

### Intercepting A Redirect From A New or Recovered User

After a successful creation or recovery, the user will receive an email. When the user taps on the email link, the user will be redirected using a redirect url specified by your tenant. See [Registration Redirect URI](/docs/getting-started/account-configuration/registration-redirect-uri) for more information.

Once the user is redirected, intercept the redirect in either your AppDelegate or SceneDelegate.

:::warning 
Custom Schemes offer a potential attack as iOS allows any URL Scheme to be claimed by multiple apps and thus malicious apps can hijack sensitive data. Use a Universal Link for your redirect url.
:::


See Apple’s documentation on Supporting Universal Links In Your App for all options on where you may want to intercept the redirect url.

#### Usage

[Embedded.shared.registerCredentials](/sdk/swift/embedded-sdk/Embedded/#embedded.registercredentials(_:callback:))

```swift
Embedded.shared.registerCredentials(url) { result in
    switch result {
    case let .success(response):
        print(response)
    case let .failure(error):
        print(error)
    }
}
```


## Authentication

### Confidential Client

This flow only completes the authorization code flow and relies on a backend to make the token exchange. On successful completion the `AuthorizationCode` grant is returned.

Optional `PKCE` support is available to mitigate authorization code injection. Use `Embedded.shared.createPKCE` to create one or generate your own and use the `PKCE.CodeChallenge` initializer.

Make sure to use your configured confidential clientID in initialization.

#### Usage

[Embedded.shared.authorize](/sdk/swift/embedded-sdk/Embedded/#embedded.authorize(pkcechallenge:scope:callback:))

```swift
Embedded.shared.authorize(
    pkceChallenge: PKCE.CodeChallenge?,
    scope: String,
    callback: @escaping(Result<AuthorizationCode, BISDKError>) -> Void
) { result in
    switch result {
    case let .success(code):
        print(code)
    case let .failure(error):
        print(error)
    }
}
```

### Public Client

This flow authenticates and authorizes the user by completing the authorization flow and token exchange. `PKCE` is handled internally to mitigate against an authorization code interception attack. The scope “openid” is set internally. You do not need a backend for this flow.

On successful authentication, you’ll receive a `TokenResponse` containing the `AccessToken` and JWT `idToken`.

To use OIDC client connections for Public Client authentication, please ensure the Token Authentication Method is set to `none` and that you use your configured public clientID in initialization. 

#### Usage

[Embedded.shared.authenticate](/sdk/swift/embedded-sdk/Embedded/#embedded.authenticate(callback:))

```swift
Embedded.shared.authenticate { result in
    switch result {
    case let .success(tokenResponse):
        print(tokenResponse.description)
    case let .failure(error):
        print(error.localizedDescription)
    }
}
```

## Adding a new device

If the user already has a `Credential` and would like to log in with another device, the user may extend a `Credential` from one device to another.

### Extend a Credential

In order to add a new device, the user must first export a `Credential` from a device that contains a `Credential`. In order to initiate an export, an authentication in the form of a passcode/TouchID/FaceID will be required (assuming the device is locked by one of these). In order to use FaceID, please add NSFaceIDUsageDescription to your `Info.plist`.

On a successful export, you’ll receive an `ExtendCredentialsStatus` indicating the extending status. The first time a token is received, the callback will fire with a status of `.started(CredentialToken, QRCode?)`. Every 90 seconds, the token is cycled and `.tokenUpdated(CredentialToken, QRCode?)` will fire with a new token. A status of `.done` indicates that a `Credential` extension completed successfully. Upon receiving a `CredentialToken` and/or `QRCode`, it is up to you to display one or both to the user.

#### Usage

[Embedded.shared.extendCredentials](/api-docs/sdk/swift/embedded-sdk/Embedded/#embedded.extendcredentials(handles:callback:))

```swift
Embedded.shared.extendCredentials(handles: [Credential.handle]) { result in
    switch result {
    case let .success(extendStatus):
        switch extendStatus {
        case let .started(token, qrcode):
        case let .tokenUpdated(token, qrcode):
            // Display token
            print(token)

            if let qrcode = qrcode {
                // And/Or Display the QRCode
                let image = UIImageView(image: qrcode)
            }
        case .done:
            // extension is complete
        }
    case let .failure(error):
        print(error)
    }
}
```

### Cancel Extending Credentials
Once an extension is started, it needs to be either completed or canceled. This is because all EmbeddedSDK functions are blocking. Since `extendCredentials` is a long running function, it will block all other function calls to EmbeddedSDK until you explicitly call `EmbeddedSDK.cancelExtendCredentials`.

#### Usage

[Embedded.shared.cancelExtendCredentials](/sdk/swift/embedded-sdk/Embedded/#embedded.cancelextendcredentials(callback:))

```swift
Embedded.shared.cancelExtendCredentials() { result in
    switch result {
        case .success:
            // Cancel was successful
        case let .failure(error):
            print(error)
    }
}
```

## Import a Credential

Once a credential extension is initiated, you can handle importing the code on another device in one of two ways:

1. Create a TextField or TextView in which the user can enter the 9 digit code that they see on the exporting device.
2. Initialize an AVCaptureSession and capture the contents of the QR code as a String. This will also be a 9 digit code.

In either case, you’ll need to take the 9 digit code and initialize a `CredentialToken` to pass into the import function. A successful import will return a list of imported credentials.

#### Usage 

[Embedded.shared.registerCredentials](/sdk/swift/embedded-sdk/Embedded/#embedded.registercredentials(token:callback:))

```swift
Embedded.shared.registerCredentials(token: tokenToImport) { result in
    switch result {
    case let .success(credentials):
        print(credentials)
    case let .failure(error):
        print(error)
    }
}
```

## Get a Credential

This will get all current credentials on the device. If no credential is found, create a user first.
     - Note: Only one credential per device is currently supported. 

```swift
Embedded.shared.getCredentials { result in
    switch result {
    case let .success(credentials):
        guard !credentials.isEmpty else {
            print(credentials)
            return
        }
    case let .failure(error):
        print(error)
    }
}
```

## Delete a Credential

This will remove the current credential. If no other device contains a credential to extend, then the credential will be lost unless a recovery is done.

```swift
Embedded.shared.deleteCredential(for: credential.handle) { result in
    switch result {
    case let .success(credential):
         print(credential)
        }
    case let .failure(error):
        print(error)
    }
}
```