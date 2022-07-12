---
title: Integrate With Okta
sidebar_position: 2
---

This guide describes how to configure Beyond Identity using Okta as the OIDC authentication flow.

### Prerequisites

 - [Integrate With Okta](../../sso-integrations/integrate-with-okta)
 - [Kotlin SDK](overview)

Before calling [`EmbeddedSdk.authenticate()`](overview#authentication), we must [Authorize With Okta](#authorize-with-okta)

### Authorize With Okta

 - Step 1: Okta URL

To start the authorization flow, launch a [`WebView`](https://developer.android.com/reference/android/webkit/WebView), and load the Oauth2 Authorization Request URL provided by Okta.

![Okta Identity Provider](../screenshots/Okta%20Identity%20Provider.png)

```
val webView = WebView(activity)
...
webView.loadUrl(OKTA_URL)
```

 - Step 2: Invoke URL

Create a [`WebViewClient`](https://developer.android.com/reference/android/webkit/WebViewClient) and override [`shouldOverrideUrlLoading`](https://developer.android.com/reference/android/webkit/WebViewClient#shouldOverrideUrlLoading(android.webkit.WebView,%20android.webkit.WebResourceRequest)). A URL with the Invoke URL scheme should be returned from Okta. When the webpage loads the URL, call [`EmbeddedSdk.authenticate()`](overview#authentication). You can confirm the validity of the URL with [`EmbeddedSdk.isAuthenticateUrl()`](overview#authenticate-url-validation).

```
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
            }
            return true
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}
```

 - Step 3: Redirect URL

To complete the authorization flow, launch another [`WebView`](https://developer.android.com/reference/android/webkit/WebView), and load the `redirectUrl` returned from a successful `AuthenticateResponse`. The authorization code and state parameter are attached to this URL. These can be exchanged for an id_token using Okta's [token endpoint](https://developer.okta.com/docs/reference/api/oidc/#token).

```
EmbeddedSdk.authenticate(
	invokeUrl.toString(),
	object : ((List<Credential>, (String?) -> Unit) -> Unit) {
		override fun invoke(p1: List<Credential>, p2: (String?) -> Unit) {}
	}
) { result ->
	result.onSuccess { authenticateResponse ->
		authenticateResponse.redirectUrl?.let { redirectUrl ->
			WebView(activity).loadUrl(redirectUrl)
		}
	}
}
```

### Full Example

```
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
                            WebView(activity).loadUrl(redirectUrl)
                        }
                    }
                }
            }
            return true
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}

webView.loadUrl(OKTA_URL)
```
