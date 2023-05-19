---
title: Firebase
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SetupJavaScript from '/docs/workflows/_sdk-setup/_setup-javascript.mdx';
import SetupKotlin from '/docs/workflows/_sdk-setup/_setup-kotlin.mdx';
import SetupSwift from '/docs/workflows/_sdk-setup/_setup-swift.mdx';
import Arcade, {Clip} from '/src/components/Arcade.tsx';

# Integrate Beyond Identity Passwordless Authentication with Firebase Authentication

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for an application that uses [Firebase](https://firebase.google.com/docs/auth).

This guide will cover:

- How to configure Beyond Identity as an Identity Provider
- How to create an identity and generate a passkey
- How to authenticate with a passkey
- How to configure the OpenID Connect plugin

## Prerequisites

- Set up a [developer account](/docs/v1/workflows/account-setup)

## Firebase

- [Authenticate Using OpenID Connect on Android](https://firebase.google.com/docs/auth/android/openid-connect)
- [Authenticate Using OpenID Connect on Apple platforms](https://firebase.google.com/docs/auth/ios/openid-connect)
- [Authenticate Using OpenID Connect in web apps](https://firebase.google.com/docs/auth/web/openid-connect).

## Install the SDKs

### Install the Firebase Authentication SDK

In order to authenticate with Beyond Identity with Firebase Authentication, we need to use the custom OpenID Connect provider, which is supported on [iOS+](https://firebase.google.com/docs/auth/ios/openid-connect), [Android](https://firebase.google.com/docs/auth/android/openid-connect), and [Web](https://firebase.google.com/docs/auth/web/openid-connect). Please see the appropriate Get Started documentation ([iOS+](https://firebase.google.com/docs/auth/ios/start), [Android](https://firebase.google.com/docs/auth/android/start), [Web](https://firebase.google.com/docs/auth/web/start)) for instructions on how to install the Firebase Authentication SDK.

### Install the Beyond Identity SDK

In order to use Beyond Identity functionality in your application, you will need to install the Beyond Identity SDK. The [Android SDK](https://github.com/gobeyondidentity/bi-sdk-android), the [Swift SDK](https://github.com/gobeyondidentity/bi-sdk-swift), and the [JavaScript SDK](https://github.com/gobeyondidentity/bi-sdk-js) provides functionality from passkey creation to passwordless authentication. A set of functions are provided to you through an `Embedded` namespace.

## Initialize the Beyond Identity SDK

Once you've installed the SDK, initialize it so that you can call the Embedded functions.

<Tabs groupId="platform" queryString>
<TabItem value="android" label="Android">

<SetupKotlin />

</TabItem>
<TabItem value="ios" label="iOS">

<SetupSwift />

</TabItem>
<TabItem value="web" label="Web">

<SetupJavaScript />

</TabItem>
</Tabs>

## Set up Beyond Identity as an Identity Provider

To set up Beyond Identity as an Identity Provider, you need to create a [Realm](/docs/v1/workflows/realms) to hold identities and configuration. Inside that realm, you'll need to create an [Application](/docs/v1/workflows/applications) that contains the authentication flow configuration. These can be configured in you admin console that was created for you when you signed up for a developer account.

### Create a Realm

From the admin console, click the realm drop-down, and click **Create new realm**.

<Arcade clip={Clip.CreateRealm} />

### Create an Application

From the admin console, click **Apps**, then click **Add app**.

There is a lot to configure when creating an application. When creating your application make sure:

- Redirect URIs contains your application's App Scheme or Universal URL
- Configuration Type (in the Authenticator Config tab) is set to `Embedded SDK`
- Invoke URL (in the Authenticator Config tab) contains your application's App Scheme or Universal URL
- Invocation Type (in the Authenticator Config tab) is set to `Automatic`.

For help choosing options, visit the following guides:

- [Workflows: Applications](/docs/v1/workflows/applications)
- [Authenticator Config](/docs/v1/platform-overview/authenticator-config)

<Arcade clip={Clip.CreateApplication} />

### Configure Custom OpenID Connect Provider

Now that we have created our application, we are ready to configure our custom OpenID Connect provider in the [Firebase console](https://console.firebase.google.com).

![Firebase Step 1](/assets/firebase-oidc-1.png)
![Firebase Step 2](/assets/firebase-oidc-2.png)

1. For Name, use Beyond Identity
1. For Client ID, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
1. For Issuer (URL), copy and paste the value from Applications -> Your New Application -> External Protocol -> Issuer
1. For Client Secret, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret

![Firebase Step 3](/assets/firebase-oidc-3.png)

To complete set up, follow the steps for your platform
- [Apple](https://firebase.google.com/docs/auth/ios/openid-connect)
- [Android](https://firebase.google.com/docs/auth/android/openid-connect)
- [Web](https://firebase.google.com/docs/auth/web/openid-connect)

## Create an Identity and generate a Universal Passkey

Once you have an application in the admin console you are ready to provision users in your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

Creating a user can be done either in the admin console or through an API. This guide will use the admin console. Navigate to your realm in the console and click **Identities**, then click **Add identity**.

For more information visit [Workflows: User and Group Provisioning](/docs/v1/workflows/user-provisioning).

<Arcade clip={Clip.CreateIdentity} />

### Generate a passkey

Once you have an identity, you are ready to generate a passkey for this user. This step can also be done either in the admin console or through an API. This guide will use the admin console. Navigate back to **Identities** and select the identity you would like to bind to a passkey. Click **Add a passkey**, select your app and the click **Proceed & send email**. The user will receive an enrollment email which they can tap on to bind a passkey to their device.

Note that whichever browser or device that the user taps on the enrollment email will be the device/browser where the user can log into your Drupal site. If the user wishes to login with a different browser or device you will need to send the user another email to bind that new browser/device. Users can bind multiple devices and browsers.

For more information visit [Workflows: Bind Passkey To User](/docs/v1/workflows/bind-passkey).

<Arcade clip={Clip.CreatePasskey} />

## Configure Application

### Bind passkey to device

Once the user taps on the enrollment email, they will be redirected to your application. Intercept the link from the enrollment email. The link that is redirected to your application will take on the following form. A `/bind` path will be appended to your Invoke URL (configured in your application above) as well as several other query parameters.

```
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

Once you receive the incoming URL, pass it into the Beyond Identity SDK to complete the binding process. You can validate the incoming URL with `isBindPasskeyUrl`. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

<Tabs groupId="platform" queryString>
<TabItem value="android" label="Android">

```kotlin
import com.beyondidentity.embedded.sdk.EmbeddedSdk
import kotlinx.coroutines.flow.onEach
import timber.log.Timber

EmbeddedSdk.bindPasskey(url = bindingLink)
.onEach { result ->
    result.onSuccess { success ->
        Timber.d("Bind Passkey success = $success")
    }
    result.onFailure { failure ->
        Timber.e("Bind Passkey failure = $failure")
    }
}
```

</TabItem>
<TabItem value="ios" label="iOS">

```swift
import BeyondIdentityEmbedded

Embedded.shared.bindPasskey(url: bindingLink) { result in
    switch result {
    case let .success(bindResponse):
        print(bindResponse)
    case let .failure(error):
        print(error.localizedDescription)
    }
}
```

</TabItem>
<TabItem value="web" label="Web">

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-js'

const bindResponse = await embedded.bindPasskey(bindingLink);
console.log(bindResponse);
```

</TabItem>
</Tabs>

### Authenticate

The authenticate url that is redirected to your application will append a `/bi-authenticate` path to your Invoke URL:

```
$invoke_url/bi-authenticate?request=<request>
```

Once you receive the authenticate URL, pass it into the SDK to complete the authentication process. You can validate the incoming URL with `isAuthenticateUrl`.

<Tabs groupId="platform" queryString>
<TabItem value="android" label="Android">

```kotlin
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent
import com.beyondidentity.embedded.sdk.EmbeddedSdk
import com.google.firebase.auth.ktx.auth
import com.google.firebase.auth.ktx.oAuthCredential
import com.google.firebase.ktx.Firebase

private fun launchBI(context: Context, url: Uri = AUTH_URL) {
    CustomTabsIntent.Builder().build().launchUrl(context, url)
}

private fun handleIntent(context: Context, intent: Intent?) {
    selectPasskeyId { selectedPasskeyId ->
        intent?.data?.let { uri ->
            when {
                EmbeddedSdk.isAuthenticateUrl(uri.toString()) -> {
                    EmbeddedSdk.authenticate(
                        url = uri.toString(),
                        passkeyId = selectedPasskeyId,
                    ) { result ->
                        result.onSuccess { authenticateResponse ->
                            authenticateResponse.redirectUrl?.let { redirectUrl ->
                                // This URL contains authorization code and state parameters
                                // Exchange the authorization code for an id_token using Beyond Identity's token endpoint.
                                var code = parseCode(redirectUrl)
                                var token = exchangeForToken(code)

                                val providerId = "oidc.beyond-identity" // As registered in Firebase console.
                                val credential = oAuthCredential(providerId) {
                                    setIdToken(token) // ID token from OpenID Connect flow.
                                }
                                Firebase.auth
                                    .signInWithCredential(credential)
                                    .addOnSuccessListener { authResult ->
                                        // User is signed in.
                                    }
                                    .addOnFailureListener { e ->
                                        // Handle failure.
                                    }
                            }
                        }
                    }
                }
            }
        }
    }
}

private fun selectPasskeyId(callback: (String) -> Unit) {
    // Where you can perform some logic here to select a passkey, or
    // present UI to a user to enable them to select a passkey.
}
```

</TabItem>
<TabItem value="ios" label="iOS">

```swift
import AuthenticationServices
import BeyondIdentityEmbedded
import FirebaseAuth

let session = ASWebAuthenticationSession(
    url: viewModel.authorizationURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else {
        print("url is not valid")
        return
    }
    presentPasskeySelection { selectedPasskeyId in
        Embedded.shared.authenticate(
            url: url,
            id: selectedPasskeyId
        ) { result in
            switch result {
            case let .success(response):
                // This URL contains authorization code and state parameters
                // Exchange the authorization code for an id_token using Beyond Identity's token endpoint.
                let code = parseCode(from: response.redirectURL)
                let token = exchangeForToken(code)

                let credential = OAuthProvider.credential(
                    withProviderID: "oidc.beyond-identity", // As registered in Firebase console.
                    idToken: token, // ID token from OpenID Connect flow.
                    rawNonce: nil
                )
                Auth.auth().signIn(with: credential) { authResult, error in
                    if error {
                        // Handle error.
                        return
                    }
                    // User is signed in.
                }
            case let .failure(error):
                print(error)
            }
        }
    }
}
session.presentationContextProvider = self
session.start()

private fun presentPasskeySelection(callback: (PasskeyID) -> Void) {
    // Where you can perform some logic here to select a passkey, or
    // present UI to a user to enable them to select a passkey.
}
```

</TabItem>
<TabItem value="web" label="Web">

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-js'
import { getAuth, signInWithCredential, OAuthProvider } from "firebase/auth";

selectPasskeyId(async (selectPasskeyId) => {
    if (embedded.isAuthenticateUrl(authenticateUrl)) {
        let result = await embedded.authenticate(authenticateUrl, selectPasskeyId);

        // This URL contains authorization code and state parameters
        // Exchange the authorization code for an id_token using Beyond Identity's token endpoint.
        var code = parseCode(result.redirectUrl)
        var token = exchangeForToken(code)

        const provider = new OAuthProvider("oidc.beyond-identity"); // As registered in Firebase console.
        const credential = provider.credential({
            idToken: token, // ID token from OpenID Connect flow.
        });
        signInWithCredential(getAuth(), credential)
            .then((result) => {
                // User is signed in.
            })
            .catch((error) => {
                // Handle error.
            });
    }
});

function selectPasskeyId(callback: (selectPasskeyId: string) => void) {
    // Where you can perform some logic here to select a passkey, or
    // present UI to a user to enable them to select a passkey.
}
```

</TabItem>
</Tabs>
