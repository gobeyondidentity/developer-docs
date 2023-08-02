---
title: Integrate with AWS Cognito
id: aws-cognito
description: ''
slug: /aws-cognito
keywords: 
 - aws cognito
pagination_next: null
pagination_prev: null
last_update: 
   date: 8/2/2023
   author: Jen Field
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

This guide provides information on how to set up Beyond Identity as a passwordless authentication provider for an AWS Cognito User Pool.

In this guide, you will:
 - Configure Beyond Identity as an OIDC provider for AWS Cognito
 - Configure AWS Cognito as an OIDC client in Beyond Identity
 - Test the authorization code flow using the Amazon Cognito-hosted UI

## Prerequisites
Before configuring OIDC integration between Beyond Identity and AWS Cognito, you must have a Beyond Identity tenant and realm and an AWS user pool.  

### Create your Beyond Identity tenant

If you still need to create your Beyond Identity tenant, [sign up with Beyond Identity to create one for free](https://www.beyondidentity.com/developers/signup).  
2. Now that you have your tenant, log in. You can access the Beyond Identity Admin Console for your tenant at [BI admin console US](https://console-us.beyondidentity.com/login) or [BI admin console EU](https://console-eu.beyondidentity.com/login), depending on the region you chose when you signed up.   
:::tip  
_If you're signing in from a different computer or browser, you can enter the email address you used when you signed up. Beyond Identity will send you a one-time link to sign in and enroll a passkey from the new browser._   
:::  

Next, you will create a new realm and switch to that realm in your tenant. A realm is just a logical grouping that helps you apply policy later.   

### Create a new realm in Beyond Identity

By default you have only the Beyond Identity Admin realm in your  tenant. In this step, you'll create a new realm to hold the app and identities you will create using this guide.   

import CreateRealmConsole from '../includes/_create-realm-console.mdx';

<CreateRealmConsole />

### Create a User Pool in AWS
The AWS user pool will connect your AWS apps to the Beyond Identity OIDC provider. Follow the steps below to create the user pool.  

1. Go to the [AWS Console](https://console.aws.amazon.com/cognito/home) and choose **User pools**  
2. Choose **Create user pool**  
3. In the **Configure sign-in experience** section:
 - select the Federated identity providers option under **Provider types**
 - select Email under **Cognito user pool sign-in options**
 - under **Federated sign-in options** select OpenID Connect
4. In the **Configure security requirements** section, under **MFA methods**, select Authenticator apps.

 - under **MFA methods** select Authenticator apps
5. In the **Connect federated identity providers** section, click Skip for now, then click Next. (We will add the OIDC provider after we create it below)  
6. In the **Integrate your app** section, do the following:

 - provide a **User pool name**
 - under **Domain**, choose Use a Cognito domain under **Domain type**
 - under **Domain**, enter a domain prefix under **Cognito domain**
 - under **Initial app client** enter an **App client name**
 - under **Allowed callback URLs** enter a callback URL for your app such as 'http://localhost:3000'
7. In the **Review and sreate** section, click **Create user pool**  

:::note  
Part of the default configuration for your App client is that the **client type** is Public and the **Authentication flow** is ALLOW_USER_SRP_AUTH
:::  

## Configure OIDC between Beyond Identity and AWS

### Create AWS as an OIDC client in Beyond Identity
In this section, you'll create a resource server and app in your Beyond Identity realm to represent AWS Cognito.

### Create a resource server

import AddResourceServerConsole  from '../includes/_add-resource-server-console.mdx';  

<AddResourceServerConsole />

Configure the [resource server](/docs/next/add-resource-server) with the following properties:  

| Parameter | Value|
|---|---|  
| Resource Server Name | any name you choose |
| Resource Server Identifier |  Enter a unique identifier such as 'awsresourceserver'. This identifier is included as the audience claim in access tokens minted for your application.  |
| Client Type | Enter one or more scopes, such as 'aws:customclaim', pressing Enter after each scope | 

### Create an application

In the same realm, create a new Application that will contain the configuration for your users.

import AddAppAdminConsole  from '../includes/_add-application-console.mdx';

<AddAppAdminConsole />

Configure the [app](/docs/next/add-an-application) with the following properties:  

| Parameter | Value|
|---|---|  
| Display Name | any name you choose |
| Protocol | OIDC |
| Client Type | Confidential | 
| PKCE | Disabled (Note that PKCE should be used where it is supported, but it is not a requirement for confidential clients.)| 
| Redirect URIs | https://your-user-pool-domain/oauth2/idpresponse, where your-user-pool-domain can be found on your AWS User pool's **App integration** tab under **Domain**|   
| Token Endpoint Auth Method | Client Secret Basic | 
| Grant Type | Authorization Code | 
| Resource Server | select the resource server you created above | 
| Allowed Scopes | select scopes from the set of scopes assigned to the resource server you created above | 
| Subject  (under **Token Configuration**) | email |  
| Configuration Type (on the **Authenticator Config** tab) | Hosted Web |  
| all other options | use the default values for the remaining options |  

<br/>  

Click **Submit** to save the app.  

### Add a Federated OIDC IDP to the User Pool in AWS
In this section, you will configure your AWS user pool with an OIDC connection to the Beyond Identity app you created above.  

1. Go to the [AWS Console](https://console.aws.amazon.com/cognito/home) and choose **User pools**  
2. Select user pool you created above  
3. Click **Sign-in experience**  
4. Under **Federated identity provider** click **Add identity provider**
5. Under **Identity provider** select OpenID Connect (OIDC)
 - Enter a **Provider name** (note that the name cannot have spaces)
 - For **Client ID**, enter the **Client ID** from the Beyond Identity app you created above
 - For **Client secret**, enter the **Client Secret** from the Beyond Identity app you created above
 - for **Authorized scopes** enter `openid` followed by other scopes you wish to request, space delimited, for example `openid aws:customclaim`
 - For **Issuer URL** enter the **Issuer** value from the Beyond Identity app you created above  
6. Under **Map attributess...**, for the required attribute 'email', enter **OpenID Connect attribute** `sub`.
7. Click **Add identity provider**

## Update Hosted UI to point to the new Federated Provider
Now, you will connect your user pool's app client to the OIDC provider you created above.  

1. Go to [AWS Console](https://console.aws.amazon.com/cognito/home) and choose **User pools**  
2. Select the user pool you created above  
3. Click the **App integration** tab
4. Scroll down to **App client list** and select your App client
5. Scroll down to **Hosted UI** and click Edit
6. Under **Identity providers**, in the drop down list for **Select identity providers**. select the federated provider you created above
7. Click **Save changes**

## Test OIDC connection
Now you will use AWS Cognito's "Hosted UI" test tool to test the integration.  

1. Go to the [AWS Console](https://console.aws.amazon.com/cognito/home) and choose **User pools**  
2. Select the user pool you created above  
3. Click the **App integration** tab 
4. Scroll down to **App client list** and select your App client
5. Under **Hosted UI** click **View Hosted UI** 

## Next steps
As a result of the test above, you should have an authorization code returned to your app client's redirect URI, such as 'http://localhost:3000/?code={authorization_code}  
Next, your app will need to exchange that code for an access token and optionally id token and refresh token.  
<mark>in process: guidance for code for token exchange and authorization</mark>  

## Reference
See the following articles for more information on the AWS Cognito configuration steps described in this guide:  
[Adding OIDC identity providers to a user pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html)   
[Create a user pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html)  
[Add an app client and set up the hosted UI](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-configuring-app-integration.html)  

