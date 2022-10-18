---
title: Integrate With Beyond Identity
sidebar_position: 1
---

This guide describes how to use Beyond Identity for authentication during an OAuth2 authorization flow.

## Prerequisites

- [Using Beyond Identity for Authentication](../../using-bi-for-auth)
- [React Native SDK Overview](overview)

Before calling [`Embedded.authenticate`](overview#authentication), we must [Authorize With Beyond Identity](integrate-with-beyondidentity#authorize-with-beyond-identity)

## Authorize With Beyond Identity

### Using the Web

Pick a webview library that follows the best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252). The library should use `SFAuthenticationSession` and `SFSafariViewController` on iOS and [Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs) on Android for authorization requests. `UIWebView` and `WKWebView` on iOS and `WebView` on Android are explicitly _not_ supported due to the security and usability reasons explained in [Section 8.12 of RFC 8252](https://tools.ietf.org/html/rfc8252#section-8.12). For these reasons, unfortunately, the [react-native-community/react-native-webview](https://github.com/react-native-community/react-native-webview) is _not_ recommended. The below examples will use [InAppBrowser](https://github.com/proyecto26/react-native-inappbrowser):

- Step 1: Configuring the Authenticator Config

Make sure the [Authenticator Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

- Step 2: Beyond Identity Authorize URL

To start the authorization flow, build a `CustomTabsIntent` or `ASWebAuthenticationSession`, and launch your crafted Beyond Identity OAuth2 authorization request URL you built in the pre-requisite step.

```javascript
if (await InAppBrowser.isAvailable()) {
  let response = await InAppBrowser.openAuth(
    beyondIdentityAuthUrl,
    'yourScheme://',
    {}
  );
}
```

- Step 3: Invoke URL

A URL with the invoke URL scheme should be returned from the webview. Call `Embedded.authenticate` with this url. You can confirm the validity of the URL with `Embedded.isAuthenticateUrl`.

```javascript
if (await InAppBrowser.isAvailable()) {
  const response = await InAppBrowser.openAuth(
    beyondIdentityAuthUrl,
    'yourScheme://',
    {}
  );

  if (await Embedded.isAuthenticateUrl(response.url)) {
    const authResponse = await Embedded.authenticate(response.url, id);
  }
}
```

- Step 4: Redirect URL

A `redirectURL` is returned from a successful authenticate response. The authorization code and the state parameter are attached to this URL. You can exchange the code for an id token using your Beyond Identity Token Endpoint.

```javascript
if (await Embedded.isAuthenticateUrl(response.url)) {
  const authResponse = await Embedded.authenticate(response.url, id);
  const code = parseCodeFrom(authResponse.redirectURL);
  const token = exchangeForToken(code);
}
```

#### Full Example

```javascript
if (await InAppBrowser.isAvailable()) {
  const response = await InAppBrowser.openAuth(
    beyondIdentityAuthUrl,
    'yourScheme://',
    {}
  );

  if (await Embedded.isAuthenticateUrl(response.url)) {
    const selectedCredentialId = await presentCredentialSelection();
    const authResponse = await Embedded.authenticate(
      response.url,
      selectedCredentialId
    );
    const code = parseCodeFrom(authResponse.redirectURL);
    const token = exchangeForToken(code);
  }
}

function presentCredentialSelection(): selectedCredentialId {
  // Where you can perform some logic here to select a credential, or
  // present UI to a user to enable them to select a credential.
}
```
