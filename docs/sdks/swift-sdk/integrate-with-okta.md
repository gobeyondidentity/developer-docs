---
title: Integrate With Okta
sidebar_position: 3
---

This guide describes how to configure Okta to delegate to Beyond Identity for authentication during an OAuth2 authorization flow.

## Prerequisites

- [Integrate With Okta](/guides/sso-integrations/integrate-with-okta)
- [Swift SDK Setup](/docs/v1/workflows/sdk-setup?sdks=swift)

Before calling [`Embedded.shared.authenticate`](/docs/v1/workflows/sdk-setup?sdks=swift#authentication), we must [Authorize With Okta](integrate-with-okta#authorize-with-okta)

## Authorize With Okta

![Integrate With Okta Flowchart](../screenshots/Integrate%20With%20Okta%20Flowchart.png)

### Using the Web

The library follows the best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252) including using `SFAuthenticationSession` and `SFSafariViewController` on iOS for the auth request. `UIWebView` and `WKWebView` are explicitly _not_ supported due to the security and usability reasons explained in [Section 8.12 of RFC 8252](https://tools.ietf.org/html/rfc8252#section-8.12).

- Step 1: Configuring the Authenticator Config

Make sure the [Authenticator Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

- Step 2: Okta Authorize URL

To begin the authentication flow, start an `ASWebAuthenticationSession`, and load the OAuth2 authorization request URL provided by Okta.

Note: `prefersEphemeralWebBrowserSession` default is `false` which means cookies or other browsing data will be shared across the authentication session and the user will not need to sign in again if they are already authenticated on the system browser. However, the example below sets `prefersEphemeralWebBrowserSession` to `true` so that the user is prompted each time for demo consistency.

![Okta Identity Provider Example](../screenshots/Okta%20Identity%20Provider%20Example.png)

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.oktaURL,
    callbackURLScheme: viewModel.callbackScheme
    completionHandler: { (url, error) in }
)
session.prefersEphemeralWebBrowserSession = true
session.presentationContextProvider = self
session.start()
```

- Step 3: Invoke URL

During the session completionHandler, a URL with the invoke URL scheme should be returned from Okta. When the webpage loads a URL, call `Embedded.shared.authenticate`. You can confirm the validity of the URL with `Embedded.shared.isAuthenticateUrl`.

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.oktaURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else {
        /*
            session may be cached and the user is already logged in.
            Try to exchange the authorization code for an id_token using Okta's token endpoint.
        */
    }
    Embedded.shared.authenticate(
        url: url,
        id: passkeyId
    ) { result in
        switch result {
        case let .success(response):
        case let .failure(error):
        }
    }
}
```

- Step 4: Redirect URL

A `redirectUrl` is returned from a successful authenticate response that needs to be resolved by launching another `ASWebAuthenticationSession` to complete the initial OAuth flow. On completion of the second `ASWebAuthenticationSession`, another `redirectUrl` will be returned that contains an authorization code that can be used to exchange for an ID token.

```javascript
Embedded.shared.authenticate(
    url: url,
    id: passkeyId
) { result in
    switch result {
    case let .success(response):
        let newSession = ASWebAuthenticationSession(
            url: response.redirectUrl,
            callbackURLScheme: viewModel.callbackScheme
        ) { (url, error)  in
            // This URL contains authorization code and state parameters
            // Exchange the authorization code for an id_token using Okta's token endpoint.
        }
        newSession.presentationContextProvider = self
        newSession.prefersEphemeralWebBrowserSession = true
        newSession.start()

    case let .failure(error):
    }
}
```

#### Full Example

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.oktaURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else {
        print("url is not valid")
        return
    }
    presentPasskeySelection { selectedId in
        Embedded.shared.authenticate(
            url: url,
            id: selectedId
        ) { result in
            switch result {
            case let .success(response):
                let newSession = ASWebAuthenticationSession(
                    url: response.redirectUrl,
                    callbackURLScheme: viewModel.callbackScheme
                ) { (url, error)  in
                    parseForIDToken(url)
                }
                newSession.prefersEphemeralWebBrowserSession = true
                newSession.presentationContextProvider = self
                newSession.start()

            case let .failure(error):
                print(error)
            }
        }
    }
}
session.prefersEphemeralWebBrowserSession = true
session.presentationContextProvider = self
session.start()
```

### Using an SDK

See Okta's [Developer Site](https://developer.okta.com/code/#mobile-native) for the latest Swift SDKs.

Note: At this time, the authorization flow cannot be completed using the SDK, so we recommend [using the Web](#using-the-web).
