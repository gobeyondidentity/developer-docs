---
title: Overview
sidebar_position: 1
---

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

## Sample App

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-js/tree/main/examples/app/js) for the Embedded SDK.
:::


## Installation

```
yarn add @beyondidentity/bi-sdk-js
```
or
```
npm install @beyondidentity/bi-sdk-js
```

The next step differs based on the framework you are using and requires you to copy our `.wasm` binary into a location where it can be fetched publicly.

### React

Add the following to your package.json:

```json
"scripts": {
  ...
  "copy:wasm": "cp -R ../node_modules/@beyondidentity/bi-sdk-js/coresdk/dist/*.wasm public",
  "build": "yarn copy:wasm && <build steps>",
  ...
}
```

### Angular

Add the following to your package.json:

```json
"scripts": {
  ...
  "copy:wasm": "cp -R node_modules/@beyondidentity/bi-sdk-js/coresdk/dist/*.wasm src/",
  "build": "yarn copy:wasm && ng build",
  ...
}
```

Go into `node_modules/@beyondidentity/bi-sdk-js/coresdk/dist` and keep note of the name of the `.wasm` file.

Add the `.wasm` file to your `assets` in `angular.json`:

```json
"assets": [
  ...
  "src/kmc_bg.<hash>.wasm",
  ...
],
```


## Setup

First, before calling the Embedded functions, make sure to initialize the SDK.

```javascript
const embedded = await Embedded.initialize();
```

## Binding a Credential

The `bindCredential` function expects a URL. This can either be a binding credential link fetched directly from our public API, or a binding credential instruction that is the result of a redirection to your web application. This function should be used in conjunction with [isBindCredentialUrl](#bind-credential-url-validation) in order to determine if the URL being passed in is a valid bind credential URL.

#### Usage

```javascript
const bindCredentialResponse = embedded.bindCredential(url);
```

Where the response type consists of an object containing a `Credential` and an optional `postBindRedirect` URL to redirect to upon succesfully binding a credential.

```javascript
{
    credential: Credential;
    postBindRedirect?: string;
}
```

## Authentication

The `authenticate` function expects a URL. This Beyond Identity specific URL is generated during on OAuth2 authorization flow and carries with it a JWT that contains information specific to the current authorization request. When passing this URL into the `authenticate` function, this will perform a challenge/response against the private key bound to the credential on your device. You will be required to select from one of the credentials bound to your device if more than one credential belongs to a single Realm. This function should be used in conjunction with [isAuthenticateUrl](#authenticate-url-validation) in order to determine if the URL being passed in is a valid authenticate URL.

#### Usage

```javascript
const authenticateResponse = embedded.authenticate(url, (credentials) => {
    // Allow the user to make a selection on what
    // credential to authenticate against. This example
    // makes use of the built in `prompt` function to
    // show how a user can be prompted to select a
    // credential. In an actual app, you would replace
    // this with your own UI or you would inject a
    // preselected credential.id.
    let promptText = credentials.map((credential, index) => {
    return `${index}: ${credential.id}\n`;
    });
    let selectedIndex = prompt(promptText, "index");
    if (selectedIndex >= 0 && selectedIndex < credentials.length) {
    let selectedId = credentials[selectedIndex].id;
    return selectedId;
    }
    return "";
});
```

Where the response consists of an object containing a `redirectURL` that you should redirect back to in order to complete the authentication flow, and an optional `message` to display to the user.

```javascript
{
    redirectURL: string;
    message?: string;
}
```

## URL Validation

### Bind Credential URL Validation

This function is used to validate if a given URL is able to be used by the `bindCredential` function.

```javascript
if (embedded.isBindCredentialUrl(url)) {
    // bind the credential using `bindCredential`
}
```

### Authenticate URL Validation

This function is used to validate if a given URL is able to be used by the `authenticate` function.

```javascript
if (embedded.isAuthenticateUrl(url)) {
    // authenticate against a credential bound to the device
}
```

## Credential Management

### Listing Credentials

The `getCredentials` function enables you to get all credentials currently bound to the device.

```javascript
const allCredentials = await embedded.getCredentials();
```

Where the response is a `[Credential]`.

### Deleting a Credential

The `deleteCredential` function allows you to delete a credential given its ID.

```javascript
await embedded.deleteCredential(credential.id);
```
