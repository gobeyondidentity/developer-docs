---
title: Bind Passkey To User
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BackendGeneral from './\_bind-passkey-backend-general.mdx';
import FrontEndReturn from './\_bind-passkey-frontend-return.mdx';
import FrontEndEmail from './\_bind-passkey-frontend-email.mdx';
import ImageSwitcher from '../../src/components/ImageSwitcher.js';
import MultiLanguageCodeBlock from '../../src/components/MultiLanguageCodeBlock';

# Bind Passkey To User Overview

In order to authenticate with Beyond Identity, you need a [Universal Passkey](../platform-overview/passkeys-and-devices/what-are-passkeys). This guide will walk you through setting up your backend to create an identity, bind a passkey to that identity, and finally store that passkey in your application.

Passkeys are generated through a binding job. On creation of a binding job, a binding link will be generated. That binding link can be used to bind a passkey to a specific device or browser. This passkey will be [stored](../platform-overview/passkeys-and-devices/how-are-keys-stored) in the user's device's hardware root of trust (i.e. secure enclave).

Make sure you have set up an application and configured your [Authenticator Config](../platform-overview/authenticator-config.md) before following this guide.

A binding job must be generated through the [Beyond Identity API](https://developer.beyondidentity.com/api/v1). There are currently two `delivery_method` options for your binding link: `RETURN` and `EMAIL`.

1. `RETURN` indicates that a binding link will be returned to the caller upon creation of the binding job. The developer can then deliver that link to the end user however they want (in-line, sms, email, etc). This is the suggested method if you want the end user to create a passkey without having to leave your application.
2. `EMAIL` indicates that a passkey creation email will be sent to the end user. The end user will receive the email and click the passkey creation link. Clicking the link will redirect the end user to Beyond Identity Cloud. Beyond Identity Cloud will look up the [Authenticator Config](../platform-overview/authenticator-config.md) that is associated with that passkey creation link and redirect the end user to the Authenticator Config's Invoke URL with an appended `/bind` path. The `Invoke URL` should be an HTTP request handler in your application. Once the user has been redirected to your application, you as the developer can handle the binding link in the SDK.

Toggle delivery methods below for code samples:

<Tabs groupId="bind-delivery-method" queryString>

<!--  RETURN -->
<TabItem value="return" label="RETURN">

<ImageSwitcher lightSrc="/assets/bind-delivery-method-return-light.png" darkSrc="/assets/bind-delivery-method-return-dark.png" />

<BackendGeneral/>

## Get Binding Link for Identity

In order to get a binding link for a passkey, you need to create a binding job for an existing identity. The following code snippet uses the `RETURN` delivery method. This is the fastest way to get a binding link as this method indicates that a binding link will be returned to the caller upon creation of the binding job. This binding link is the link you will send to your application to complete the passkey binding process.

<MultiLanguageCodeBlock
  curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"job\":{\"delivery_method\":\"RETURN\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\",\"post_binding_redirect_uri\":\"$(APP_REDIRECT_URI)\"}}"'
  title="/credential-binding-jobs"
/>

<FrontEndReturn/>
</TabItem>

<!-- EMAIL -->
<TabItem value="email" label="EMAIL">

<ImageSwitcher lightSrc="/assets/bind-delivery-method-email-light.png" darkSrc="/assets/bind-delivery-method-email-dark.png" />

<BackendGeneral/>

## Get Binding Link for Identity

In order to get a binding link for a passkey, we need to create a binding job for an existing identity. The following code snippet uses the `EMAIL` delivery method. This method will send your user an email with a link that, when clicked, redirects the user to your application and provides your application with a binding link. If you wish to configure email branding, visit the Admin Console. This binding link is the link your application will use to complete the passkey binding process.

<MultiLanguageCodeBlock
  curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"job\":{\"delivery_method\":\"EMAIL\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\",\"post_binding_redirect_uri\":\"$(APP_REDIRECT_URI)\"}}"'
  title="/credential-binding-jobs"
/>

<FrontEndEmail/>
</TabItem>

</Tabs>
