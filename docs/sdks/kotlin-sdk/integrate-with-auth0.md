---
title: Integrate With Auth0
sidebar_position: 4
---

This guide describes how to configure Auth0 to delegate to Beyond Identity for authentication during an OAuth2 authorization flow.

## Prerequisites

 - [Integrate With Auth0](../../../../guides/sso-integrations/integrate-with-auth0)
 - [Kotlin SDK](overview)

Before calling [`EmbeddedSdk.authenticate()`](overview#authentication), we must [Authorize With Auth0](#authorize-with-auth0).

## Authorize With Auth0

![Integrate With Auth0 Flowchart](../screenshots/Integrate%20With%20Auth0%20Flowchart.png)

### Using an SDK

See Auth0's [Developer Site](https://auth0.com/docs/quickstart/native/android) for the latest Android SDKs or Widgets. This guide uses the [Auth0 Android](https://github.com/auth0/Auth0.Android) SDK.

Note: At this time, the authorization flow cannot be completed using the SDK, so we recommend [using a WebView](#using-a-webview). The token exchange, however, can be completed using the SDK. 

### Using the Web

The library follows the best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252), including using [Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs) for authorization requests. For this reason, WebView is explicitly not supported due to usability and security reasons.

 - Step 1: Configuring the Authenticator Config

Make sure the [Authenticator Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

 - Step 2: Auth0 Authorize URL

To start the authorization flow, launch a [`WebView`](https://developer.android.com/reference/android/webkit/WebView), and load the Oauth2 Authorization Request URL provided by [Auth0](https://auth0.com/docs/api/authentication#authorization-code-flow-with-pkce).

```javascript
val webView = WebView(activity)
...
webView.loadUrl(AUTH0_URL)
```

 - Step 3: Invoke URL

Create a [`WebViewClient`](https://developer.android.com/reference/android/webkit/WebViewClient) and override [`shouldOverrideUrlLoading`](https://developer.android.com/reference/android/webkit/WebViewClient#shouldOverrideUrlLoading(android.webkit.WebView,%20android.webkit.WebResourceRequest)). A URL with the Invoke URL scheme should be returned from Auth0. When the webpage loads the URL, call [`EmbeddedSdk.authenticate()`](overview#authentication). You can confirm the validity of the URL with [`EmbeddedSdk.isAuthenticateUrl()`](overview#authenticate-url-validation).

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

To complete the authorization flow, launch another [`WebView`](https://developer.android.com/reference/android/webkit/WebView), using the `redirectUrl` returned from a successful `AuthenticateResponse` to complete the initial OAuth flow. Another url will be returned that contains an authorization code that can be used to exhange for an ID token using Auth0's [token endpoint](https://auth0.com/docs/api/authentication#authorization-code-flow-with-pkce45).

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
                            // Exchange the authorization code for an id_token using Auth0's token endpoint.
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
                                            // Exchange the authorization code for an id_token using Auth0's token endpoint.
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

webView.loadUrl(AUTH0_URL)
```
