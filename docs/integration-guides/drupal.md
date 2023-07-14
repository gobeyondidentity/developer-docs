---
title: Integrate with Drupal
id: drupal
description: "Learn how to make your Drupal admin login more secure by setting up Beyond Identity as a passwordless authentication provider."
slug: /drupal
keywords: 
 - drupal
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/20/2023
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
<mark>I'm starting to wonder if this would fit better under <b>Authentication > Hosted Web > Integrations</b> and then call it "Authenticate Drupal apps", or something similar.</mark>
</p>

Make your Drupal admin login more secure!

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for a Drupal admin panel login.
 

In this guide, you'll:

- Configure Beyond Identity as an Identity Provider
- Install and configure the required module to support an OpenID Connect (OIDC) integration

## Prerequisites

Before continuing, make sure that the following prerequisites have been met:

- A [Beyond Identity developer account](https://www.beyondidentity.com/developers/signup).

- A live Druapl site running and administrator privileges to install and configure modules.


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
  | **Redirect URIs** | Use your application's App Scheme or Universal URL. This URL will also be generated for you in the OIDC module. You can always come back to change it.<br /><br />Your real redirect URI follows the pattern:<br /><br /> `https://${your-website-domain.com}/openid-connect/${client_machine_name}` | 
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


Once you have an application in the Admin Console, you are ready to provision users in your realm's directory, generate passkeys, and handle those passkeys in your application.

### Create an Identity

User creation can be done in the admin console or through an API. This guide will use the admin console. 

:::note important
<mark>Shouldn't this be a prerequisite? Think of it as a "main" ingredient to "this" recipe.</mark> It's best if the user is already in the Drupal system. An excellent place to start is for yourself as the administrator. Also, make sure that the Username matches the Drupal Username. 
:::

import AddAnIdentity from '../includes/_add-an-identity.mdx';

<AddAnIdentity />

See [Directory](/docs/next/platform-overview#directory) for more information about identities (users) and groups.

### Generate a passkey

Once you have an identity, you can generate a passkey in the Admin Console. 

:::note important
Users can bind multiple devices and browsers. Whichever browser or device is used to enroll is where the user can log into your Drupal site. If the user wants to log in from a different browser or device, you'll need to send the user another email to bind that new browser/device. Also, private/incognito browsers act as different browsers in this case.
:::

import BindPasskeyToAnIdentity from '../includes/_bind-passkey-to-an-identity-send-an-email-to-user.mdx';

<BindPasskeyToAnIdentity />

For more information, see [How passkeys are created](/docs/next/universal-passkeys#how-passkeys-are-created).

## Configure the OpenID Connect Drupal module

The module allows you to use an external OpenID Connect login provider to authenticate and log in users on your site. Existing users are automatically logged into your Drupal site, while new users get created in Drupal.

### Install the OIDC module

This guide is based on the [OpenID Connect / OAuth client](https://www.drupal.org/project/openid_connect) and requires administrative privileges to install to your Drupal site.

Install the OIDC module as you would install a contributed Drupal module. 

### Configure the module 

You'll use Generic OAuth 2.0 to configure the module. After you've enabled the module, you'll add the required values from your application you created in the Beyond Identity Admin Console.

1. Log into you Drupal admin console.

2. Go to **Home > Administration > Configuration > People > OpenID Connect clients**.

3. Under the **Clients** tab, select and enable **+ Generic OAuth 2.0**.

  ![drupal-client-configuration](../images/integration-guides/drupal-select-client.png)

1. Navigate to **Add OpenID Connect client**. 

2. Enter **Beyond Identity** for the name.

3. Enter the values from the External Protocol tab of the application you created in the Beyond Identity Admin Console.

  | Property | Beyond Identity Admin Console value | 
  | --- | --- |
  | **Client ID** | Client ID |
  | **Client Secret Key** | Client Secret |
  | **Allowed domains** | _Ignore this field_ |
  | **Authorization endpoint** | Authorization Endpoint |
  | **Token endpoint** | Token Endpoint |
  | **Userinfo endpoint** | User Info Endpoint |
  | **End Session endpoint** | _Leave blank_ |
  | **Scopes** | email profile openid |

1. Click **Create OpenID Connect client**.

  A redirect URL is generated. 

  <p><mark>Will they need to add the Redirect URL to the app in the Beyond Identity Admin Console? The original content implies that this is optional.</mark></p>

  ![module-configuration](../images/integration-guides/drupal-oidc-config.png)

### Allow exisiting users to login

You can allow existing users in your Drupal system to login.

1. Select the **Settings** tab and configure the plugin to the settings you prefer.

2. From the Advanced tab, select the **Automatically connect exisiting users** checkbox.

  ![drupal-settings-configuration](../images/integration-guides/drupal-setting-user.png)

### Enable new user creation on successful login


If you send a passkey to a user not in your Drupal system, the login fails. You can mitigate that by overriding a setting.  

1. Select the **Settings** tab.

1. Select the **Override registration settings** checkbox. 

  This assigns a new user as an `authenticated user` with no other defined role. You can change the user's role in your Drupal admin settings.

  ![drupal-override-registration](../images/integration-guides/drupal-override-registration.png)

### Display login button on user login form

There are two ways to do this. You can either add a block provided by the module, or configure the **openID button display in user login form** in Settings. The easiest option is to configure the Settings.

Choose the option that works best for your site:

- **Hidden**: hides the login button and best to use when displaying a block

- **Above**: displays the login button above the login form

- **Below**: displays the login button below the login form

- **Replace**: hides the core login form and only shows the OIDC login option

![drupal-settings-button](../images/integration-guides/drupal-setting-button.png)

### Try logging in

Test the log in and verify successful authentication.

1. From the same browser where you generated a passkey, visit your `/user/login` admin page.

2. Click **Login with Beyond Identity**.

  You'll be redirected to the Beyond Identity Web Authenticator.

1. Depending on how Policy is set up for your tenant, you may see a step-up authentication prompt.

  Aftert a successful authentication, you'll be redirected to your Drupal site. You'll also see successful authentication events in the Beyond Identity Admin Console under **Events**.