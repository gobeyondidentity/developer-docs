---
title: Bind passkey to user
last_update: 
   date: 02/15/2023
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BackendGeneral from '../includes/_bind-passkey-backend-general.mdx';
import FrontEndReturn from '../includes/_bind-passkey-frontend-return.mdx';
import FrontEndEmail from '../includes/_bind-passkey-frontend-email.mdx';
import Arcade, {Clip} from '@site/src/components/Arcade.tsx';
import BindEmailDiagram from '../includes/_bind-delivery-method-email-diagram.mdx';
import BindReturnDiagram from '../includes/_bind-delivery-method-return-diagram.mdx';
import MultiLanguageCodeBlock from '@site/src/components/MultiLanguageCodeBlock';


# Bind Passkey To User

## Prerequisites

- Set up a [developer account](./account-setup)
- Create an [application](./applications)
- Create at least one [identity](./user-provisioning)

# Overview

In order to [authenticate with Beyond Identity](./authentication.md), you need a [Universal Passkeys](../platform-overview/what-are-passkeys.md). This guide will walk you through binding a passkey to an identity. 

Passkeys are generated through a binding job. On creation of a binding job, a binding link will be generated. That binding link can be used in the Embedded SDK to bind a passkey to a specific device or browser. This passkey will be [stored](../platform-overview/how-are-keys-stored) in the user's device's hardware root of trust (i.e. secure enclave).

## Bind Passkey with Admin Console

A passkey can be bound to an identity directly from the Beyond Identity Admin Console. Under the realm that hosts your application, look for the "PROJECT MANAGEMENT" tab and select "Identities". A list of identities should be displayed. Tap on an identity that you would like to bind to a passkey. Next click on the "Add a passkey" button. Select an application and click "Proceed & send email".

<Arcade clip={Clip.CreatePasskey} />

The user will receive a registration email with a link to generate a passkey. Clicking the link will redirect the end user to the Beyond Identity Cloud. The Beyond Identity Cloud will look up the [Authenticator Config](../platform-overview/authenticator-config.md) that is associated with that passkey creation link and redirect the end user to your application using the Authenticator Config's Invoke URL.

## Bind Passkey by API

Before making any API calls you'll want to generate an API access token. Check out [API Tokens](./api-token) for help creating an access token.

A binding job can be generated through the [Beyond Identity API](https://developer.beyondidentity.com/api/v1). There are two `delivery_method` options to consider:

1. **RETURN**: indicates that a binding link will be returned to the caller upon creation of the binding job. The developer can then deliver that link to the end user however they want (in-line, sms, email, etc). This is the suggested method if you want the end user to create a passkey without having to leave your application.
2. **EMAIL**: indicates that a passkey creation email will be sent to the end user. The end user will receive the email and click the passkey creation link. Clicking the link will redirect the end user to the Beyond Identity Cloud. Beyond Identity Cloud will look up the [Authenticator Config](../platform-overview/authenticator-config.md) that is associated with that passkey creation link and redirect the end user to the Authenticator Config's Invoke URL with an appended `/bind` path. The `Invoke URL` should be an HTTP request handler in your application. Once the user has been redirected to your application, you as the developer can handle the binding link in the SDK.

<Tabs groupId="bind-delivery-method" queryString>

<!--  RETURN -->
<TabItem value="return" label="RETURN">

<BindReturnDiagram/>
<BackendGeneral/>

### Get Binding Link for Identity

In order to get a binding link for a passkey, you need to create a binding job for an existing identity. The following code snippet uses the `RETURN` delivery method. This is the fastest way to get a binding link as this method indicates that a binding link will be returned to the caller upon creation of the binding job. This binding link is the link you will send to your application to complete the passkey binding process.

<MultiLanguageCodeBlock
  curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"job\":{\"delivery_method\":\"RETURN\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\"}}"'
  title="/credential-binding-jobs"
/>

<FrontEndReturn/>
</TabItem>

<!-- EMAIL -->
<TabItem value="email" label="EMAIL">

<BindEmailDiagram/>
<BackendGeneral/>

### Get Binding Link for Identity

In order to get a binding link for a passkey, we need to create a binding job for an existing identity. The following code snippet uses the `EMAIL` delivery method. This method will send your user an email with a link that, when clicked, redirects the user to your application and provides your application with a binding link. If you wish to configure email branding, visit the Admin Console. This binding link is the link your application will use to complete the passkey binding process.

<MultiLanguageCodeBlock
  curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"job\":{\"delivery_method\":\"EMAIL\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\",\"post_binding_redirect_uri\":\"$(APP_REDIRECT_URI)\"}}"'
  title="/credential-binding-jobs"
/>

<FrontEndEmail/>
</TabItem>

</Tabs>
