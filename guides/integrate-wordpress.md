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
  * Access to a Beyond Identity tenant

## Set up Beyond Identity as an Identity Provider

### Create a Realm and Application in Beyond Identity

Please follow the instructions in our Getting Started guide to [Create a Realm and Application](https://developer.beyondidentity.com/docs/v1/getting-started#8-configure-beyond-identity-to-manage-identities-for-your-app).

We will overwrite the *Redirect URI* and *Trusted Origin* values later in this process, so you can use the dummy values from the linked guide above.

At this point, your Beyond Identity Admin Console should be configured with a realm and an application set up.

### Set up an Authenticator Config for your app
  This will set up an Authenticator

  1. In the BI Admin console, Click Application -> Your new application -> Authenticator Config
  1. Set "Configuration Type" -> "Hosted Web" and **Submit**. 

  ** SCREENSHOT FOR AUTHENTICATOR CONFIG** TODO

### Create an Identity in the BI console
  We will create identities that can login to the Wordpress site here, and enroll them with a BI credential bound to their device.

  1. In the BI Admin console, click **"Identities"**
  1. If the user you wish to use already exists, skip to step XXXX TODO
  1. Click **"Add identity"**
  1. Input the deisred Name, Username, and Email (All three are required)
  1. Next, we will send the user an enrollment email to bind a credential to their device.
  1. Follow the steps at [Send Enrollment Emails](/send-enrollment). In the near future, this will become a push-button operation, but for now it involves sending commands via CURL.

## Configure Wordpress for OIDC

### Install the free Plugin

  This guide is based on the popular [OpenID Connect Generic Client](https://wordpress.org/plugins/daggerhart-openid-connect-generic/) which is regularly updated and has many thousands of Active installations.

  This will require administrative privileges on your Wordpress installation.

  Follow the installation steps specified in the [OpenID Connect Generic Client Installation Guide](https://wordpress.org/plugins/daggerhart-openid-connect-generic/#installation)

### Configure the plugin

  These steps will help you configure the plugin to use with Beyond Identity.

  1. Log into you Wordpress admin console
  1. Keep the Beyond Identity Admin Console open in another tab or window to copy and paste values in
  1. Go to Settings -> OpenID Connect Client
  1. For **"Login Type"**, set "OpenID Connect botton on login form"
  1. For **"Client ID"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client ID
  1. For **"Client Secret Key"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Client Secret
  1. For **"OpenID Scope"**, paste in "email profile openid"
  1. For **"Login Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Authorization Endpoint
  1. For **"Userinfo Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> User Info Endpont
  1. For **"Token Validation Endpoint URL"**, copy and paste the value from Applications -> Your New Application -> External Protocol -> Token Endpoint
  1. Leave **"End Session Endpoint URL"** blank
  1. Leave **"ACR values"** blank
  1. For **"Identity Key"**, use 'sub'
  1. For **"Nickname Key"**, use 'sub'
  1. Click the checkbox beside **"Enable Logging"** to give a better ability to debug any issues.
  1. Leave all other settings with the defaults. You are free to change them, but ymmv as some may have unpredictable results.
  1. Click **"Save Changes"**

TODO SCREENSHOT OF COMPLETED CONFIG


### Try logging in

  Attempt to log in and 