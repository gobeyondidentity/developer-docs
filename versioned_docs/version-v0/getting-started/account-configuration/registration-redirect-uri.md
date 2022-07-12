---
title: Set Registration Redirect URI
sidebar_position: 2
---

This URI lets us know where to redirect new users when they register using an email. Whenever a new user registers using Beyond Identity, we send out an email to verify their identity. By default, the link in that email redirects a user to our [Native Platform Authenticator](/docs/v0/web-sdks/platform-authenticator). In order to redirect to your own iOS/Android application, you will need to specify this URI to be either an app scheme or a universal url / app link.

### iOS Setup Instructions

Apple supports two ways of deep linking into an app. Pick one of the following and follow the guide:
- [App Schemes](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app)
- [Universal URLs](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)

### Android Setup Instructions

Android supports two way of deep linking into an app. Pick one of the following and follow the guide:
- [Custom Schemes](https://developer.android.com/training/basics/intents/filters)
- [App Links](https://developer.android.com/training/app-links)

:::tip A note on AppSchemes
While app schemes are trivial to set up and great for testing, we recommend using universal URLs in a production setting. The same app scheme can be registered by multiple apps, allowing other apps to pretend to be your app.
:::

### Supporting Multiple OSs
In order to support registration on both iOS and Android, there are a couple of ways to do it depending on which method you chose to deep link into your app above.

#### Method 1: Using Universal URLs and App Links

1. Set up Universal URLs for your iOS app
2. Set up App Links for your Android app
3. Make sure you use the the exact same URL for both iOS and Android

#### Method 2: Custom URL on your domain

1. Set up a custom path on your domain/backend (e.g https://example.com/registration-redirect)
2. Detect the OS in the browser and use that to launch the appropriate app by app scheme/universal url/app link

### Updating Registration Redirect URI

See [Account Configuration](/docs/v0/getting-started/account-configuration) in order to update the registration redirect URI once you've gone through the above steps.

### Debugging

Universal URLs / App Links can take a bit of time to set up. In order to save time and get up and running more quickly, we recommend using app schemes during development.

### URL Selection

When it comes to selecting a registration redirect URI to use, we're not picky. you can use anything you want as long as it's a valid URL. Examples of valid app schemes / URLs to use include:

```
https://example.com/
https://example.com/anypathyouwant
acme-app://
acme-app://anypathyouwant
```

While we don't enforce a specific path to be specified as part of a URL, you might find that it's useful in order to distinguish between multiple URLs being deep-linked into your app.