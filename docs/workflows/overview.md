---
title: Overview
sidebar_position: 5
# Display h2 to h2 headings
toc_min_heading_level: 2
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to integrate Beyond Identity into your application

When thinking about how to integrate Beyond Identity into your application keep this in mind:
 - Beyond Identity provides a number of user onboarding, passkey-generation, and passkey-authentication flows that can be integrated into your app. 
 - There is not one-way to integrate these flows into your app. The user experience for every application is different, and as a developer you should use these flows however best fits your application’s user experience.
 - Beyond Identity provides some example code and example applications, but don't take these examples as the only way to deploy.

At a high level there are three key flows you'll need to understand to fully integrate Beyond Identity into your application.

## User Provisioning

Before Beyond Identity can authenticate a user it will need to know about them. Every user in the Beyond Identity system must be provisioned to a realm's directory in your tenant. There are three options to do this:
 - **Provision Users via Admin Console** - You can add users through the Admin Console. This method is best for trying out Beyond Identity
 - **Provision Users via API** - This is the most common way. Simply use the Beyond Identity identities API to create a users in your realm
 - **Provision Users via SCIM** - SCIM is a protocol used by enterprise identity products to keep users, and their attributes in sync across SaaS products. If you already have a SSO such as Okta, Ping, Forgerock, Microsoft then you should consider using this method to provision your users.

## Passkey Generation
Before a passkey can be used to authenticate it must be generated. A passkey is a user’s credential that is bound to their device. Beyond Identity provides two options for generating passkeys:
 - **Generate via Embeddable Link** - This is the most common way. As a developer you make a request to our Credential Binding Jobs API, the response will contain a credential binding link. This method is the most flexible as it allows you as the developer to deliver a credential binding link however you see fit. You may want to send this link to the user via email, via SMS, or you may want to embed it into your application’s account settings page. 
 - **Generate via Email** - This is a quick way to get started. With this method the Beyond Identity Cloud will deliver a credential binding link to the user’s email address. The user just has to simply click the link that is contained in the email. 

 ## Passkey Authentication
 Once a user has been provisioned, and they have created a passkey then the passkey can be used for authentication. …. What else to put here?

 ## Deployment Method
There are two methods for deploying Beyond Identity passkey-binding and passkey-authentication for your application. You will need to choose between these two when doing the integration
 - **Embedded SDK** - Embedding the SDK directly into your application gives you the most control on how you style Beyond Identity into your user experience. It requires more work, but is best if you want complete control over the user experience. 
 - **Hosted Web Authenticator** - This is the “low-code” version of Beyond Identity, it does not require you to embed the SDK into your app. Instead it allows you to simply redirect the user to a Beyond Identity hosted web page. This is a great option if you dont care about UX.
