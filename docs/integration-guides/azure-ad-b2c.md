---
title: Integrate with Azure AD B2C
id: azure-ad-b2c
description: "Learn how to set up Beyond Identity as a passwordless authentication provider in an Azure AD environment."
slug: /azure-ad-b2c
keywords: 
 - azure ad b2c
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/16/2023
   author: Patricia McPhee
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';




This guide provides information on how to set up Beyond Identity as a passwordless authentication provider in an Azure AD environment. 

In this scenario, you'll use the Beyond Identity Hosted Web Authenticator, but an almost identical process can be followed should you wish to use the Beyond Identity Embedded SDK.

In this guide, you'll:

1. Configure Beyond Identity as an Identity Provider

1. Configure an Azure AD B2C tenant as a relying party to Beyond Identity

## Prerequisites

Before continuing, make sure you've met the following prerequisites:

* Access to an Azure AD B2C tenant with admin privileges

* Access to a Beyond Identity tenant with admin privileges. Sign up for a [developer account](https://www.beyondidentity.com/developers/signup) to create your Beyond Identity tenant.

## Configure Beyond Identity as an Identity Provider


### Create a realm

Add a realm to your Beyond Identity tenant to contain your application and users (separate from the default Admin realm).

import CreateRealmAdminConsole from '../includes/_create-realm-console.mdx';

<CreateRealmAdminConsole />

### Create OIDC Application 

The application you create in this step will represent the Azure AD B2C client.

import AddAppAdminConsole  from '../includes/_add-application-console.mdx';

<AddAppAdminConsole />

3. On the **External Protocol** tab, use the following values to complete this tab.  

  <h4>Client Configuration</h4>

  | Property | Value | 
  | ----------- | ----------- |
  | **Protocol** | OIDC |
  | **Client Type** | Confidential | 
  | **PKCE** | Disabled  | 
  | **Redirect URIs** | https://{your-tenant-name}.b2clogin.com/{your-tenant-name}.onmicrosoft.com/oauth2/authresp<br /><br />If you use a custom domain, enter https://{your-domain-name}/{your-tenant-name}.onmicrosoft.com/oauth2/authresp <br /><br />Replace **{your-tenant-name}** with the name of your Azure tenant, and **{your-domain-name}** with your custom domain.  | 
  | **Token Endpoint Auth Method** | Client Secret Post | 
  | **Resource Server** | None |
  | **Grant Type** | <mark>What's recommended for this particular use case?</mark> | 
  | **Token Format** | <mark>What's recommended for this particular use case?</mark> | 

  <h4>Token Configuration</h4>

  | Property | Value | 
  | --- | --- |
  | **Expires** | <mark>What's recommended for this particular use case?</mark> |
  | **Subject** | email | 

1. Click the **Authenticator Config** tab, select **Hosted Web** as the Configuration Type, and click **Submit**.

  ![](../images/application.png)

1. Select the newly created OIDC client configuration, copy and save the following values because you'll need them in the next step:
   
   - **Discovery Endpoint**

   - **Client ID**

   - **Client Secret**


## Configure Azure AD B2C

1. [Register an application](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga). <mark>Shouldn't this be a prerequisite?</mark>

2. In the Azure portal, select **Identity Providers > New OpenID Connect provider** and use the following values. Then click **Save**.
  
  ![](../images/azure-ad-b2c-identity-providers-new-oidc-connection.png)

  | Property | Value | 
  | ----------- | ----------- |
  | **Name** | Beyond Identity |
  | **Metadata url** | Beyond Identity Discovery Endpoint value |
  | **Client ID** | Beyond Identity Client ID value |
  | **Client secret** | Beyond Identity Client secret value |
  | **Scope** | openid<br /><br />For more details on scopes and claims mappings, see [More Complex Integrations](#more-complex-integrations). |
  | **Response type** | code |
  | **Response mode** | <mark>What's recommended for this use case? This field is required.</mark> |
  | **User ID** | sub |
  | **Display name** | sub |
  | **Email** | sub |
  | **All other options** | Use the default values for the remaining options |

1. Under **Policies**, select **User flows**, and then select **New user flow**. 

    ![](https://learn.microsoft.com/en-us/azure/active-directory-b2c/media/tutorial-create-user-flows/sign-up-sign-in-user-flow.png)

2. On the **Create a user flow** page, select the **Sign up and sign in** user flow.

    ![](https://learn.microsoft.com/en-us/azure/active-directory-b2c/media/tutorial-create-user-flows/select-user-flow-type.png)

3. Under **Version**, select **Recommended**, and then select **Create**.

    ![](https://learn.microsoft.com/en-us/azure/active-directory-b2c/media/tutorial-create-user-flows/select-version.png)

4. Enter a **Name** for the user flow. For example, *Signup\_Signin\_BI*. Note ***B2C\_1\_*** will prepend the name.

5. For **Identity providers**, select the **Custom identity provider** (Beyond Identity) you created earlier. 

  :::tip
  Optionally, select **Email signup** if you want to have the ability to support local accounts (using passwords).
  :::

4. For **User attributes and claims**, select the option to collect **Email address**. In this scenario, we're using the Beyond Identity-provided email address. 

5. Select **Show more** to expand the list and, in the **Return claim** column, select the following: 
  
   - **Email Addresses** 

   - **Identity Provider**

6. Select **OK** and then **Create**.



## Test the configuration

<p><mark>Can we rework this section? We are creating a test user, binding a passkey to the test user's identity, and making an API (which isn't mentioned in the "Bind a passkey to an identity" topic).</mark></p>

### Create a Test User

Create the identity in the same realm as the test app. 

import AddAnIdentity from '../includes/_add-an-identity.mdx';

<AddAnIdentity />

4. Select the new user identity and copy and paste the ID because you'll need it in the next step.


### Create Credential Binding Job

The user must register a credential (passkey) to authenticate via your created application. For production usage, the user/credential registration flow would be implemented by your application, but for testing purposes, the user passkey will be created and delivered manually. In the future, performing via the Admin Console will be possible.

With WebAuthn, browsers restrict passkey usage to the domain where registration occurred. This domain could relate to the hosted Web Authenticator (https://auth-{us|eu}.beyondidentity.com). As a result, when generating a credential-binding job, it is important to reference the specific configured authenticator for the application.

:::caution
You won't be able to use the admin user credential/passkey automatically generated as part of the Beyond Identity tenant signup process to test access. It was registered for the Admin Console service at either https://console-us.beyondidentity.com or https://console-eu.beyondidentity.com. As a result, browsers will not permit that passkey to access your own application.
:::

import PasskeyBindingMethods from '../includes/_passkey-binding-methods.mdx';

 1. Within the Beyond Identity Admin Console, select your application and click the **Authenticator Config** tab.

 2. Copy and paste the **Authenticator Config ID** value.

 3. Make an API call to create the credential binding job. 

  <PasskeyBindingMethods />

  Open the link within the browser you wish to use for testing. For more information, see [Create a New Credential Binding Job](https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs/operation/CreateCredentialBindingJob).

**Request:**

<Tabs groupId="bind-os">
<TabItem value="mac" label="macOS">

```bash
curl -X POST \
-H "Authorization: Bearer $API_TOKEN" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "job": {
    "delivery_method": "EMAIL",
    "authenticator_config_id": "$AUTH_CONFIG_ID"
  }
}' https://api-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credential-binding-jobs
```

</TabItem>
<TabItem value="win" label="Windows">

```bash
curl -X POST \
-H "Authorization: Bearer %API_TOKEN%" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "job": {
    "delivery_method": "EMAIL",
    "authenticator_config_id": "%AUTH_CONFIG_ID%"
  }
}' "https://api-%REGION%.beyondidentity.com/v1/tenants/%TENANT_ID%/realms/%REALM_ID%/identities/%IDENTITY_ID%/credential-binding-jobs"
```

</TabItem>
</Tabs>

The user now has a registered passkey within their chosen browser, which they can use to authenticate any application using the Hosted Web Authenticator in your tenant/realm.

### Invoke Authentication Flow

Testing your application's integration is optional, as Azure AD B2C includes a test utility. 

1. Select the **User flow** you created earlier in the Azure portal.

2. At the top of the user flow overview page, select **Run user flow**. A pane opens at the right side of the page.

3. For **Application**, select the web application that you previously registered. The **Reply URL** should show https://jwt.ms rather than the real Reply URL for your application. That URL is a test target application for displaying identity tokens.

4. Select **Run user flow**. If you configure your user flow only to use the Beyond Identity IdP, you'll be taken directly to Beyond Identity for authentication. Otherwise, you'll see the Azure AD B2C login/register form from where you should select the Beyond Identity option.

5. If this is the first time the test user has authenticated, Azure AD prompts the user to verify their email address by sending an email containing an OTP, which the user must enter into the login form and verify.

  ![](../images/email-verify.png)

6. Following authentication (and email verification, if required), observe the decoded identity token that Azure returns.

  ![](../images/token.png)


## More Complex Integrations

<p><mark>If I'm reading this correctly, this section is only talking about one additional thing that the user can do --> Configure a custom policy. If that's the case, the title of this section should be changed.</mark></p>

As mentioned earlier, when using user flow policies, Azure AD B2C is only able to extract a single identifier from the sub(ject) of the Beyond Identity identity token. It does NOT attempt to retrieve additional claims from Beyond Identity's userinfo endpoint.

If additional claims are required, it is necessary to configure a custom policy rather than a standard user flow to invoke the userinfo endpoint. See https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-custom-policy for more details.

In this case, we recommend changing the Beyond Identity application configuration to send the "ID" rather than email as the Subject parameter. Additionally, it will be necessary to set the Identity Provider configuration within Azure AD B2C to request additional scopes:

- **email** - which will return the user's email attribute

- **profile** - which will return the user's Name and Username unique ID

All Beyond Identity user attributes can be consumed and mapped within Azure AD B2C as required.