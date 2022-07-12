---
title: Using Beyond Identity for Authentication
sidebar_position: 2
---
In this guide we will show you how to create a tenant, an application, configure the application, and how to integrate with the Beyond Identity Embedded SDK

### Tenant Setup

Create a tenant via the self signup form:

https://console-us.beyondidentity.com/signup

After creating a tenant, you will be redirected to an Admin Console for the newly created tenant.

### Create a new Realm

Click the drop down on the top left corner and add a new realm. [[Screenshot](./screenshots/NewRealm.jpg)] 

### Create an Application

- Click 'Applications' in the left menu
- Click 'Create app'
- Ensure to fill out values for display name, client type, and redirect uris
- Client Type
  - Confidential clients are applications that are able to securely authenticate with the authorization server, for example being able to keep their registered client secret safe.

  - Public clients are unable to use registered client secrets, such as applications running in a browser or on a mobile device.
- After the protocol configuration is finished, modify your authenticator config
  - [Authenticator Config Reference](https://developer-docs-git-v1-beyondidentity.vercel.app/docs/v1/platform-overview/authenticator-config#embedded)

[[Created App Screenshot](./screenshots/AppCreated.jpg)]

### Create a test identity

Before users can start authenticating with Beyond Identity, they must be provisioned in the Beyond Identity Directory. As Auth0 does not support SCIM, users must be manually provisioned using the Beyond Identity Admin Portal or using the [Create User](ref:createuser) API. See the Admin Portal video tutorial that shows how to navigate to the directory area of the admin portal. 

https://www.beyondidentity.com/resources/beyond-identity-admin-console-overview

- In the 'Admin Portal' under the 'Directory' tab, select 'Add User'.

- Enter the following values:

   - External ID: user_id in Auth0, for example: oidc | Beyond-Identity | <email_address>

   - Email: '<email_address>

   - Username: '<email_address>

   - Display Name: '<Full_Name>

### Craft your authorize URL

A full authorization request url has additional parameters that we need to account for

```
https://authorization-server.com/auth?
response_type=code
&client_id=29352735982374239857
&redirect_uri=https://example-app.com/callback
&scope=create+delete
&state=xcoivjuywkdkhvusuye3kch
```

An application that is configured as public will need additional query parameters:

```
code_verifier=[random string]
&code_challenge=[SHA256 hash of code_verifier]
&code_challenge_method=[S256|plain]
```