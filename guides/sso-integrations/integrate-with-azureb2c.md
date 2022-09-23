---
title: Integrate With Azure AD B2C
sidebar_position: 5
---

# Integrate With Azure AD B2C

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider in an Azure AD environment. In this scenario, the Beyond Identity Hosted Web Authenticator will be used, but an almost identical process can be followed should you wish to use the Beyond Identity embedded web or native SDKs.

This guide will cover:

* Prerequisites
* How to configure Beyond Identity as an Identity Provider
* How to configure an Azure AD B2C tenant as a relying party to Beyond Identity
* Testing
* More Complex Integrations

## Prerequisites

Before continuing, make sure the following prerequisites have been met:

* Access to an Azure AD B2C tenant with admin privileges
* Access to a Beyond Identity tenant with admin privileges. If necessary, sign up for a tenant at https://www.beyondidentity.com/developers/signup
* Add a realm to your Beyond Identity tenant to contain your application and users (separate to the default Admin realm). See https://developer.beyondidentity.com/docs/v1/using-bi-for-auth

## Configure Beyond Identity as an Identity Provider

### Create OIDC Application (to represent Azure AD B2C client)

1. Log into the Beyond Identity Admin portal (https://console-us.beyondidentity.com or https://console-eu.beyondidentity.com), select the **Applications** tab, and select **Add app**.

2. Fill in the following fields:


**Client Configuration**

* Display Name = MS AD B2C

* Protocol = OIDC

* Client Type = Confidential

* PKCE = Disabled

* Redirect URIs = https://{your-tenant-name}.b2clogin.com/{your-tenant-name}.onmicrosoft.com/oauth2/authresp 

OR 

If you use a custom domain, enter https://{your-domain-name}/{your-tenant-name}.onmicrosoft.com/oauth2/authresp 

(Replace {your-tenant-name} with the name of your tenant, and {your-domain-name} with your custom domain)

- Token Endpoint Auth Method = Client Secret Post

- Resource Server = None

**Token Configuration**

- Subject = email     (see "More Complex Integrations" section below for further discussion)

**Authenticator Config** (on separate tab)

- Configuration Type = Hosted Web

3. Click **Submit**

  <img src="/assets/application.png" width="400px" />

4. Select the newly created OIDC client configuration and make a note of the **Discovery Endpoint**, **Client ID** and **Client Secret** as these will be used in the next steps.


## Configure the Identity Provider within MS AD B2C

1. Register an application. For a tutorial, see https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga

2. Within the Azure portal, select **Identity Providers**, and then select **New OpenID Connect provider**.

2a. Fill in the following fields (others can be left at default):

* Name = Beyond Identity

* Metadata url = {enter the Beyond Identity Discovery Endpoint value noted in the previous section}

* Client ID = {enter the Beyond Identity Client ID value noted in the previous section}

* Client secret = {enter the Beyond Identity Client secret value noted in the previous section}

* Scope = openid     (see "More Complex Integrations" section below for further discussion regarding scopes and claims mappings)

* Response type = code

Identity provider claims mapping (when using user flow policies, Azure AD B2C is only able to extract a single identifier from the sub(ject) of the Beyond Identity identity token)

* User ID = sub

* Display name = sub

* Email = sub

2b. Select **Save**.

3. Create a user flow policy. (More details can be found at https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-user-flow)

3a. Within the Azure portal, under **Policies**, select **User flows** and then select **New user flow**

  <img src="/assets/User Flow.png" width="700px" />

3b. On the **Create a user flow** page, select the **Sign up and sign in** user flow.

  <img src="/assets/select-user-flow-type.png" width="700px" />

3c. Under **Version**, select **Recommended**, and then select **Create**

  <img src="/assets/select-version.png" width="700px" />

3d. Enter a **Name** for the user flow. For example, "Signup_Signin_BI". Note "B2C_1_" will prepend the name.

3e. For Identity providers, select the **Custom identity provider** (Beyond Identity) you created earlier. Optionally, select **Email signup** if you want to have the ability to support local accounts (using passwords)

3f. For **user attributes and claims**, in this simple scenario we are using the Beyond Identity-provided email address, so simply select the option to collect **Email address**

3g. Select **Show more...** and choose to Return the following two claims: **Email Addresses** and **Identity Provider**

3h. Select **OK** and then **Create**



## Testing

### Create a Test User

1. Within the Beyond Identity Admin portal, if you don't already have a test user in the same realm as the new application, select Identities > Add identity.

2. Enter the following values:

- Email: <email_address>

- Username: <user_name>

- Name: <full_name>

3. Select the new user identity and take note of the ID, which you will need in the next step.


### Create Credential Binding Job

The user will need to register a credential (passkey) in order to be able to authenticate via the application you created. For production usage, the user/credential registration flow would be implemented by your application, but for testing purposes, the user passkey will be created and delivered manually. (In future, this will be possible to perform via the Admin portal)

With WebAuthn, browsers restrict passkey usage to the domain where registration took place. This domain could relate to the hosted Web Authenticator (https://auth-{us|eu}.beyondidentity.com) or the customer's own application (when using an embedded SDK). As a result, when generating a credential binding job, it is important to reference the specific configured authenticator for the application.

Note; the admin user credential/passkey automatically generated as part of the Beyond Identity tenant signup process can NOT be used for testing access, as it was registered for the admin console service at either https://console-us.beyondidentity.com or https://console-eu.beyondidentity.com. As a result browsers will not permit that passkey to be used in order to access your own application.

 1. Within the Beyond Identity Admin portal, select your application and choose the **Authenticator Config** tab.

 2. Take note of the **Authenticator Config ID** value

 3. Make an API call to create the credential binding job. Use a delivery methd of "**EMAIL**" to receive the binding token url within an email, or use "**RETURN**" to receive the url within the API response. In either case, open the link within the browser you wish to use for testing. For more information see https://developer.beyondidentity.com/api/v1#tag/Credential-Binding-Jobs/operation/CreateCredentialBindingJob.

**Request:**

```mac tab
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
```win tab
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


 The user now has a registered passkey within their chosen browser which is able to be used for authentcation to any application that is using the Hosted Web Authenticator within your tenant/realm.

### Invoke Authentication Flow

It isn't actually necessary to test the integration from your application as Azure AD B2C includes a test utility.

1. Within the Azure portal, select the **user flow** you created earlier.

2. At the top of the user flow overview page, select **Run user flow**. A pane opens at the right side of the page.

3. For **Application**, select your web application that you previously registered. The **Reply URL** should show https://jwt.ms, rather than the real Reply URL for your application. That URL is a test target application for displaying identity tokens.

4. Select **Run user flow**. If your user flow is only configured to use the Beyond Identity IdP, you will be taken directly to Beyond Identity for authentication. Otherwise, you will be presented with an Azure AD B2C login/register form from where you should select the Beyond Identity option.

5. If this is the first time that the test user has authenticated, then Azure AD will prompt the user to verify their email address by sending an email containing an OTP which the user must enter to the login form and verify

  <img src="/assets/email verify.png" width="400px" />

6. Following authentication (and email verification, if required), observe the decoded identity token that is returned by Beyond Identity

  <img src="/assets/token.png" width="700px" />


## More Complex Integrations

As mentioned earlier, when using user flow policies, Azure AD B2C is only able to extract a single identifier from the sub(ject) of the Beyond Identity identity token. It does NOT attempt to retrieve additional claims from Beyond Identity's userinfo endpoint.

If the additional cliams are required then it is necessary to configure a custom policy rather than a standard user flow in order to invoke the userinfo endpoint. See https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-custom-policy for more details.

In this case, it would be recommended to change the Beyond Identity application confiiguration to send the "ID" rather than email as the Subject parameter. Additionally, it will be necessary to set the Identity Provider configuration within Azure AD B2C to request additional scopes:

- **email** - which will return the user's email attribute

- **profile** - which will return the user's Name and Username unique ID

In this way, all Beyond Identity user attributes are avaialble to be consumed and mapped within Azure AD B2C as required.
