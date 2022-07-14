---
title: Integrate With Okta
sidebar_position: 3
---

This guide describes how to configure Okta to delegate to Beyond Identity for authentication during an OAuth2 authorization flow.

### Prerequisites

 - [Integrate With Okta](../../../../guides/sso-integrations/integrate-with-okta)
 - [Kotlin SDK](overview)

Before calling [`EmbeddedSdk.authenticate()`](overview#authentication), we must [Authorize With Okta](#authorize-with-okta).

### Authorize With Okta

 - Step 1: Configuring the Authenticator Config

Make sure the [Authentication Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

 - Step 2: Okta Authorize URL

To start the authorization flow, launch a [`WebView`](https://developer.android.com/reference/android/webkit/WebView), and load the Oauth2 Authorization Request URL provided by Okta.

![Okta Identity Provider](../screenshots/Okta%20Identity%20Provider.png)

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

To complete the authorization flow, launch another [`WebView`](https://developer.android.com/reference/android/webkit/WebView), and load the `redirectUrl` returned from a successful `AuthenticateResponse`. The authorization code and state parameter are attached to this URL.

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

### Full Example

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
