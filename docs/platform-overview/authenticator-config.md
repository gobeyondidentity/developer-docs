---
title: Authenticator Config
sidebar_position: 3
---

An authenticator config is used to tell us how to retrieve your passkeys. Passkeys can be stored and retrieved from a platform or a browser, where they are securely stored. Each application is tied to a single Authenticator Config.

There are two types of Authenticator Configs:

- Hosted Web
- Embedded SDK

On creation, an application defaults to the "Hosted Web" Authenticator Config. In order to modify it, click on "Authenticator Config" under the selected application in the Beyond Identity Admin Console.

## Embedded SDK

The Embedded SDK Authenticator Config is used configure an application using either our native SDKs (iOS, Android, Flutter, React Native) or our web SDK (JS). There are three fields to configure in an Embedded Authenticator Config:

### Invocation Type

This specifies how our authentication URL is delivered to your application. Invocation Type can be one of two values:

- **Automatic**: If automatic is selected, we'll automatically redirect to your native or web app using the Invoke URL with a challenge that your app will need to sign.

- **Manual**: If manual is selected, the challenge will be returned to you as part of a JSON response. It will then be up to you to get it to your native/web app any way you see fit. This is useful for flows where you require a lot more control when redirecting to your native/web app. Since the challenge is packaged as part of a URL, following the URL will result in the same behavior as if an Invocation Type of "Automatic" were selected. The JSON payload returned has the following format.

```javascript
{
	"authenticate_url": "$invoke_url/bi-authenticate?request=<request>"
}
```

The diagram below shows how Invocation Type fits into an OAuth 2.0 flow. In the case of "Automatic", a 302 is returned causing the user agent to automatically redirect to the Invoke URL you've specified. In the case of "Manual", a JSON response containing the Invoke URL is returned.

import ImageSwitcher from '../../src/components/ImageSwitcher.js';

<ImageSwitcher lightSrc="/assets/invocation-url-diagram-light.png" darkSrc="/assets/invocation-url-diagram-dark.png" />

:::tip How do I know which one to use?
`Automatic` does a lot of the heavy lifting for you. If you initiate an OAuth2.0 request and specify the "Invoke URL" correctly, we'll get the Beyond Identity authentication URL to where it needs to be, whether this is inside of a native app or a web application.

`Manual` gives you a lot more control, but you'll have to do a little extra work to wire this flow up. The possibilities include:

- Completley silent OAuth 2.0 authentication using Passkeys. No redirects needed in a web app and no web view needed in a native application.
- The flexibility to write your own intelligent routing layer using the Beyond Identity authentication URL. You may want to authenticate against passkeys in your browser on desktop, but use passkeys on your native app on mobile.

:::

### Invoke URL

The invoke URL is a single URL that "points" to where your application is. In the case of a native application (iOS, Android, Flutter, React Native), this is either an App Scheme or an Universal URL / App Link. In the case of a web application, this is just a URL to your web application or a specific page of your web application.

:::tip App Schemes vs Universal URLs / App Links
While app schemes are generally easier to set up, Universal URLs and App Links are recommended as they provide protection against App Scheme hijacking.
:::

There are two scenarios in which a redirection to your application is necessary:

#### Binding a Credential

When creating a new identity, it's possible to validate that identity using an email. Upon receiving the email, the user will need to click on a link in that email to be redirected to your app where the credential binding process will take place. The `invoke_url` is used here to redirect from the email client into your application containing our embedded SDK. The URL that is redirected into your app will take on the following form:

Note that the path `/bind` is appended to the `invoke_url` and can be used as a route in your application:

```bash
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

:::tip Disambiguating URLs
Need a way to disambiguate our URLs from the rest of the URLs at your routing layer? Our SDKs provide these two functions for your convenience:

- `isAuthenticateUrl(url)`
- `isBindCredentialUrl(url)`

:::

#### Authentication

The authentication flow is shown in the diagram above and the response differs based on the Invocation Type specified:

Note that the path `/bi-authenticate` is appended to the `invoke_url` and can be used as a route in your application:

##### Automatic

```javascript
HTTP/1.1 302 Found
Location: $invoke_url/bi-authenticate?request=<request>
```

##### Manual

```javascript
HTTP/1.1 200 OK
Content-Type: application/json

{
	"authenticate_url": "$invoke_url/bi-authenticate?request=<request>"
}
```

### Trusted Origins

Trusted Origins are a list of URLs from which the embedded Web SDK is allowed to make requests to our backend. By default, our backend rejects CORS requests except from pre-specified domains. In order to whitelist your domain (and make the embedded Web SDK usable), you'll need to add your web application's URL to the list of Trusted Origins.

## Hosted Web

The _Hosted Web_ Authenticator Config is a constrained version of the _Embedded_ Authenticator Config with the following values:

- **Invocation Type:** `automatic`
- **Invoke URL:** `https://auth-<REGION>.beyondidentity.com/authenticator/`
- **Trusted Origins:** `[https://auth-<REGION>.beyondidentity.com/authenticator/]`

Use this Authenticator Config if you want to default all bound credentials and authentications to our Hosted Web Authenticator.
