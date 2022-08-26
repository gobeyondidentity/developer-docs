---
title: Integrate With Beyond Identity
sidebar_position: 1
---

This guide describes how to use Beyond Identity for authentication during an OAuth2 authorization flow.

## Prerequisites

 - [Using Beyond Identity for Authentication](../../using-bi-for-auth)
 - [Kotlin SDK](overview)

Before calling [`EmbeddedSdk.authenticate()`](overview#authentication), we must authorize using Beyond Identity.

## Authorize With Beyond Identity

### Using the Web

The library follows the best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252), including using [Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs) for authorization requests. For this reason, `WebView` is explicitly *not* supported due to usability and security reasons.

 - Step 1: Configuring the Authenticator Config

Make sure the [Authenticator Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

 - Step 2: Beyond Identity Authorize URL

To start the authorization flow, build a [`CustomTabsIntent`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent), and launch the Oauth2 Authorization Request URL you built in the pre-requisite step.

```javascript
val builder = CustomTabsIntent.Builder()
...
builder.build().launchUrl(context, BI_AUTH_URL)
```

 - Step 3: Invoke URL

A URL with the Invoke URL scheme should be triggered by the web page. The Android OS will look for an appropraite Activity to handle the Intent. In your [`Activity`](https://developer.android.com/reference/android/app/Activity), which handles your Beyond Identity scheme, override [`onCreate`](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)) &/ [`onNewIntent`](https://developer.android.com/reference/android/app/Activity#onNewIntent(android.content.Intent)), and call [`EmbeddedSdk.authenticate()`](overview#authentication). You can confirm the validity of the URL with [`EmbeddedSdk.isAuthenticateUrl()`](overview#authenticate-url-validation).

```javascript
intent?.data?.let { uri ->
    when {
        EmbeddedSdk.isAuthenticateUrl(uri.toString()) -> {
            EmbeddedSdk.authenticate(
                url = uri.toString(),
                onSelectCredential = { credentials, onSelectCredentialId -> }
            ) {
                ...
            }
        }
        ...
    }
}
```

 - Step 4: Redirect URL

To complete the authorization flow, build another [`CustomTabsIntent`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent), and launch the `redirectUrl` returned from a successful `AuthenticateResponse`. The authorization code and state parameter are attached to this URL.

```javascript
intent?.data?.let { uri ->
    when {
        EmbeddedSdk.isAuthenticateUrl(uri.toString()) -> {
            EmbeddedSdk.authenticate(
                url = uri.toString(),
                onSelectCredential = { credentials, onSelectCredentialId -> }
            ) { result ->
                result.onSuccess { authenticateResponse ->
                    authenticateResponse.redirectUrl?.let { redirectUrl ->
                        CustomTabsIntent.Builder().build().launchUrl(context, Uri.parse(redirectUrl))
                    }
                }
            }
        }
        uri.scheme == CALLBACK_URL_SCHEME -> {
            // This URL contains authorization code and state parameters
            // Exchange the authorization code for an id_token using Beyond Identity's token endpoint.
        }
        ...
    }
}
```

#### Full Example

```javascript
private fun launchBI(context: Context, url: Uri = BI_AUTH_URL) {
    CustomTabsIntent.Builder().build().launchUrl(context, url)
}

private fun handleIntent(context: Context, intent: Intent?) {
    intent?.data?.let { uri ->
        when {
            EmbeddedSdk.isAuthenticateUrl(uri.toString()) -> {
                EmbeddedSdk.authenticate(
                    url = uri.toString(),
                    onSelectCredential = { credentials, onSelectCredentialId -> }
                ) { result ->
                    result.onSuccess { authenticateResponse ->
                        authenticateResponse.redirectUrl?.let { redirectUrl ->
                            CustomTabsIntent.Builder().build().launchUrl(context, Uri.parse(redirectUrl))
                        }
                    }
                }
            }
            uri.scheme == CALLBACK_URL_SCHEME -> {
                // This URL contains authorization code and state parameters
                // Exchange the authorization code for an id_token using Beyond Identity's token endpoint.
            }
        }
    }
}
```
