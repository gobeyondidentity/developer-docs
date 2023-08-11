---
title: Integrate with WordPress
id: wordpress
description: "Learn how to set up Beyond Identity as a passwordless authentication provider for a Wordpress site."
slug: /wordpress
keywords: 
 - wordpress
pagination_next: null
pagination_prev: null
last_update: 
   date: 08/07/2023
   author: Anna Garcia
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

import ProtocolOIDC from '../includes/_protocol_oidc.mdx';
import HostedWeb from '../includes/_hosted-web.mdx';
import ClientTypeConfidential from '../includes/_client-type_confidential.mdx';
import GrantTypeAuthorizationCode from '../includes/_grant-type_authorization-code.mdx';


This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Wordpress site.
 

In this guide, you'll:

1. Configure Beyond Identity as an Identity Provider
1. Install and configure the required plugin to support an OpenID Connect (OIDC) integration

## Prerequisites

Before continuing, make sure that the following prerequisites have been met:

- A [Beyond Identity developer account](https://beyondidentity.com/developers).

- A live WordPress site running and administrator privileges to install and configure the OpenID Connect Generic Client plugin.

## Set up Beyond Identity as an Identity Provider

To set up Beyond Identity as an Identity Provider, you need to create a Realm to hold identities and configuration. Inside that realm, you'll need to create an [Application](/docs/next/add-an-application) that contains the authentication flow configuration. These can be configured in you admin console that was created for you when you signed up for a developer account.

### Create a Realm

import CreateRealmAdminConsole from '../includes/_create-realm-console.mdx';

<CreateRealmAdminConsole />

### Create an Application

import AddAppAdminConsole  from '../includes/_add-application-console.mdx';

<AddAppAdminConsole />

3. On the **External Protocol** tab, use the following values to complete this tab.  

  <br />

  <h4>Client Configuration</h4>

  | Property | Value | 
  | ----------- | ----------- |
  | **Protocol** | OIDC<br /><ProtocolOIDC/> |
  | **Client Type** | Confidential<br /><ClientTypeConfidential/> |
  | **PKCE** | Disabled  | 
  | **Redirect URIs** | This URL will also be generated for you in the OIDC plugin. You can always come back to change it.<br /><br />Your redirect URI follows the pattern:<br /><br />`https://${your-website-domain.com}/wp-admin/admin-ajax.php?action=openid-connect-authorize` | 
  | **Token Endpoint Auth Method** | Client Secret Post | 
  | **Grant Type** | Authorization Code<br /><GrantTypeAuthorizationCode/> |
  | **All other options** | Use the default values for the remaining options | 

  <br />

1. Click the **Authenticator Config** tab and use the following values. 
  
  | Property | Value | 
  | ----------- | ----------- |
  | **Configuration Type** | Hosted Web <br /><HostedWeb/> |
  | **Authentication Profile** | Use the recommended values for the remaining options |

1. Click **Submit** to save the new app.

At this point, your Beyond Identity Admin Console should be configured with a realm and an application set up. The Hosted Web handles passkey registration and authentication for you, including generating new passkeys, presenting users with authenticator choice options as needed, and validating passkey assertions. You are now ready to configure the OpenID Connect WordPress plugin.

## Configure the OpenID Connect WordPress plugin

This plugin allows you to use an external OpenID Connect login provider to authenticate and log in users on your site. Existing users are automatically logged into your WordPress site, while new users get created in your WordPress database. 

:::note
User roles will need to be managed from your Wordpress dashboard. New users created in your WordPress database will have a default user role. 
:::

### Install the plugin

You're required to have administrative privileges in WordPress.

Follow the installation steps specified in the [OpenID Connect Generic Client Installation Guide](https://wordpress.org/plugins/daggerhart-openid-connect-generic/#installation).

### Configure the plugin

After you've installed the plugin, you'll add the required values from your application you created in the Beyond Identity Admin Console.

1. Log into you Wordpress admin console.

1. Go to **Settings > OpenID Connect Client** and select **OpenID Connect button on the login form** for the **Login Type**. 

  | WordPress field | Beyond Identity value | 
  | --- | --- |
  | **Client ID** | Copy and paste the **Client ID** value from your application's **External Protocol** tab. |
  | **Client Secret Key** | Copy and paste the **Client Secret** value from your application's **External Protocol** tab. |  
  | **OpenID Scope** | paste in "email profile openid" |
  | **Login Endpoint URL** | Copy and paste the **Authorization Endpoint** value from your application's **External Protocol** tab. |
  | **Userinfo Endpoint URL** | Copy and paste the **User Info Endpoint** value from your application's **External Protocol** tab. |
  | **Token Validation Endpoint URL** | Copy and paste the **Token Endpoint** value from your application's **External Protocol** tab. |
  | **End Session Endpoint URL** | Leave blank |
  | **ACR values** | Leave blank |
  | **Identity Key** | Enter **sub** as the value. |
  | **Nickname Key** | Enter **sub** as the value. |

  ![Screenshot of a WordPress plugin configuration settings page. The user interface displays various options and fields for customizing the plugin's functionality. Users can modify settings, adjust preferences, and tailor the plugin according to their specific needs.](../images/integration-guides/wordpress-plugin-config.png)

1. Make sure you enable "create user if they do not exist".

1. Click the checkbox next to **Enable Logging** to select it.  This option lets you debug any issues.

1. Leave all other settings with the defaults. You are free to change them, but you may have unpredictable results.

1. Click **Save Changes**.

### Add the redirect URL to your app in Beyond Identity

The Beyond Identity web authenticator needs to know where to redirect the user after a successful authentication.

1. From the WordPress admin console, select **Settings > OpenID Connect Client** , and under the **Notes** section, copy the **Redirect UI**.

3. From the Beyond Identity Admin Console, under **Applications**, select your application, scroll down to the **Redirect URIs** field and paste the URL from the previous step. 

4. Scroll to the bottom of the page and click **Submit**.

Congratulations! You have configured the Beyond Identity Admin Console and the OIDC client plugin.

### Test access

In this final step, you'll attempt to log in and verify successful authentication.

1. Go to http://your_hostname/wp-login.php to test authentication.

1. Click the **Login with OpenID Connect** button. You'll be redirected to the Beyond Identity Web Authenticator.

1. At the conclusion of a successful authentication, you'll be redirected to your WordPress admin console (or your users to your site depending on thier role). 

1. From the Beyond Identity Admin Console, go to **Events** to view several successful authentication events. 
