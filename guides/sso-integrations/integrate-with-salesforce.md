---
title: Integrate Beyond Identity Passwordless Authentication into Salesforce
sidebar_position: 1
---

# Integrate with Salesforce

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Salesforce site.

This guide will cover:
* How to configure Beyond Identity as an Identity Provider
* How to configure Salesforce Auth. Provider to support an OpenID Connect (OIDC) integration

## Prerequisites

Before continuing, make sure that the following prerequisites have been met:
  * Ensure that you have a Salesforce instance available, a developer edition can be obtained for free from Salesforce https://developer.salesforce.com/signup 
  * Ensure you have administrator privileges on the Salesforce instance you are working on.
  * Access to a Beyond Identity tenant and its admin console

## Set up Beyond Identity as an Identity Provider

### Create a Realm and Application in Beyond Identity

### Create a Realm

We need to create a new [Realm](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#realms) to hold identities and configuration: 

<img src="/assets/getting-started-create-realm.gif" width="800px" />

From the Admin Console: 
1. Click the Realm selector on the top-left.
2. Click **Create New Realm**.
3. Type the name of your new realm. Click **Create Realm**.
4. Click **Switch to Realm**.
5. From the Realm's Home page, click Edit. 


### Create an Application

Next, we we'll create a new [Application](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#applications-and-authenticator-configs) that contains the configuration for your end users:

<img src="/assets/getting-started-create-app.gif" width="800px" />

From the Admin Console: 
1. From the navigation bar, click **Applications**, then click **Add app**.
1. Type a name for your new Application. 
1. Scroll to **Redirect URIs**, type `http://localhost/dummy_url`.
1. Ensure **"Token Endpoint Auth Method"** is set to "Client Secret Post".
1. Ensure **"Subject"** is set to "id".
1. Verify that **"PKCE"** is disabled.
1. Click on the Authenticator Config tab, change the Configuration Type to `Hosted Web`.
1. Click Submit to save your changes.


We will overwrite the *Redirect URI* value later in this process, so you can use the dummy value for now.

At this point, your Beyond Identity Admin Console should be configured with a realm and an application set up.

**Application**

![application-config](/assets/sso-sf-appconfig.png)

**Authenticator**

![authenticator-config](/assets/sso-sf-authconfig.png)

### Create an Identity in the BI console
  We will create identities that can login to the Salesforce instance here, and enroll them with a BI credential bound to their device.

  1. In the BI Admin console, click **"Identities"**
  1. If the user you wish to use already exists, skip to step 5.
  1. Click **"Add identity"**
  1. Input the desired Name, Username, and Email (All three are required)
  1. Next, we will send the user an enrollment email to bind a credential to their device.
  1. Follow the steps at [Send Enrollment Emails](/send-enrollment) for each new identity. In the near future, this will become a push-button operation, but for now it involves sending commands via CURL.
  1. Each new identity will receive an Enrollment email, which they click on to bind a credential to their device (desktop, laptop, mobile, etc).


## Configure Salesforce for OIDC

  These steps will help you configure Salesforce to use with Beyond Identity.

  1. Enter the Setup mode in your Salesforce instance using the gear icon situated on top right hand side of the page.
  2. In the quick find bar, search for Auth and you should see a menu item  `Auth. Providers` under `Identity.` Click on `Auth.Providers`
  3. On the `Auth. Providers` screen Click `New` 
  4. Select the provider type to be `Open ID Connect`. The form will expand with several fields to be provided.
  5. Provide a name for the Identity Provider - Beyond Identity might be a good choice here but you can provide any other name that suits your purpose.
  6. For **"Consumer Key"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
  7. For **"Consumer Secret"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
  8. For **"Authorized Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Authorization Endpoint
  9.  For **"Token Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Token Endpoint
  10. For **"Userinfo Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> User Info Endpoint
  11. Leave **"Token Issuer"** blank
  12. For **"Default Scopes"**, paste in "email profile openid"
  13. For **"Send Access Token in Header"** make sure it is checked
  14. For **"Send client credentials in header"** leave it unchecked
  15. For **"Include Consumer Secret in API Responses"** lmake sure it is checked
  16. Leave **"Custom Error URL"** blank
  17. Leave **"Custom Logout URL"** blank
  18. For **"Registration Handler"** click on the link Automatically create a registration handler template to create a handler class. This iwll be created on save.
  19. For **"Execute Registration As"** you can choose a user with admin privileges likek yourself.
  20. For **"Icon url"**, you can provide beyond identity icon url or any other icon url of your choice from the web
  21. Click **"Save"** 
  22. The newly created provider will generate few Urls for you to use as shown in the image

![Salesforce Configuration](/assets/sso-sf-config.png)

### Add the redirect URL to the BI console
The Beyond Identity web authenticator needs to know where to redirect the user after a successful authentication.

1. From the Salesforce `Auth. Provider` main screen click on the name of the newly created configuration. you will see a list of URLs available under Salesforce Configuration section of the page
2. On the BI Admin console, under Applications -> Your new application -> Redirect URIs, paste the callback URL from the previous step
3. Hit **"Submit"** at the bottom of the page.

![Salesforce Callback URLs](/assets/sso-sf-callback.png)

Congratulations, you have configured the BI console and the OIDC client plugin.

### Try logging in

  We will now attempt to log in and verify successful authentication.

  1. Using a device where you have [created an identity and then enrolled a credential](#Create an Identity in the BI console), Visit http://your_hostname/wp-login.php to login
  2. Link Salesforce user's settings under `Setup` -> `Users` select your test user and update the `Federation Id` to be user's email referd in the BI admin console
  3. Setup Salesforce to accept external login provider. Go to `Setup` -> `My Domain` -> `Authenticator Configuration` section and click Edit.
  4. You should see the newly created OIDC setup under the name of Beyond Identity under Authentication Service. Select it along with Login form to enable login with Beyond Identity and USer Name/ Password as alternative
  5. Now, you can log out and Navigate to your login URL.
  6. You will see a Or log in using: `Beyond_Identity` button on the login page. Click it.
  7. You will be redirected to the Beyond Identity Web Authenticator. 
  8. You may see a step-up authentication prompt, depending on how Policy is set up for your tenant.
  9. At the conclusion of a successful authentication, you will be redirected to your Salesforce console, and
  10. You will see several successful authentication events in BI Admin Console -> Events

![Salesforce Login Page URLs](/assets/sso-sf-loginscreen.png)