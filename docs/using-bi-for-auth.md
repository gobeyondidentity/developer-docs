---
title: Using Beyond Identity for Authentication
sidebar_position: 2
---
In this guide, we will show you how to create a tenant and and application, as well as how to configure that application in order to authorize and authenticate against Beyond Identity

### Tenant Setup

Create a tenant via the self signup form:

https://console-us.beyondidentity.com/signup

After creating a tenant, you will be redirected to an Admin Console for the newly created tenant.

### Create a new Realm

Realms are unique administrative domains within a tenant. All new tenants have a default realm called Beyond Identity Admin which should not be used to configure for delegate IDP purposes.

Click the drop down on the top left corner and add a new realm. [[Screenshot](./screenshots/NewRealm.jpg)]

### Create an Application

- Click 'Applications' in the left menu
- Click 'Create app'
- Fill out the display name with whatever you want to name this app
- Select the client type:
  - Confidential clients are applications that are able to securely authenticate with the authorization server, for example being able to keep their registered client secret safe.

  - Public clients are unable to use registered client secrets, such as applications running in a browser or on a mobile device.

- Set the redirect_uri to be a URL where you want to receive the authorization code and state. This can be either:
  - An app scheme or Universal URL / App Link if you're implementing this in a native application
  - A URL to any page in your web application

- After the protocol configuration is finished, modify your authenticator config
  - [Authenticator Config Reference](https://developer-docs-git-v1-beyondidentity.vercel.app/docs/v1/platform-overview/authenticator-config#embedded)

[[Created App Screenshot](./screenshots/AppCreated.jpg)]

### Create a test identity

Before users can start authenticating with Beyond Identity, they must be provisioned in the Beyond Identity Directory. As Auth0 does not support SCIM, users must be manually provisioned using the Beyond Identity Admin Portal or using the [Create User](https://developer.beyondidentity.com/api/create-user) API. See the Admin Portal video tutorial that shows how to navigate to the directory area of the admin portal. 

https://www.beyondidentity.com/resources/beyond-identity-admin-console-overview

- In the 'Beyond Identity Console' under the 'Identities' tab, select 'Add Identity'.

- Enter the following values:

   - Email: <email_address>

   - Username: <user_name>

   - Name: <full_name>

### Craft your authorize URL

A full authorization request url has additional parameters that we need to account for. You can find the base URL under your application. [Screenshot](./screenshots/AppCreated.jpg)]

```
https://auth-us.beyondidentity.com/v1/tenants/<tenant_id>/realms/<realm_id>/applications/<application_id>/authorize?
response_type=code
&client_id=<client_id_from_application>
&redirect_uri=<redirect_uri from application>
&scope=openid
&state=<state>
```

An application that is configured as public will need additional query parameters:

```
&code_challenge=[SHA256 hash of code_verifier]
&code_challenge_method=[S256|plain]
```