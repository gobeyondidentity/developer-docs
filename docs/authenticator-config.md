---
title: Authenticator Config
sidebar_position: 3
---

An Authenticator Configuration is used to specify how an authenticator is launched within your application. Each application is tied to a single Authenticator Config.

There are two types of Authenticator Configs:
- Hosted Web
- Embedded

On creation, an application defaults to the "Hosted Web" Authenticator Config. In order to modify it, click on the "Authenticator Config" under the selected application in the Beyond Identity Console.

## Embedded

The Embedded Authenticator Config is used configure an application using either our native SDKs (iOS, Android) or our web SDK (JS). There are two fields to configure in an Embedded Authenticator Config:

### Invoke URL

The invoke URL is a single URL that "points" to where your application is. In the case of a native application (iOS, Android), this is either an App Scheme or an Universal URL / App Link. In the case of a web application, this is just a URL to your web application or a specific page of your web application.

:::tip App Schemes vs Universal URLs / App Links
While app schemes are generally easier to set up, Universal URLs and App Links are recommended as they provide protection against App Scheme hijacking.
:::

There are two scenarios in which a redirection to your application is necessary:

#### Binding a Credential

When creating a new identity, it's possible to validate that identity using an email. Upon receiving the email, the user will need to click on a link in that email to be redirected to your app where the credential binding process will take place. The `invoke_url` is used here to redirect from the email client into your application containing our embedded SDK. The URL that is redirected into your app will take on the following form:

```bash
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

#### Authentication

At some point during an OAuth2/OIDC flow, you'll be asked to redirect somewhere to `authenticate` and validate your identity. This is similar to loging into some service using your google or github account. In the case of Beyond Identity, your identity is tied to a credential on a device, so the URL that we need to redirect to is the application containing our embedded SDK. The URL that is redirected into your app will take on the following form:

```bash
$invoke_url/bi-authenticate?request=<request>
```

### Trusted Origins

Trusted Origins are a list of URLs from which the embedded Web SDK is allowed to make requests to our backend. By default, our backend rejects CORS requests except from pre-specified domains. In order to whitelist your domain (and make the embedded Web SDK usable), you'll need to add your web application's URL to the list of Trusted Origins.

## Hosted Web

The *Hosted Web* Authenticator Config is a constrained version of the *Embedded* Authenticator Config with the following values:

- **Invoke URL:** https://auth-us.beyondidentity.com/authenticator/
- **Trusted Origins:** ["https://auth-us.beyondidentity.com/authenticator/"]

Use this Authenticator Config if you want to default all bound credentials and authentications to our Hosted Web Authenticator.