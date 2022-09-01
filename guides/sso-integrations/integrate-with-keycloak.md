---
title: Integrate With KeyCloak
sidebar_position: 3
---

# Integrate With Keycloak

This document provides information on how to configure Beyond Identity as a new OIDC identity provider for your Keycloak instance.

:::note
The steps in this guide were tested using KeyCloak v10.0.0.
:::

## Prerequisites
Before continuing, make sure you have the following:

* A Keycloak instance with Administration Console access allowing you to configure a new Identity Provider under an existing or new realm in your Keycloak instance.

* ### Create a Tenant
Navigate here to [Create a Tenant](https://www.beyondidentity.com/developers/signup).

Once your tenant has been created with Beyond Identity, you can continue to create an Application. 

## Configuration

To integrate with Keycloak:

**Step 1. Configure an OIDC Identity Provider**

1. Create an Identity Provider of type **OpenID Connect v1.0**. 

![sso-keycloak-1](/assets/sso-keycloak-1.png)

2. Configure your new Identity Provider using the values from the table below into the **Add identity provider** window:

![sso-keycloak-2](/assets/sso-keycloak-2.png)

## Configuration Values

| Name | Value |
|--- | --- |
| Alias | byndid-oidc | 
| Display Name | Beyond Identity |
| Enabled | On |
| Store tokens | Your preferred setting (default: False) |
| Stored Tokens Readable | Your preferred setting (default: Off) |
| Trust Email | Your preferred setting (default: Off) |
| Account Linking Only | Your preferred setting (default: Off) |
| Hide on Login Page | Your preferred setting (default: Off) |
| GUI Order | Your preferred setting (default: empty) |
| First Login Flow | Your preferred setting (default: first broker login) |
| Post Login Flow | Your preferred setting (default: empty) |
| Sync Mode | Your preferred setting (default: import) |
| Authorization URL | `https://auth-us.beyondidentity.com/v1/tenants/${tenant_id}/realms/${realm_id}/applications/${application_id}/authorize` |
| Pass Login Hint | On |
| Pass current locale | On |
| Token URL | `https://auth-us.beyondidentity.com/v1/tenants/${tenant_id}/realms/${realm_id}/applications/${application_id}/token` |
| Logout URL | empty |
| Backchannel Logout | Off |
| Disable User Info | On |
| User Info URL | empty |
| Client Authentication | Client secret as basic auth |
| Client ID | Value supplied by Beyond Identity |
| Client Secret | Value supplied by Beyond Identity |
| Issuer | `https://auth-us.beyondidentity.com/v1/tenants/${tenant_id}/realms/${realm_id}/applications/${application_id}` |
| Default Scopes | openid |
| Prompt | Your preferred setting (default: unspecified) |
| Accepts prompt=none forward from client |  Off |
| Validate signatures | Off |
| Allowed clock skew | empty |
| Forwarded Query Parameters | empty |

**Step 2: Enable the Identity Provider**

1. Navigate to the Authentication configuration page.
2. Under Identity Provider Redirector, click **Actions > Config**. 
3. Under **Alias**, type the alias assigned to the Identity Provider created in Step 1 (byndid-oidc). 
4. Click **Save**. 

![sso-keycloak-3](/assets/sso-keycloak-3.png)

**Step 3: Test the integration**

1. Open a new Incognito Mode browser bindow. 
2. Navigate to the Login Page of the realm under which the Beyond Identity Provider was configured. 
3. Login with Beyond Identity.

![sso-keycloak-4](/assets/sso-keycloak-4.png)

## Token Exchange

Token Exchange is Technology Preview in Keycloak and is not fully supported yet. This feature is disabled by default. Refer to the following instructions to enable this feature:

https://www.keycloak.org/docs/latest/securing_apps/#_token-exchange 

The following steps are required if you want to embed the Beyond Identity SDKs within native applications. When using the embedded SDK the authentication occurs directly between the native application and the Beyond Identity cloud, if Keycloak is being used as your CIAM SSO, the Beyond Identity user also needs to be authenticated with your SSO.

The token exchange grant supports this flow and is also used in native social authentication scenarios, for example Sign-in with Apple where the authentication takes place natively between the device OS with Apple OIDC server.

You can read more about the use cases for the Token Exchange grant here: https://datatracker.ietf.org/doc/html/rfc8693 

## Configuring the Token Exchange

Perform the following steps to configure the token exchange for the Beyond Identity provided created above:

**Step 1: Enable the token exchange permission for the Identity Provider**

1. From the left navigation pane, click **Identity Providers**.
2. When the Identity Providers section loads, choose the **Beyond Identity** provider from the list as shown below:

![sso-keycloak-5](/assets/sso-keycloak-5.png)

3. Click the **Permissions** tab:

![sso-keycloak-6](/assets/sso-keycloak-6.png)

4. Toggle the **Permissions Enable** switch to **On** and then select the **token-exchange** option from within the table that appears in the window.

![sso-keycloak-7](/assets/sso-keycloak-7.png)

5. From the left side menu, click **Clients** to open the Clients page. . 

6. Click the **Create Policy** drop-down option associated with **Apply Policy** highlighted below:

![sso-keycloak-8](/assets/sso-keycloak-8.png)

7. Select **Client** from the drop-down list:

![sso-keycloak-9](/assets/sso-keycloak-9.png)

:::note 
Leave the other fields with their default values.
:::

**Step 2: Add a client policy**

1. Enter a **Name** for the client policy,  for example, ‘Exchange Beyond Identity Token’.
2. Optionally, enter a description.
3. For the **Clients** field, select the OIDC client from the drop-down list that you want to allow this exchange for (that is, the native app which will allow Beyond Identity tokens to be exchanged).

![sso-keycloak-10](/assets/sso-keycloak-10.png)

:::note
If you have not already created a client for your application you will need to do so.
:::

4. Click **Save**.

The Policy is added to the token-exchange permission from the previous screen as shown below:

![sso-keycloak-11](/assets/sso-keycloak-11.png)

5. **Click Save**.

Setup is now complete.

## Testing the Exchange

Once you have completed the above steps, the token exchange permission is ready to test. You can test this with a simple CURL command:

```bash
curl -X POST \
-d "client_id=<client_name>" \
--data-urlencode "grant_type=urn:ietf:params:oauth:grant_type:token_exchange" \
-d "subject_token=<Beyond_Identity_issued_access_token>" \
-d "subject_issuer=<name_of_identity_provider_configured_in_keycloak>" \
--data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:access_token" \
"<https://<keycloack_domain>/auth/realms/demo/protocol/openid_connect/token>
```

Replace the following placeholders shown above with your information:

   * `<client_name>`
   * `<3rd_party_issued_access_token>`
   * `<name_of_identity_provider_configured_in_keycloak>`
   * `http://localhost:8080/auth/realms/jamie_demo/protocol/openid_connect/token`

For more information on token exchange configuration, see the Keycloak documentation: 

https://www.keycloak.org/docs/latest/securing_apps/#external-token-to-internal-token-exchange
