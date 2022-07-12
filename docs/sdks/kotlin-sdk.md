---
title: Kotlin SDK
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

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

The `authenticate` function expects a URL. This Beyond Identity specific URL is generated during on OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. You will be required to select from one of the credentials bound to your device if more than one credential belongs to a single Realm. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

#### Usage

```javascript
EmbeddedSdk.authenticate(
    url: String,
    onSelectCredential: (List<Credential>, ((CredentialID?) -> Unit)) -> Unit,
) { result ->
    result.onSuccess { }
    result.onFailure { }
}

// Example
EmbeddedSdk.authenticate("some_url", { credentials, onSelectCredentialId ->
    // Where you can perform some logic here to select a credential, or
    // present UI to a user to enable them to select a credential.
    val foundCredential = credentials.find { it.identity.username == "some_username" }
    onSelectCredentialId(foundCredential?.id)
})
```

Where the response consists of an object containing a `redirectUrl` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
data class BiAuthenticateResponse(
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