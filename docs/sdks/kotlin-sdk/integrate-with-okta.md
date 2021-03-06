---
title: Integrate With Okta
sidebar_position: 3
---

This guide describes how to configure Okta to delegate to Beyond Identity for authentication during an OAuth2 authorization flow.

## Prerequisites

 - [Integrate With Okta](../../../../guides/sso-integrations/integrate-with-okta)
 - [Kotlin SDK](overview)

Before calling [`EmbeddedSdk.authenticate()`](overview#authentication), we must [Authorize With Okta](#authorize-with-okta).

## Authorize With Okta

![Integrate With Okta Flowchart](../screenshots/Integrate%20With%20Okta%20Flowchart.png)

### Using a WebView

 - Step 1: Configuring the Authenticator Config

Make sure the [Authentication Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

 - Step 2: Okta Authorize URL

To start the authorization flow, launch a [`WebView`](https://developer.android.com/reference/android/webkit/WebView), and load the Oauth2 Authorization Request URL provided by Okta.

![Okta Identity Provider Example](../screenshots/Okta%20Identity%20Provider%20Example.png)

```javascript
val webView = WebView(activity)
...
webView.loadUrl(OKTA_URL)
```

 - Step 3: Invoke URL

Create a [`WebViewClient`](https://developer.android.com/reference/android/webkit/WebViewClient) and override [`shouldOverrideUrlLoading`](https://developer.android.com/reference/android/webkit/WebViewClient#shouldOverrideUrlLoading(android.webkit.WebView,%20android.webkit.WebResourceRequest)). A URL with the Invoke URL scheme should be returned from Okta. When the webpage loads the URL, call [`EmbeddedSdk.authenticate()`](overview#authentication). You can confirm the validity of the URL with [`EmbeddedSdk.isAuthenticateUrl()`](overview#authenticate-url-validation).

```javascript
webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(
        view: WebView?,
        request: WebResourceRequest?,
    ): Boolean {
        request?.url?.let { invokeUrl ->
            if (EmbeddedSdk.isAuthenticateUrl(invokeUrl.toString())) {
                EmbeddedSdk.authenticate(
                    invokeUrl.toString(),
                    ...
                ) {
                    ...
                }
                return true
            }
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}
```

 - Step 4: Redirect URL

To complete the authorization flow, launch another [`WebView`](https://developer.android.com/reference/android/webkit/WebView), using the `redirectUrl` returned from a successful `AuthenticateResponse` to complete the initial OAuth flow. Another url will be returned that contains an authorization code that can be used to exhange for an ID token using Okta's [token endpoint](https://developer.okta.com/docs/reference/api/oidc/#token).

```javascript
EmbeddedSdk.authenticate(
    invokeUrl.toString(),
    object : ((List<Credential>, (String?) -> Unit) -> Unit) {
        override fun invoke(p1: List<Credential>, p2: (String?) -> Unit) {}
    }
) { result ->
    result.onSuccess { authenticateResponse ->
        authenticateResponse.redirectUrl?.let { redirectUrl ->
            val webView = WebView(activity)

            webView.webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(
                    view: WebView?,
                    request: WebResourceRequest?,
                ): Boolean {
                    request?.url?.scheme?.let { scheme ->
                        if (scheme == CALLBACK_URL_SCHEME) {
                            // This URL contains authorization code and state parameters
                            // Exchange the authorization code for an id_token using Okta's token endpoint.
                            return true
                        }
                    }
                    return super.shouldOverrideUrlLoading(view, request)
                }
            }

            webView.loadUrl(redirectUrl)
        }
    }
}
```

#### Full Example

```javascript
val webView = WebView(activity)

webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(
        view: WebView?,
        request: WebResourceRequest?,
    ): Boolean {
        request?.url?.let { invokeUrl ->
            if (EmbeddedSdk.isAuthenticateUrl(invokeUrl.toString())) {
                EmbeddedSdk.authenticate(
                    invokeUrl.toString(),
                    object : ((List<Credential>, (String?) -> Unit) -> Unit) {
                        override fun invoke(p1: List<Credential>, p2: (String?) -> Unit) {}
                    }
                ) { result ->
                    result.onSuccess { authenticateResponse ->
                        authenticateResponse.redirectUrl?.let { redirectUrl ->
                            val newWebView = WebView(activity)
                
                            newWebView.webViewClient = object : WebViewClient() {
                                override fun shouldOverrideUrlLoading(
                                    view: WebView?,
                                    request: WebResourceRequest?,
                                ): Boolean {
                                    request?.url?.scheme?.let { scheme ->
                                        if (scheme == CALLBACK_URL_SCHEME) {
                                            // This URL contains authorization code and state parameters
                                            // Exchange the authorization code for an id_token using Okta's token endpoint.
                                            return true
                                        }
                                    }
                                    return super.shouldOverrideUrlLoading(view, request)
                                }
                            }
                
                            newWebView.loadUrl(redirectUrl)
                        }
                    }
                }
                return true
            }
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}

webView.loadUrl(OKTA_URL)
```

### Using an SDK

See Okta's [Developer Site](https://developer.okta.com/code/android/) for the latest Android SDKs or Widgets. This guide uses the [Okta OIDC Android](https://github.com/okta/okta-oidc-android) SDK.

 - Step 1: Configuring the Authenticator Config

Make sure the [Authentication Config](../../platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link. Note: You may want to use a separate scheme for Beyond Identity and Okta.

 - Step 2: Okta Authorize URL

To start the authorization flow, configure a [`WebAuthClient`](https://github.com/okta/okta-oidc-android/blob/master/library/src/main/java/com/okta/oidc/clients/web/WebAuthClient.java), and call signIn.

![Okta Identity Provider](../screenshots/Okta%20Identity%20Provider%20Example.png)

```javascript
val customConfiguration = CustomConfiguration.Builder()
    .authorizationEndpoint(BuildConfig.AUTHORIZATION_ENDPOINT)
    .tokenEndpoint(BuildConfig.TOKEN_ENDPOINT)
    .create()

val oidcConfig = OIDCConfig.Builder()
    .clientId(BuildConfig.CLIENT_ID)
    .redirectUri(BuildConfig.REDIRECT_URI)
    .endSessionRedirectUri(BuildConfig.END_SESSION_REDIRECT_URI)
    .scopes(BuildConfig.SCOPES)
    .discoveryUri(BuildConfig.DISCOVERY_URI)
    .customConfiguration(customConfiguration)
    .create()

val webAuthClient = WebAuthBuilder()
    .setRequireHardwareBackedKeyStore(false)
    .withConfig(oidcConfig)
    .withContext(applicationContext)
    .withStorage(SharedPreferenceStorage(this))
    .create()

...

val codeChallenge = generateCodeChallenge()
val codeChallengeMethod = generateCodeChallengeMethod()
val codeVerifier = generateCodeVerifier()

val authenticationPayload = AuthenticationPayload.Builder()
    .addParameter("code_challenge", codeChallenge)
    .addParameter("code_challenge_method", codeChallengeMethod)
    .addParameter("code_verifier", codeVerifier)
    .setIdp(BuildConfig.IDP_ID)
    .build()

webAuthClient?.signIn(activity, authenticationPayload)
```

 - Step 3: Invoke URL

A URL with the Invoke URL scheme should be triggered by the Okta SDK. The Android OS will look for an appropraite Activity to handle the Intent. In your [`Activity`](https://developer.android.com/reference/android/app/Activity), which handles your Beyond Identity scheme, override [`onCreate`](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)) &/ [`onNewIntent`](https://developer.android.com/reference/android/app/Activity#onNewIntent(android.content.Intent)), and call [`EmbeddedSdk.authenticate()`](overview#authentication). You can confirm the validity of the URL with [`EmbeddedSdk.isAuthenticateUrl()`](overview#authenticate-url-validation).

```javascript
intent?.data?.let { invokeUrl ->
    if (EmbeddedSdk.isAuthenticateUrl(invokeUrl.toString())) {
        EmbeddedSdk.onAuthenticate(
            url = invokeUrl.toString(),
            ...
        ) {
            ...
        }
    }
}
```

 - Step 4: Redirect URL

To complete the authorization flow, launch a [`WebView`](https://developer.android.com/reference/android/webkit/WebView), using the `redirectUrl` returned from a successful `AuthenticateResponse` to complete the initial OAuth flow. Another url will be returned that contains an authorization code that can be used to exhange for an ID token using Okta's [token endpoint](https://developer.okta.com/docs/reference/api/oidc/#token).

```javascript
EmbeddedSdk.authenticate(
    invokeUrl.toString(),
    object : ((List<Credential>, (String?) -> Unit) -> Unit) {
        override fun invoke(p1: List<Credential>, p2: (String?) -> Unit) {}
    }
) { result ->
    result.onSuccess { authenticateResponse ->
        authenticateResponse.redirectUrl?.let { redirectUrl ->
            val webView = WebView(activity)

            webView.webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(
                    view: WebView?,
                    request: WebResourceRequest?,
                ): Boolean {
                    request?.url?.scheme?.let { scheme ->
                        if (scheme == CALLBACK_URL_SCHEME) {
                            // This URL contains authorization code and state parameters
                            // Exchange the authorization code for an id_token using Okta's token endpoint.
                            return true
                        }
                    }
                    return super.shouldOverrideUrlLoading(view, request)
                }
            }

            webView.loadUrl(redirectUrl)
        }
    }
}
```

#### Full Example

```javascript
fun oktaSignIn(activity: Activity) {
    val customConfiguration = CustomConfiguration.Builder()
        .authorizationEndpoint(BuildConfig.AUTHORIZATION_ENDPOINT)
        .tokenEndpoint(BuildConfig.TOKEN_ENDPOINT)
        .create()

    val oidcConfig = OIDCConfig.Builder()
        .clientId(BuildConfig.CLIENT_ID)
        .redirectUri(BuildConfig.REDIRECT_URI)
        .endSessionRedirectUri(BuildConfig.END_SESSION_REDIRECT_URI)
        .scopes(BuildConfig.SCOPES)
        .discoveryUri(BuildConfig.DISCOVERY_URI)
        .customConfiguration(customConfiguration)
        .create()

    val webAuthClient = WebAuthBuilder()
        .setRequireHardwareBackedKeyStore(false)
        .withConfig(oidcConfig)
        .withContext(activity.applicationContext)
        .withStorage(SharedPreferenceStorage(activity))
        .create()

    val codeChallenge = generateCodeChallenge()
    val codeChallengeMethod = generateCodeChallengeMethod()
    val codeVerifier = generateCodeVerifier()

    val authenticationPayload = AuthenticationPayload.Builder()
        .addParameter("code_challenge", codeChallenge)
        .addParameter("code_challenge_method", codeChallengeMethod)
        .addParameter("code_verifier", codeVerifier)
        .setIdp(BuildConfig.IDP_ID)
        .build()

    webAuthClient?.signIn(activity, authenticationPayload)
}

fun handleIntent(intent: Intent) {
    intent?.data?.let { invokeUrl ->
        if (EmbeddedSdk.isAuthenticateUrl(invokeUrl.toString())) {
            EmbeddedSdk.authenticate(
                invokeUrl.toString(),
                object : ((List<Credential>, (String?) -> Unit) -> Unit) {
                    override fun invoke(p1: List<Credential>, p2: (String?) -> Unit) {}
                }
            ) { result ->
                result.onSuccess { authenticateResponse ->
                    authenticateResponse.redirectUrl?.let { redirectUrl ->
                        val webView = WebView(activity)

                        webView.webViewClient = object : WebViewClient() {
                            override fun shouldOverrideUrlLoading(
                                view: WebView?,
                                request: WebResourceRequest?,
                            ): Boolean {
                                request?.url?.scheme?.let { scheme ->
                                    if (scheme == CALLBACK_URL_SCHEME) {
                                        // This URL contains authorization code and state parameters
                                        // Exchange the authorization code for an id_token using Okta's token endpoint.
                                        return true
                                    }
                                }
                                return super.shouldOverrideUrlLoading(view, request)
                            }
                        }

                        webView.loadUrl(redirectUrl)
                    }
                }
            }
        }
    }
}
```
