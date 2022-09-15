---
title: Integration Beyond Identity Authentication into bubble.io applications
sidebar_position: 2
---

bubble.io is a no-code solution for creating and deploying applications. It is very useful as a prototyping platform, and can actually be used to host real production apps. This tutorial will show how to integrate Beyond Identity's Secure Customer passwordless authentication into your bubble.io app.

# Demo Application

You can visit a [Demo Application](https://beyondid-secure-customer.bubbleapps.io/) to see one in action.

The user flow to set up a passwordless account is:

1. User enters a username and email address and hits "Sign up and Bind a Credential"
1. Application creates an identity, and then sends the user a Credential Binding email
1. When the user clicks the Credential Binding email, BI uses WebAuthN to create and bind a credential to the user's current browser.
1. The user can login now and in the future with their email, which will trigger a step-up (on most devices) and retrieve the credential.
1. That credential is presented to Beyond Identity to authenticate the user.

More details are [available here on how BI Secure Customer](https://www.beyondidentity.com/developers/signup) works. You can sign up for a **free account** there.

# bubble.io

[Bubble.io](https://bubble.io/) is a no code platform that non-developers and developers alike can use to build apps. We found it to be quite easy to use and extremely powerful. It has a plugins and apps ecosystem to make sharing code easy. It also has numerous useful foundational components like an OIDC client that made it easy for us to build a foundation for others to use in their apps.

TODO Screenshot of bubble homepage

# Beyond Identity Plugins

We have created two plugins for bubble app creators to use. They should be customized with the tenant, realm, and client id/secret of your own BI application before use. 

1. [Beyond Identity Customer AuthN](https://bubble.io/plugin_editor?id=1663167119592x240371050688282620&tab=tabs-1): Performs the authentication flow after initial signup. 

1. [Beyond Identity Customer Mgmt](https://bubble.io/plugin_editor?id=1663167558199x986364837141938200&tab=tabs-1): Helps perform user management. In our demo application, it is used to create a new identity and send a Credential Binding request to the email address on record. This plugin can also be used to retrieve a list of identities for the current tenant.

You can see these in action in the Demo App that is linked above.

# Getting started

## Prerequisites

Before you get started, please set up the following.

- A free account on [bubble.io](https://bubble.io)

- A free account on [Beyond Identity Secure Customer](https://www.beyondidentity.com/developers/signup)

- A tenant, realm, and application set up in Beyond Identity. On our [Getting Started](https://developer.beyondidentity.com/docs/v1/getting-started#3-create-a-tenant) guide, go through steps 3, 6, 7, and 8. 

    **NOTE**: In Step 8, during App creating, select "Token Endpoint Auth Method" = "Client Secret Post" instead of the instructions in the other readme. 

- Create your [bubble app here](https://bubble.io/home?tab=apps)

## Add the Beyond Identity plugins

Once you have created an application, you will be presented with the "New Application Assistant". 

1. Click through until you arrive at the "Install Plugin" page and click "Install Plugin".

1. On the search page, tick "Categories -> Technical"

1. In the search box, type "beyond identity customer"

TODO Screenshot for plugin search

1. Install both plugins

1. Go to the next step in the assistant. You do not need the API connector for BI services, but you may wish to use it to integrate with your other services.

## Configure the plugins with values from Beyond Identity

This step involves copying OIDC and client/secret values from the BI console into bubble's plugin configuration page.

TODO fill this out


## Create User Signup flow

This flow will enable a new user to input their username and email address and create a new identity. It will also 