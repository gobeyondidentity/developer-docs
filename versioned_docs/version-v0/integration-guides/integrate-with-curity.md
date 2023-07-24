---
title: Integrrate With Curity
---

# Introduction

This short guide provides details on how to configure Beyond Identity as an Identity Provider in the Curity Identity Server.

## Prerequisites

* An installation of the Curity Identity Server. A good starting point is to follow the [Getting Started Guide.](https://curity.io/resources/getting-started/)

* Access to a Beyond Identity Tenant and an [OIDC client](../getting-started/oidc-configuration) configured. Make sure to note the `Client ID` & `Client Secret`. Request a tenant [here](../getting-started/create-a-tenant.md) if you do not already have access. 

* An installation of the Beyond Identity Platform Authenticator.

# Configuration

### Beyond Identity

Outside of the prerequisites the only configuration that is needed on the Beyond Identity side is to make sure that an appropriate `redirect_uri` is configured in the OIDC client that is going to be used. Example: `https://idsvr.example.com/authn/authentication/beyond/callback`.

*  `https://idsvr.example.com` is the baseURL configured in the Curity Identity Server 
*  `/authn/authentication` is the default authentication endpoint
*  `/beyond` is the ID of the OpenID Authenticator configured in the Curity Identity Server 
*  `/callback` is indicating that this is the callback where the Beyond Identity Platform
Authenticator should redirect back to when user authentication is completed

![sso-curity-1](../images/sso-curity-1.png)

### The Curity Identity Server

If the Getting Started Guide is followed an OAuth client should have been configured. A new Authenticator needs to be configured.

1. Navigate to `Profiles` -> `Authentication Service` -> `Authenticators` -> Choose `New Authenticator`
2. Give it a name (`beyond` in this documentation) and choose `OIDC` as the type, click Next
3. Add the Configuration URL - `https://auth.byndid.com/v2/.well-known/openid-configuration`
4. Add the `Client ID` obtained from the Beyond Identity Admin UI
5. Add the `Client Secret` obtained from the Beyond Identity Admin UI 
6. Set `Client Authentication Method` to client-secret
7. Enable `Use HTTP Basic Authentication`

# Test using OAuth.tools

Assign the new authenticator to an OAuth client that has the Code Flow enabled in the Curity Identity Server.

Using that client in [OAuth.tools](https://oauth.tools) , initiate a Code Flow. If multiple authenticators are configured for the client select the previously created OIDC Authenticator (beyond).

![sso-curity-2](../images/sso-curity-2.png)

The flow should automatically trigger the Beyond Identity Platform Authenticator, authenticate the user and then direct back to OAuth.tools. If `Auto-redeem code` is enabled an Access Token, Refresh Token and optionally an ID Token should be issued.

