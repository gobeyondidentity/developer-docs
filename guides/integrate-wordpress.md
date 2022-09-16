---
title: Integrate Beyond Identity Passwordless Authentication into Wordpress
sidebar_position: 1
---

# Integrate with Wordpress

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Wordpress site.

This guide will cover:
* How to configure Beyond Identity as an Identity Provider
* How to install the required Wordpress plugins to support an OpenID Connect (OIDC) integration
* How to configure the OIDC Wordpress plugin

## Prerequisites

Before continuing, make sure that the following prerequisites have been met:
  * Ensure that you have a live Wordpress site running and administrator privileges to install and configure a plugin
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

![application-config](/assets/wordpress-application-config.png)

**Authenticator**

![authenticator-config](/assets/wordpress-authenticator-config.png)

### Create an Identity in the BI console
  We will create identities that can login to the Wordpress site here, and enroll them with a BI credential bound to their device.

  1. In the BI Admin console, click **"Identities"**
  1. If the user you wish to use already exists, skip to step 5.
  1. Click **"Add identity"**
  1. Input the desired Name, Username, and Email (All three are required)
  1. Next, we will send the user an enrollment email to bind a credential to their device.
  1. Follow the steps at [Send Enrollment Emails](send-enrollment) for each new identity. In the near future, this will become a push-button operation, but for now it involves sending commands via CURL.
  1. Each new identity will receive an Enrollment email, which they click on to bind a credential to their device (desktop, laptop, mobile, etc).


## Configure Wordpress for OIDC

### Install the free Plugin

  This guide is based on the popular [OpenID Connect Generic Client](https://wordpress.org/plugins/daggerhart-openid-connect-generic/) which is regularly updated and has many thousands of Active installations.

  This will require administrative privileges on your Wordpress installation.

  Follow the installation steps specified in the [OpenID Connect Generic Client Installation Guide](https://wordpress.org/plugins/daggerhart-openid-connect-generic/#installation)

### Configure the plugin

  These steps will help you configure the plugin to use with Beyond Identity.

  1. Log into you Wordpress admin console
  1. Keep the Beyond Identity Admin Console open in another tab or window to copy and paste values in
  1. In the Wordpress admin console, go to Settings -> OpenID Connect Client
  1. For **"Login Type"**, set "OpenID Connect button on login form"
  1. For **"Client ID"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
  1. For **"Client Secret Key"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
  1. For **"OpenID Scope"**, paste in "email profile openid"
  1. For **"Login Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Authorization Endpoint
  1. For **"Userinfo Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> User Info Endpoint
  1. For **"Token Validation Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Token Endpoint
  1. Leave **"End Session Endpoint URL"** blank
  1. Leave **"ACR values"** blank
  1. For **"Identity Key"**, use 'sub'
  1. For **"Nickname Key"**, use 'sub'
  1. Click the checkbox beside **"Enable Logging"** to give a better ability to debug any issues.
  1. Leave all other settings with the defaults. You are free to change them, but ymmv as some may have unpredictable results.
  1. Click **"Save Changes"**

![plugin-configuration](/assets/wordpress-plugin-config.png)

### Add the redirect URL to the BI console
The Beyond Identity web authenticator needs to know where to redirect the user after a successful authentication.

1. From the Wordpress admin console -> Settings -> OpenID Connect Client , under the "Notes" section, copy the Redirect UI
1. On the BI Admin console, under Applications -> Your new application -> Redirect URIs, paste the URL from the first step
1. Hit **"Submit"** at the bottom of the page.

Congratulations, you have configured the BI console and the OIDC client plugin.

### Try logging in

  We will now attempt to log in and verify successful authentication.

  1. Using a device where you have [created an identity and then enrolled a credential](#Create an Identity in the BI console), Visit http://your_hostname/wp-login.php to login
  1. You will see a "Login with OpenID Connect" button. Click it.
  1. You will be redirected to the Beyond Identity Web Authenticator. 
  1. You may see a step-up authentication prompt, depending on how Policy is set up for your tenant.
  1. At the conclusion of a successful authentication, you will be redirected to your wordpress console, and
  1. You will see several successful authentication events in BI Admin Console -> Events
