---
title: Integrate With Auth0
sidebar_position: 3
---

This guide describes how to configure Auth0 to delegate to Beyond Identity for authentication during an OAuth2 authorization flow. 

### Prerequisites

 - [Integrate With Auth0](/guides/sso-integrations/integrate-with-auth0)
 - [Swift SDK Overview](overview)

Before calling [`Embedded.shared.authenticate`](overview#authentication), we must [Authorize With Auth0](#authorize-with-auth0).

### Authorize With Auth0

 - Step 1: Configuring the Authenticator Config

Make sure the [Authentication Config](/docs/v1/platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

 - Step 2: Auth0 Authorize URL

To begin the authentication flow, start an `ASWebAuthenticationSession`, and load the OAuth2 authorization request URL provided by Okta. Make sure `prefersEphemeralWebBrowserSession` is set to `false` as the browser will need to share cookies or other browsing data between the authentication session.

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.auth0URL,
    callbackURLScheme: viewModel.callbackScheme
    completionHandler: { (url, error) in }
)
session.prefersEphemeralWebBrowserSession = false
session.presentationContextProvider = self
session.start()
```

 - Step 3: Invoke URL

During the session completionHandler, a URL with the invoke URL scheme should be returned from Auth0. When the webpage loads a URL, call `Embedded.shared.authenticate`. You can confirm the validity of the URL with `Embedded.shared.isAuthenticateUrl`.

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.oktaURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else {/*not valid*/}
    Embedded.shared.authenticate(
        url: url,
        onSelectCredential: presentCredentialSelection
    ) { result in
        switch result {
        case let .success(response):         
        case let .failure(error):
        }
    }
}
```

 - Step 4: Redirect URL

A `redirectURL` is returned from a successful authenticate response that needs to be resolved by launching another `ASWebAuthenticationSession` to complete the initial OAuth flow. On completion of the second `ASWebAuthenticationSession`, another `redirectURL` will be returned that contains an authorization code that can be used to exchange for an ID token.

```javascript
Embedded.shared.authenticate(
    url: url,
    onSelectCredential: presentCredentialSelectionToUser
) { result in
    switch result {
    case let .success(response):
        let newSession = ASWebAuthenticationSession(
            url: response.redirectURL, 
            callbackURLScheme: viewModel.callbackScheme
        ) { (url, error)  in
            // This URL contains authorization code and state parameters
            // Exchange the authorization code for an id_token using Okta's token endpoint.
        }
        newSession.prefersEphemeralWebBrowserSession = false
        newSession.presentationContextProvider = self
        newSession.start()
                
    case let .failure(error):
    }
}
```

### Full Example

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.oktaURL,
    callbackURLScheme: viewModel.callbackScheme
){ (url, error) in
    guard Embedded.shared.isAuthenticateUrl(url) else { 
        print("url is not valid")
        return
    }
    Embedded.shared.authenticate(
        url: url,
        onSelectCredential: presentCredentialSelectionToUser
    ) { result in
        switch result {
        case let .success(response):
            let newSession = ASWebAuthenticationSession(
                url: response.redirectURL, 
                callbackURLScheme: viewModel.callbackScheme
            ) { (url, error)  in
                parseForIDToken(url)
            }
            newSession.prefersEphemeralWebBrowserSession = false
            newSession.presentationContextProvider = self
            newSession.start()
                    
        case let .failure(error):
            print(error)
        }
    }
}
session.prefersEphemeralWebBrowserSession = false
session.presentationContextProvider = self
session.start()
```