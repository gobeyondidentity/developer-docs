---
title: Integrate With Auth0
sidebar_position: 1
---

# Introduction

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider in an Auth0 environment.

This guide will cover:
* How to configure SSO for Beyond Identity's Admin Portal
* How to configure Beyond Identity as an Identity provider
* How to Provision and Deprovision users when Auth0 is the master directory

:::info
You can find us in the [Auth0 Marketplace](https://marketplace.auth0.com/integrations/beyond-identity).
:::

## Prerequisites

Before continuing, make sure the following prerequisites have been met:

  * Ensure that you have an Auth0 account with admin privileges
  * Access to a Beyond Identity tenant. If necessary, sign up for a tenant at https://www.beyondidentity.com/developers/signup

## Configure SSO for Beyond Identity Admin portal

The Beyond Identity Admin portal can either be accessed using Auth0 or using Beyond Identity as the Identity provider (default). The following steps should be implemented if Auth0 will be the SSO provider for access into Beyond Identity's Admin Portal. 

**Step 1. Set Up the Beyond Identity Admin Portal application**
1. From the left side menu, select **Applications** and click **+ Create Applications**.

![create-app-auth0](/assets/sso-auth0-create-app-auth0.png)

2. Name the application **Beyond Identity Admin Portal**, and set the **Application Type** as **Regular Web Application**.
3. Select **Create**.

![create-app](/assets/sso-auth0-create-app.png)

4. On the **Settings** tab, scroll down and make note of the **Domain**, **SSO Client ID**, and **SSO Client Secret**. You will need these in the next step.

![admin-portal-config](/assets/sso-auth0-admin-portal-config.png)

5. *Optional:* To add a Beyond Identity logo, scroll down to **Application Properties** and in the **Application Logo** field, copy in the following link:

   * `https://byndid-public-assets.s3-us-west-2.amazonaws.com/logos/beyondidentity.png`

6. Scroll down to **Application URIs** and fill in the following values:

   * Application Login URI: `https://admin.byndid.com/login`

   * Allowed Callback URLs: `https://admin.byndid.com/auth/callback`

![app-uris](/assets/sso-auth0-app-uris.png)

7. Scroll down to the end of the page and click **Save Changes**. 

**Note:** All other settings should be left with default values.

### Set Up Admin Portal Access

Make a note of the **Domain**, **Auth0 Client ID**, and **Auth0 Client Secret** from the previous step. These values will be used to configure access to the Beyond Identity Admin Portal.

1. Log in to the Beyond Identity Admin portal and select **Account Settings**.

![admin-portal](/assets/sso-auth0-admin-portal.png)

2. Select the **Admin Console** tab, and click **Edit SSO**.

![admin-console-sso](/assets/sso-auth0-admin-console-sso.png)

3. Update the **SSO Issuer**, **SSO Client ID**, and **SSO Client Secret** from Step 3.4 and click **Save Changes.**

:::note
SSO Issuer is the domain URL in Auth0.
:::

![sso-config-params](/assets/sso-auth0-sso-config-params.png)

## Add Beyond Identity as an Identity Provider

Depending on your Auth0 subscription (license) you can add Beyond Identity as an identity provider using the [Enterprise OIDC connection](integrate-with-auth0#enterprise-oidc-connection) or as a [custom social OAuth2.0 connection](integrate-with-auth0#custom-social-oauth20-connection). 

### Create an Inbound OIDC client in Beyond Identity

1. Log into the Beyond Identity Admin portal, select the **Integrations** tab, and select **OIDC Clients**.

2. Select **Add OIDC Client** and fill in the following fields:

   * Name = Auth0 SSO 

   * Redirect URL = `https://DOMAIN.auth0.com/login/callback`

   * Replace `DOMAIN` with your Auth0 domain URL

  example: `https://byndid-auth0-demo.us.auth0.com/login/callback`

Leave **Token Signing Algorithm** and **Auth Method** with their default  values.

3. Click **Save Changes**. 

![oidc-client](/assets/sso-auth0-oidc-client.png)

4. Select the newly created OIDC client configuration and make a note of the **Client ID** and **Client Secret** as these will be used in the next steps.

![edit-sso](/assets/sso-auth0-edit-sso.png)

### Enterprise OIDC Connection

1. On the left side menu, click **Authentication**,  and click **Enterprise** from the expanded menu.
2. On the **Enterprise Connections** page,  click **Open ID Connect**.

![enterprise-config](/assets/sso-auth0-enterprise-config.png)

3.  Then within the Open ID Connect menu click ‘Create Connection’
4. Enter the following values:
   * Connection Name: “Beyond-Identity”
   * Issuer URL: “https://auth.byndid.com/v2”
   * Client ID: From OIDC client created in Beyond Identity
   * Client Secret: From OIDC client created in Beyond Identity

![new-oidc-config](/assets/sso-auth0-new-oidc-config.png)


5. Click **Create**.

6. On the **Settings** tab under **Issuer URL**, click **Show Issuer Details** and add the following values to the appropriate fields:

|Beyond Identity endpoint | URL |
|----------------------------------|--- |
| Issuer                  | `https://auth.byndid.com/v2` |
| Authorization endpoint  | `https://auth.byndid.com/authorize` |
| Token endpoint          | `https://auth.byndid.com/v2/token` |
| JWKS endpoint           | `https://auth.byndid.com/v2/.well-known/jwks.json` |
| User Info endpoint      | `https://auth.byndid.com/v2/userinfo` |

![sso-config-auth0](/assets/sso-auth0-sso-config-auth0.png)

7.  Scroll down to **Scopes** and enter **openid**.


![sso-oidc-config](/assets/sso-auth0-sso-oidc-config.png)

8. Click **Save Changes**.
9. Scroll up and click the **Login Experience** tab.


![experience-customize](/assets/sso-auth0-experience-customize.png)

10. Under this tab, find the section called **Connection button** and check (enable) the checkbox field labelled **Display connection as a button**.
11. Enter the ‘Button display name’ as “Beyond Identity”.
12. Add the following URL for the :point-down:  
      
**Button Logo URL** - https://byndid-public-assets.s3-us-west-2.amazonaws.com/logos/beyondidentity.png

![display-connection](/assets/sso-auth0-display-connection.png)

13. Scroll down and click **Save**.

### Custom Social (OAuth2.0) Connection

1. On the left side menu, click **Authentication**, and from the expanded menu, click **Social**.
2. On the **Social Connections** page,  click the **+ Create Connection** button in the top right corner:

![custom-auth](/assets/sso-auth0-custom-auth.png)

3. On the **New Social Connection** page, scroll down to the last option called **Create Custom**.

![enable-connection](/assets/sso-auth0-enable-connection.png)

4. On the new connection form, enter the following values:
* Connection Name: “Beyond-Identity”
* Authorization URL: `https://auth.byndid.com/v2/authorize`
* Token URL: `https://auth.byndid.com/v2/token`
* scope: `openid email`
* Client ID: From OIDC client created in Beyond Identity
* Client Secret: From OIDC client created in Beyond Identity
* Enter the following code snippet under ‘Fetch User profile Script’

```javascript
function(accessToken, ctx, cb) {

  request.get('https://auth.byndid.com/v2/userinfo',    {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
   },
    function(err, r, body) {
      if (err) {
        return cb(err);
      }
      try {
        var profile = JSON.parse(body);
        profile.provider = 'beyond';
        profile.id = profile.id;
        profile.displayName = profile.display_name;
        profile.email = profile.email;
        cb(null, profile);
      } catch (e) {
        cb(e);
      }
    });
}
```

5. Leave the other values as default and click **Create**.

6. The connection is then saved and the ‘Applications’ tab will be displayed. You can now configure which applications should use this connection. Use the toggle switches to enable the connection for the applications you wish to use Beyond identity with. 

7. If you are using Auth0 hosted pages, the button text and button logo must be be updated. Auth0 only supports this via the API at the point rather than through the UI. You can follow the Auth0 docs here to configure this last part:
   * https://auth0.com/docs/v0/connections/social/oauth2#modify-the-icon-and-display-name
   * The Beyond Identity logo URL is: https://byndid-public-assets.s3-us-west-2.amazonaws.com/logos/beyondidentity.png

**Note:** We recommend labelling the button ‘Beyond Identity’ or ‘Passwordless’.

8. If you are using your own login form, you can add the button manually and call the authorize endpoint specifying the connection parameter where the connection is the name of the connection you just created as documented here:
   * https://auth0.com/docs/v0/connections/social/oauth2#log-in-using-the-custom-connection
   * Auth0’s API reference: https://auth0.com/docs/v0/api/authentication#social 

### Enable the Beyond Identity connection in Auth0

1. From the left side menu, select **Connections → Enterprise → Beyond-Identity → Applications**.

2. Enable the OIDC connection or Custom OAuth2.0 connection for the Beyond Identity Admin portal and any applications you wish to user Beyond Identity for.

![callback)](/assets/sso-auth0-callback.png)

### Confirm Callback URL

**Important** Check the Auth0 callback URL is correct the in Beyond Identity OIDC integration

1. In Auth0, under the **Settings** tab of the **Beyond Identity OIDC connection** created in Step 8, make a note of the Callback URL as shown below:

![callback-confirm](/assets/sso-auth0-callback-confirm.png)

2. Navigate to the Beyond Identity Admin portal, select the **Integrations tab**, and click **OIDC Clients**. Select the OIDC client that was created in Step 4 and click **Edit**.

3. Ensure that the **Redirect URI** value matches the value in the Auth0 connection. If the values do not match, update the value with the **Callback URL** from Auth0.

## User Provisioning

**Setting up test users**

Before users can start authenticating with Beyond Identity, they must be provisioned in the Beyond Identity Directory. As Auth0 does not support SCIM, users must be manually provisioned using the Beyond Identity Admin Portal or using the [Create User](ref:createuser) API. See the Admin Portal video tutorial that shows how to navigate to the directory area of the admin portal. 

https://www.beyondidentity.com/resources/beyond-identity-admin-console-overview

1. In the **Admin Portal** under the **Directory** tab, select **Add User**.

2. Enter the following values:

   * External ID:** user_id in Auth0, for example: oidc | Beyond-Identity | <email_address>**

   * Email: **<email_address>**

   * Username: **<email_address>**

   * Display Name: **<Full_Name>**

**Note:** The External ID format above must be adhered to as this will be the user ID of the user in Auth0.

## User Deprovisioning

To deprovision users from the Beyond Identity experience, access the Beyond Identity Admin Portal and manually delete the appropriate user(s).

