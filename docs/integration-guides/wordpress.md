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
   date: 07/07/2023
   author: Patricia McPhee
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---
import { Alert, Col, Row } from 'antd';

<Row>
  <Col span={6}>
    <Alert message="Ready for review" type="success" />
  </Col>
</Row>
<br />


<p>
<mark>I'm starting to wonder if this would fit better under <b>Authentication > Hosted Web > Integrations</b> and then call it "Authenticate WordPress apps", or something similar.</mark>
</p>

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Drupal admin panel login.
 

In this guide, you'll:

- Configure Beyond Identity as an Identity Provider
- Install and configure the required plugin to support an OpenID Connect (OIDC) integration

## Prerequisites

Before continuing, make sure that the following prerequisites have been met:

- A [Beyond Identity developer account](https://www.beyondidentity.com/developers/signup).

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
  | **Protocol** | OIDC |
  | **Client Type** | Confidential | 
  | **PKCE** | Disabled  | 
  | **Redirect URIs** | `http://localhost/dummy_url`<br /><br />We will overwrite the _Redirect URI_ value later in this process, so you can use the dummy value for now. | 
  | **Token Endpoint Auth Method** | Client Secret Post | 
  | **Resource Server** | None |
  | **Grant Type** | <mark>What's recommended for this particular use case?</mark> | 
  | **Token Format** | <mark>What's recommended for this particular use case?</mark> | 

  <br />

  <h4>Token Configuration</h4>

  | Property | Value | 
  | --- | --- |
  | **Expires** | <mark>What's recommended for this particular use case?</mark> |
  | **Subject** | id |  
  | **Token Signing Algorithm** | <mark>What's recommended for this particular use case?</mark> |

1. Click the **Authenticator Config** tab, select **Hosted Web** as the Configuration Type and click **Submit** to save the new app.  


At this point, your Beyond Identity Admin Console should be configured with a realm and an application set up.


### Create an Identity 

You'll create identities that can login to the Wordpress site here, and enroll them with a Beyond Identity credential bound to their device.

<p><mark>Does the user need to be in WordPress before this step? Also, does the username need to match in both systems?</mark></p>

import AddAnIdentity from '../includes/_add-an-identity.mdx';

<AddAnIdentity />

See [Directory](/docs/next/platform-overview#directory) for more identity information.

### Generate a passkey

Once you have an identity, you can generate a passkey in the Admin Console. 

:::note important
 Users can bind multiple devices and browsers. Whichever browser or device is used to enroll is where the user can log into your Drupal site. If the user wants to log in from a different browser or device, you'll need to send the user another email to bind that new browser/device. Also, private/incognito browsers act as different browsers in this case.
:::

import BindPasskeyToAnIdentity from '../includes/_bind-passkey-to-an-identity-send-an-email-to-user.mdx';

<BindPasskeyToAnIdentity />

For more information, see [How passkeys are created](/docs/next/universal-passkeys#how-passkeys-are-created).

## Configure the OpenID Connect WordPress plugin

When configured with Beyond Identity, the plugin automatically authenticates users against OpenID Connect OAuth2 API with Authorization Code Flow. After obtaining consent, existing users are automatically logged into your WordPress site, while new users get created in your WordPress database.

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

1. Using a device where you have [created an identity and then enrolled a credential](#create-an-identity), go to http://your_hostname/wp-login.php to test authentication.

2. Click the **Login with OpenID Connect** button. You'll be redirected to the Beyond Identity Web Authenticator.

4. You may see a step-up authentication prompt, depending on how **Policy** is set up for your tenant.

5. At the conclusion of a successful authentication, you'll be redirected to your WordPress admin console. 

6. From the Beyond Identity Admin Console, go to **Events** to view several successful authentication events. 
