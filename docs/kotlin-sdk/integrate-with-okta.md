---
title: Integrate With Okta
sidebar_position: 2
---

**[ROUGH DRAFT, needs review for accuracy and editing]**

This guide describes how to configure Beyond Identity with an use an OIDC authentication flow without a management API resource server. 
This flow should be used if a client is using Beyond Identity for authentication only.

### Prerequisites

 - [Integrate With Okta](https://developer-docs-git-v1-beyondidentity.vercel.app/docs/v1/sso-integrations/integrate-with-okta)
 - [Kotlin SDK](https://developer-docs-git-v1-beyondidentity.vercel.app/docs/v1/kotlin-sdk)

Before calling [`EmbeddedSdk.authenticate()`](EmbeddedSdk.authenticate(https://developer-docs-git-v1-beyondidentity.vercel.app/docs/v1/kotlin-sdk#authentication)), we must [Authenticate With Okta](https://developer-docs-git-v1-beyondidentity.vercel.app/docs/v1/kotlin-sdk/integrate-with-okta#authenticate-with-okta)

### Authenticate With Okta

 - Step 1: Okta URL

To begin the authentication flow, launch a WebView, and load the Okta URL.

```
val webView = WebView(activity)
webView.loadUrl(OKTA_URL)
```

 - Step 2: Invoke URL

When the webpage loads a URL with the Invoke URL scheme, call `EmbeddedSdk.authenticate()`.

```
webView.webViewClient = object : WebViewClient() {
	override fun shouldOverrideUrlLoading(
		view: WebView?,
		request: WebResourceRequest?,
	): Boolean {
		if (request?.url?.scheme.equals(INVOKE_URL)) {
			EmbeddedSdk.authenticate(request?.url?.toString(), ...) {...}
			return true
		}
		return super.shouldOverrideUrlLoading(view, request)
	}
}
```

 - Step 3: Redirect URL

To end the authentication flow, launch a WebView, and load the Redirect URL.

```
EmbeddedSdk.authenticate(
	uri.toString(),
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
		if (request?.url?.scheme.equals(INVOKE_URL)) {
			request?.url?.let { invokeUrl ->
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
