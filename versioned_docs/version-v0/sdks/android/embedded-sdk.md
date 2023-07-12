---
title: "Overview"
---

# Overview

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the EmbeddedSdk singleton. This SDK supports OIDC and OAuth2.

```mdx-code-block
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

<div className="video-container">
  <LiteYouTubeEmbed
    // cSpell:ignore LcgjA Z30M
    id="LcgjAsnZ30M"
    params="autoplay=1&autohide=1&showinfo=0&rel=0"
    title="Beyond Identity Swift Embedded SDK"
    poster="maxresdefault"
    webp
  />
</div>
```

## Sample App

:::note 
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-android) for the Embedded SDK.
:::

## Installation

**Gradle**
To enable the retrieval of Cloudsmith hosted packages via Gradle, we need to add the Cloudsmith repository to the `root/build.gradle` file.

```java
repositories {
    maven {
        url "https://packages.beyondidentity.com/public/bi-sdk-android/maven/"
    }
}
```

After the repository is added, we can specify the Beyond Identity dependencies.
```java
dependencies {
    implementation 'com.beyondidentity.android.sdk:embedded:<<android-sdk-embedded-version>>'
}
```

## Registration and Recovery

If the user has never set up an account with Beyond Identity, then the user will need to complete a registration flow. If the user previously had credentials but have since been deleted and no other device has a credential, then the user should complete the recovery flow.

In either case, the end result is that the user creates a Credential on the device in question. At a high level, a Credential can be thought of as an X.509 Certificate (in fact, it’s just a wrapper on top of one). Each Credential contains a public/private key pair where the private key is stored securely in the Keystore. When a user sets up an account with Beyond Identity, the device in which they register creates A Credential that becomes their identity. This private key associated with this Credential can never be removed from the device in question. It is however possible to extend the Credential’s chain of trust by creating a new Credential on a different device and signing it with the private key of the first Credential. This process is covered in the Adding a New Device section.

Registration and recovery are not offered as functions in the Embedded SDK. Instead, please use the following guides to integrate registration and recovery into your application:
- [User Sign-up Flow](../../integration-guides/user-sign-up-flow.md)
- [User Recovery Flow](../../integration-guides/user-recovery-flow.md)

### Intercepting A Redirect From A New or Recovered User

After a successful creation or recovery, the user will receive an email. When the user taps on the email link, the user will be redirected using a `redirect url` specified by your tenant. Once the user is redirected, intercept the redirect with `<intent-filter>`.

See [Registration Redirect URI](../../getting-started/registration-redirect-uri.md) for more information.

:::warning
Deep Links offer a potential attack as Android allows any URL Scheme to be claimed by multiple apps and thus malicious apps can hijack sensitive data. Use a App Links for your redirect url.
:::

#### Usage

```
EmbeddedSdk.registerCredentialsWithUrl(url: String) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

## Authentication

The Embedded SDK supports a Confidential and/or a Public client authentication flow.

It's important to note the either flow may return an error "credential not found". This means the user either needs to Register, Recover, or Add a new device a credential from another device.

### Confidential Client

This flow only completes the authorization code flow and relies on a backend to make the token exchange. On successful completion the `AuthorizationCode` grant is returned.

Optional PkceResponse support is available to mitigate authorization code injection. Use EmbeddedSdk.createPkce to create one.

#### Usage

```
EmbeddedSdk.authorize(
    clientId: String,
    redirectUri: String,
    pkceS256CodeChallenge: String?,
    scope: "openid"
) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

### Public Client
This flow authenticates and authorizes the user by completing the authorization flow and token exchange. PkceResponse is handled internally to mitigate against an authorization code interception attack. The scope `openid` is set internally. You do not need a backend for this flow.

On successful authentication, you'll receive a TokenResponse containing the `accessToken` and JWT `idToken`.

#### Usage

```
EmbeddedSdk.authenticate(
    clientId: String,
    redirectUri: String
) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

## Adding a New Device

If the user already has a Credential and would like to log in with another device, the user may extend a Credential from one device to another.

## Extend a Credential
In order to add a new device, the user must first extend a Credential from a device that contains a Credential. In order to initiate an extend, authentication in the form of a pin/biometric will be required.

On a successful extend, you'll receive updates through ExportCredentialListener indicating the export status. ExportProfileListener.onUpdate will send rendezvousToken and rendezvousTokenBitmap ( QR code generated from the rendezvousToken) to display to the user. The user will either use the rendezvousToken to import on another device or scan the rendezvousTokenBitmap QR code. A new token will be cycled every 90s. The onFinish indicates that extend is complete.

### Usage

```
EmbeddedSdk.extendCredentials(
    credentialHandles = listOf("sdk-demo"),
    listener: ExportProfileListener,
) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

## Cancel an Extend
Once extendCredentials is started, it needs to be either completed or canceled. This is because all EmbeddedSdk functions are blocking. Since extend is a long-running function, it will block all other function calls to EmbeddedSdk until you explicitly call `EmbeddedSdk.cancelExtendCredentials`.

### Usage

```
EmbeddedSdk.cancelExtendCredentials() { result ->
    result.onSuccess { }
    result.onFailure { }
}

```

## Register Credential With Token
Once the user had successfully exported a Credential, the user may either scan the `rendezvousTokenBitmap` or enter the provided `rendezvousToken` into their other device. If a QRCode is scanned, then the `CredentialToken` will need to be extracted to pass to the import function. A successful import will return a list of imported credentials.

### Usage

```
EmbeddedSdk.registerCredentialsWithToken(token: String) { result ->
    result.onSuccess { }
    result.onFailure { }
}
```

## Get a Credential

This will get all current credentials on the device. If no credential is found, create a user first.
        - Note: Only one credential per device is currently supported.

```
EmbeddedSdk.getCredentials { result ->
    result.onSuccess { credList ->
        if (credList.isNotEmpty()) {
            print(credList)
        }
      }
      result.onFailure {
          print("something_went_wrong")
      }
    }
```

## Delete a Credential

This will remove the current credential. If no other device contains a credential to extend, then the credential will be lost unless a recovery is done. 


```
 EmbeddedSdk.deleteCredential(handle) { result ->
     result.onSuccess { }
     result.onFailure { }
 }

 ```

 ## Java Compatibility

 The Android Beyond Identity SDKs currently use `kotlin.Result` which is not truly compatible with Java code.
In Java, you can use `toJavaResult` to map a `kotlin.Result` to a `JavaResult`:


```

EmbeddedSdk.createPkce(pkceResponse -> {
    // Map kotlin.Result to JavaResult
    JavaResult<PkceResponse> pkceJava = JavaUtils.toJavaResult(pkceResponse);

    // Use JavaResult.type to switch on JavaResult.SUCCESS or case JavaResult.ERROR
    switch (pkceJava.getType()) {
        case JavaResult.SUCCESS: {
            Timber.d(pkceJava.getData().toString());
        }
        case JavaResult.FAILURE: {
            Timber.e(pkceJava.getError());
        }
    }

    return Unit.INSTANCE;
});

```

