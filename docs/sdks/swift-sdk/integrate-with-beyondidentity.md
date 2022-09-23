---
title: Integrate With Beyond Identity
sidebar_position: 1
---

This guide describes how to configure Beyond Identity as the primary IdP.

## Prerequisites

 - [Using Beyond Identity for Authentication](../../using-bi-for-auth)
 - [Swift SDK Overview](overview)

Before calling [`Embedded.shared.authenticate`](overview#authentication), we must [Authorize With Beyond Identity](integrate-with-beyondidentity#authorize-with-beyond-identity)

## Authorize With Beyond Identity

### Using a WebView

The library follows the best practices set out in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252) including using `SFAuthenticationSession` and `SFSafariViewController` on iOS for the auth request. `UIWebView` and `WKWebView` are explicitly *not* supported due to the security and usability reasons explained in [Section 8.12 of RFC 8252](https://tools.ietf.org/html/rfc8252#section-8.12).

 - Step 1: Configuring the Authenticator Config

Make sure the [Authenticator Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

 - Step 2: Beyond Identity Authorize URL

To begin the authentication flow, start an `ASWebAuthenticationSession`, and load your crafted Beyond Identity [Authorization URL](../../using-bi-for-auth/#craft-your-authorize-url).

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.beyondIdentityURL,
    callbackURLScheme: viewModel.callbackScheme
    completionHandler: { (url, error) in }
)
session.presentationContextProvider = self
session.start()
```

 - Step 3: Invoke URL

During the session completionHandler, a URL with the invoke URL scheme should be returned. When the webpage loads a URL, call `Embedded.shared.authenticate`. You can confirm the validity of the URL with `Embedded.shared.isAuthenticateUrl`.

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.beyondIdentityURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else {/*not valid*/}
    Embedded.shared.authenticate(
        url: url,
        credentialID: id
    ) { result in
        switch result {
        case let .success(response):         
        case let .failure(error):
        }
    }
}
```

 - Step 4: Redirect URL

A `redirectURL` is returned from a successful authenticate response. The authorization code and the state parameter are attached to this URL. You can exchange the code for an id token using your Beyond Identity Token Endpoint. 

```javascript
Embedded.shared.authenticate(
    url: url,
    credentialID: id
) { result in
    switch result {
    case let .success(response):
        let code = parseCode(from: response.redirectURL)
        let token = exchangeForToken(code)
    case let .failure(error):
    }
}
```

#### Full Example

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.beyondIdentityURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else { 
        print("url is not valid")
        return
    }
    presentCredentialSelection { selectedID in
        Embedded.shared.authenticate(
            url: url,
            credentialID: selectedID
        ) { result in
            switch result {
            case let .success(response):
                let code = parseCode(from: response.redirectURL)
                let token = exchangeForToken(code)
            case let .failure(error):
                print(error)
            }
        } 
    }
}
session.presentationContextProvider = self
session.start()
```
