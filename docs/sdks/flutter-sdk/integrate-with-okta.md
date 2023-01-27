---
title: Integrate With Okta
sidebar_position: 3
---

This guide describes how to configure Okta to delegate to Beyond Identity for authentication during an OAuth2 authorization flow.

## Prerequisites

 - [Integrate With Okta](/guides/sso-integrations/integrate-with-okta)
 - [Flutter SDK Setup](/docs/v1/workflows/sdk-setup?sdks=flutter#query-string)

Before calling [`EmbeddedSdk.authenticate()`](/docs/v1/workflows/sdk-setup#authentication), we must [Authorize With Okta](#authorize-with-okta).

## Authorize With Okta

![Integrate With Okta Flowchart](../screenshots/Integrate%20With%20Okta%20Flowchart.png)

### Using an SDK

See Okta's [Developer Site](https://developer.okta.com/code/#mobile-native) for the latest Flutter SDKs or Widgets.

Note: At this time, there is no Okta SDK for Flutter, so we recommend [using the Web](#using-the-web).

### Using the Web

The library follows the best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252).

This guide uses the [Web Auth for Flutter](https://github.com/LinusU/flutter_web_auth) SDK.

 - Step 1: Configuring the Authenticator Config

Make sure the [Authenticator Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link. Note: You may want to use a separate scheme for Beyond Identity and Okta.

 - Step 2: Okta Authorize URL

To start the authorization flow, make a call to `FlutterWebAuth.authenticate()` with the Oauth2 Authorization Request URL provided by Okta and a callback url scheme.

![Okta Identity Provider Example](../screenshots/Okta%20Identity%20Provider%20Example.png)

```javascript
var result = await FlutterWebAuth.authenticate(
    url: OKTA_URL,
    callbackUrlScheme: CALLBACK_URL_SCHEME,
);
```

 - Step 3: Invoke URL

The result will be a URL with the Invoke URL scheme. You can call [`EmbeddedSdk.authenticate()`](/docs/v1/workflows/sdk-setup#authentication), using the result. You can confirm the validity of the URL with [`EmbeddedSdk.isAuthenticateUrl()`](/docs/v1/workflows/sdk-setup#authenticate-url-validation).

```javascript
var authenticateResponse = await Embeddedsdk.authenticate(result, selectedPasskeyId);
```

 - Step 4: Redirect URL

To complete the authorization flow, make another call to `FlutterWebAuth.authenticate()` with the `redirectUrl` returned from a successful `AuthenticateResponse` to complete the initial OAuth flow. Another url will be returned that contains an authorization code that can be used to exhange for an ID token using Okta's [token endpoint](https://developer.okta.com/docs/reference/api/oidc/#token).

```javascript
var result = await FlutterWebAuth.authenticate(
    url: authenticateResponse.redirectUrl,
    callbackUrlScheme: CALLBACK_URL_SCHEME,
);

// This URL contains authorization code and state parameters
// Exchange the authorization code for an id_token using Okta's token endpoint.
```

#### Full Example

```javascript
selectPasskeyId((selectedPasskeyId) async {
    var result = await FlutterWebAuth.authenticate(
        url: OKTA_URL,
        callbackUrlScheme: CALLBACK_URL_SCHEME,
    );

    var authenticateResponse = await Embeddedsdk.authenticate(result, selectedPasskeyId);

    var redirectUrlResult = await FlutterWebAuth.authenticate(
        url: authenticateResponse.redirectUrl,
        callbackUrlScheme: CALLBACK_URL_SCHEME,
    );

    // This URL contains authorization code and state parameters
    // Exchange the authorization code for an id_token using Okta's token endpoint.
});

Future<void> selectPasskeyId(Function(String) callback) async {
  // Where you can perform some logic here to select a passkey, or
  // present UI to a user to enable them to select a passkey.
}
```
