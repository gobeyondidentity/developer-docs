---
title: Integrate Beyond Identity Passwordless Authentication into NextAuth
sidebar_position: 1
---

# Integrate with NextAuth

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a NextAuth site.

This guide will cover:
  * How to configure Beyond Identity as an Identity Provider
  * How to install the required NextAuth plugins to support an OpenID Connect (OIDC) integration
  * How to configure the OIDC NextAuth plugin

## Prerequisites

Before continuing, make sure that the following prerequisites have been met:
  * Ensure that you have a live NextAuth site running and administrator privileges to install and configure a plugin
  * Access to a Beyond Identity tenant and its admin console. If necessary, sign up for a tenant at https://www.beyondidentity.com/developers/signup

## Set up Beyond Identity as an Identity Provider

### Create a Realm and Application in Beyond Identity

### Create a Realm

We need to create a new [Realm](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#realms) to hold identities and configuration:

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
	<iframe src='https://demo.arcade.software/eyWvI91g13J7qj5vmCfD?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
	</iframe>
</div>

From the Admin Console:
  1. Click the Realm selector on the top-left.
  2. Click **Create New Realm**.
  3. Type the name of your new realm. Click **Create Realm**.
  4. Click **Switch to Realm**.
  5. From the Realm's Home page, click Edit.

### Create an Application

Next, we we'll create a new [Application](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#applications-and-authenticator-configs) that contains the configuration for your end users:

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
	<iframe src='https://demo.arcade.software/KmtiNsx4Z31MkogQdwST?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
	</iframe>
</div>

From the Admin Console: 
  1. From the navigation bar, click **Applications**, then click **Add app**.
  1. Type a name for your new Application.
  1. Scroll to **Redirect URIs**, type `http://localhost:3000`.
  1. Ensure **"Token Endpoint Auth Method"** is set to "Client Secret Post".
  1. Ensure **"Subject"** is set to "id".
  1. Verify that **"PKCE"** is enabled.
  1. Click on the Authenticator Config tab, change the Configuration Type to `Hosted Web`.
  1. Click Submit to save your changes.

We will overwrite the *Redirect URI* value later in this process, so you can use the dummy value for now.

At this point, your Beyond Identity Admin Console should be configured with a realm and an application set up.

**Application**

![application-config](/assets/nextauth-application-config.png)

**Authenticator**

![authenticator-config](/assets/nextauth-authenticator-config.png)

### Create an Identity in the BI console

We will create identities that can login to the NextAuth site here, and enroll them with a BI credential bound to their device.

1. In the BI Admin console, click **"Identities"**
1. If the user you wish to use already exists, skip to step 5.
1. Click **"Add identity"**
1. Input the desired Name, Username, and Email (All three are required)
1. Next, we will send the user an enrollment email to bind a credential to their device.
1. Follow the steps at [Send Enrollment Emails](send-enrollment) for each new identity. In the near future, this will become a push-button operation, but for now it involves sending commands via CURL.
1. Each new identity will receive an Enrollment email, which they click on to bind a credential to their device (desktop, laptop, mobile, etc).

## Configure NextAuth for OIDC

### Install the free Plugin

This guide is based on the popular [Available OAuth providers](https://authjs.dev/reference/providers/oauth-builtin) which is regularly updated and has many thousands of Active installations.

Follow the installation steps specified in the [Beyond Identity](https://authjs.dev/reference/oauth-providers/beyondidentity) Guide

### Configure the plugin

These steps will help you configure the plugin to use with Beyond Identity.

1. Keep the Beyond Identity Admin Console open in a tab or window to copy and paste values in
1. Create three Environment Variables: BEYOND_IDENTITY_CLIENT_ID, BEYOND_IDENTITY_CLIENT_SECRET, BEYOND_IDENTITY_ISSUER
1. For **"BEYOND_IDENTITY_CLIENT_ID"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
1. For **"BEYOND_IDENTITY_CLIENT_SECRET"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
1. For **"BEYOND_IDENTITY_ISSUER"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Issuer

### Add the redirect URL to the BI console

The Beyond Identity web authenticator needs to know where to redirect the user after a successful authentication.

1. On the BI Admin console, under Applications -> Your new application -> Redirect URIs, set the Redirect URL
    - If you do not know your redirect, this can be found by clicking on the "Sign in with Beyond Identity" button, checking the url, and decoding the "redirect_uri" parameter.
1. Hit **"Submit"** at the bottom of the page.

Congratulations, you have configured the BI console and the OIDC client plugin.

### Try logging in

We will now attempt to log in and verify successful authentication.

1. Using a device where you have [created an identity and then enrolled a credential](#create-an-identity-in-the-bi-console), Visit your app or website to login
1. You will see a "Sign in with Beyond Identity" button. Click it.
1. You will be redirected to the Beyond Identity Web Authenticator.
1. You may see a step-up authentication prompt, depending on how Policy is set up for your tenant.
1. At the conclusion of a successful authentication, you will be redirected to your NextAuth console, and
1. You will see several successful authentication events in BI Admin Console -> Events
