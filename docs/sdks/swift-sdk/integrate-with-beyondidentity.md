---
title: Integrate With Beyond Identity
sidebar_position: 2
---

This guide describes how to configure Beyond Identity as the primary IdP.

### Prerequisites

 - [Using Beyond Identity for Authentication](../../using-bi-for-auth)
 - [Swift SDK Overview](overview)

Before calling [`Embedded.shared.authenticate`](overview#authentication), we must [Authorize With Beyond Identity](integrate-with-beyondidentity#authorize-with-beyond-identity)

### Authorize With Beyond Identity
 - Step 1: Configuring the Authenticator Config

Make sure the [Authentication Config](../../platform-overview/authenticator-config#embedded) in the Beyond Identity Console is set to type `Embedded` and that the Invoke URL points to your application with either an App Scheme or a Universal Link.

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

To complete the authentication flow, launch another `ASWebAuthenticationSession` using the `redirectURL` returned from a successful authenticate response. The authorization code and the state parameter are attached to this URL.

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
            // Exchange the authorization code for an id_token using your Beyond Identity Token Endpoint.
        }
        newSession.presentationContextProvider = self
        newSession.start()
                
    case let .failure(error):
    }
}
```

### Full Example

```javascript
let session = ASWebAuthenticationSession(
    url: viewModel.beyondIdentityURL,
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
            newSession.presentationContextProvider = self
            newSession.start()
                    
        case let .failure(error):
            print(error)
        }
    }
}
session.presentationContextProvider = self
session.start()
```