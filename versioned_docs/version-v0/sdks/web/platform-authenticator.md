---
title: Platform Authenticator
---

## Introduction

The Beyond Identity Authenticator is a native branded authenticator app which uses our core technology to authenticate users without a password. You can read up on our core technology [here](../../introduction.md#how-it-works) . The Authenticator is available on iOS, Android, Windows, MacOS and Linux and can be downloaded from our [download page](https://app.byndid.com/downloads).

This guide provides information on how to:
* Implement Beyond Identity as a passwordless authentication method for a Customer Identity Access Management (CIAM) use case.
* Integrate with Beyond Identity using the OIDC / OAuth2.0 protocol

You should continue with this guide if you want to implement passwordless authentication for a custom web application using Beyond Identity's platform authenticator. If you are looking to integrate a native iOS or Android app with the platform authentication please head over to the [Android Authenticator SDK](../android/authenticator-sdk.md) or the [iOS Swift Authenticator SDK](../swift/embedded-sdk.md)

### Prerequisites 

* Access to a Beyond Identity tenant
* Access to a client library that implements the OpenID Connect standard in the implementer’s language of choice. 

:::info Live Demo
Visit our [Acme Pay demo](https://acme-app.byndid.com/) to try out the experience for yourself.
:::

## Implementation Details
The Beyond Identity platform has two components. 
* A cloud based system where our OIDC IDP, analytics, auditing and policy reside. 
* A client based Platform Authenticator which could be: 
     * Stand-alone, implemented by Beyond Identity and deployed by users to their own endpoints. 
  * Embedded (SDKs), applications embed the Beyond Identity authentication flow into their web or 
                    native clients. 

In both cases the authentication flow is implemented using the Open ID Connect protocol as specified in: OpenID Connect Core 1.0

Implementers of the authentication flow can use freely available open source OpenID Client libraries to initiate an authentication request against the Beyond Identity Cloud based OIDC IDP. 

As an example if you wanted to implement Beyond Identity with a Node.js Web Application you can use the OpenID Connect middleware library `openid-client`. [openid-client](https://www.npmjs.com/package/openid-client) is a server side OpenID Relying Party (RP, Client) implementation for Node.js runtime, that supports [passport](http://passportjs.org/).

### OIDC Endpoints and Protocol Information

:::note OIDC Configuration
All URLs used during the authentication sequence described in the next two sections can be found in the [OpenID configuration](https://auth.byndid.com/v2/.well-known/openid-configuration).
:::

|Beyond Identity endpoint | URL |
|----------------------------------|--- |
| Issuer                  | `https://auth.byndid.com/v2` |
| Authorization endpoint  | `https://auth.byndid.com/authorize` |
| Token endpoint          | `https://auth.byndid.com/v2/token` |
| JWKS endpoint           | `https://auth.byndid.com/v2/.well-known/jwks.json` |
| User Info endpoint      | `https://auth.byndid.com/v2/userinfo` |

Token Response:

```json
{
  "access_token": "<ACCESS_TOKEN>",
  "token_type": "Bearer",
  "id_token": "<ID_TOKEN>",
  "expires_in" "<TOKEN_EXPIRE_TIME_SEC>"
}
```

Only if `openid` is provided as a value in the scope parameter of the `/authorize` request will the `id_token` be returned in the response. 

### User Info Endpoint:

The UserInfo endpoint can be used to retrieve other values associated with the user account like `email`, `external_id`, `internal_id` and `name`. Calls to the User Info endpoint are authenticated by using the `Access token` returned from the Token endpoint above.

```json
{
    "email": "<EMAIL>",
    "external_id": "<EXTERNAL_ID>",
    "id": "<INTERNAL_ID>",
    "name": "<NAME>",
    "preferred_username": "<EMAIL>",
    "sub": "<USERNAME>"
}
```

## Enroll users

To register new users for use with the platform authenticator you will need to create a self-service sign-up flow or provision users manually either via the admin console or [API](ref:createuser).

We have provided some guidance on how we recommended creating a self service sign-up flow with Beyond Identity's APIs. You can follow the [User Sign-up flow](../../integration-guides/user-sign-up-flow.md) guide or take a look at the [Create User](ref:createuser) endpoint.


