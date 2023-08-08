---
title: Add a passkey
id: add-passkey
description: ''
slug: /add-passkey
keywords:
  - passkeys
  - bind
  - credential binding job
pagination_next: null
pagination_prev: null
last_update:
  date: 08/04/2023
  author: Anna Garcia
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BackendGeneral from '../includes/\_bind-passkey-backend-general.mdx';
import FrontEndReturn from '../includes/\_bind-passkey-frontend-return.mdx';
import FrontEndEmail from '../includes/\_bind-passkey-frontend-email.mdx';
import BindEmailDiagram from '../includes/\_bind-delivery-method-email-diagram.mdx';
import BindReturnDiagram from '../includes/\_bind-delivery-method-return-diagram.mdx';
import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';
import DeepLinking from '../includes/\_deeplinking-native-sdk.mdx';


Setting up passkeys for your users involves two main steps:

1. Create an identity for the user
1. Bind a passkey to the user's identity and device through a credential binding link

You have two options for setting up passkeys in your application. The options described here are configured via the **Configuration Type** on the **Authenticator Config** tab when you [add an application](/docs/next/add-an-application).

| Type | Passkey Support |
| --- | --- |
| **Hosted Web** | You will NOT need to manage creating a user identity and binding a passkey for this user. The Hosted Web Authenticator handles passkey registration and authentication for you, including generating new passkeys, presenting users with authenticator choice options as needed, and validating passkey assertions. Your app simply needs to redirect to Beyond Identity's hosted web authenticator, using an OIDC client - similar to any other Identity Provider (think social providers). For more information, see the [Hosted Web](/docs/next/authentication#hosted-web). You do not need to continue reading this document.  |
| **Embedded SDK**  | You will need to manage creating a user identity and binding a passkey for this user. Continue reading this document for more information. |  

## Prerequisites

- [x] Developer account
- [x] API access token
- [X] At least one application in a new realm with the Configuration Type set to Embedded SDK. 

## Create an identity

Before your users can obtain a passkey, they need to be added as a member in a realm. This realm is like a container for different apps, settings and users. Each user needs thier own identity to access an application in that realm. 

If your user is creating a new account, you'll want to create an identity with their information, such as email address and username first. Collect this information on your front end and call the `/identities` API with that information on your back end. 

Create an endpoint in your application following the below code example: 

:::note
- You can find the `REGION`, `TENANT_ID` and `REALM_ID` in your console.  
- You can generate an `API_TOKEN` from your [**Beyond Identity Management API application**](/docs/next/create-api-token#create-an-access-token-in-the-console) where the token contains the scope `identities:create`.  
:::

For more information, visit the [add an identity](/docs/next/add-an-identity) guide.

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"identity\":{\"display_name\":\"$(NAME)\",\"traits\": {\"type\": \"traits_v0\",\"username\": \"$(USERNAME)\",
\"primary_email_address\":\"$(EMAIL)\"}}}"'
title="/identities"
/>

If you prefer, this can be done directly in the Beyond Identity console.

import AddAnIdentity from '../includes/_add-an-identity.mdx';

<AddAnIdentity />

:::tip **CHECKPOINT**
Now that you have created an identity for a user, you can send the user a link to bind a passkey to their device.
:::

## Generate a credential binding link

There are two methods to generate a credential binding link. This can be done either through the Beyond Identity console or via API. 

### Passkey binding methods

import PasskeyBindingMethods from '../includes/\_passkey-binding-methods.mdx';

<PasskeyBindingMethods />

#### Console 
You can send the user a link using the Beyond Identity console. This link can also be sent via email or returned immediately through a generated curl.

import BindPasskeyToAnIdentity from '../includes/\_bind-passkey-to-an-identity.mdx';

<BindPasskeyToAnIdentity />

#### API 

<Tabs groupId="bind-delivery-method" queryString>

<!--  RETURN -->
<TabItem value="return" label="RETURN">

The **RETURN** delivery method is the fastest way to get a binding link, which is the link you'll send to your application to complete the passkey binding process. You can deliver the link in-line, SMS, email, etc. This is the suggested method if you want the end user to create a passkey without leaving your application.

<BindReturnDiagram/>

1. Call the endpoint in your application following the below code example. 

<MultiLanguageCodeBlock
    curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
  -X POST \
  -H "Authorization: Bearer $(API_TOKEN)" \
  -H "Content-Type: application/json" \
  -d "{\"job\":{\"delivery_method\":\"RETURN\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\"}}"'
    title="/credential-binding-jobs"
  />

:::note
- You will need the user's `IDENTITY_ID` from identity creation above. This is the **id** returned in the response JSON from the create identity API. 
- You can find the `REGION`, `TENANT_ID`, `REALM_ID` and `AUTHENTICATOR_CONFIG_ID` in your console.  
- You can generate an `API_TOKEN` from your [**Beyond Identity Management API application**](/docs/next/create-api-token#create-an-access-token-in-the-console) where the token contains the scope `credential-binding-jobs:create`.  
:::

The result of calling this API will be a JSON response with a `credential_binding_link`.

```json
{
  "credential_binding_job": {
    "id": "c4fc2d753ca22b14",
    "realm_id": "cdf4862dc4d49791",
    "tenant_id": "000183a77dd50fa9",
    "identity_id": "87fabad6956c6d4b",
    "delivery_method": "RETURN",
    "state": "LINK_SENT",
    "post_binding_redirect_uri": "http://example.com/callback",
    "authenticator_config_id": "67bb0acf12e5c899",
    "expire_time": "2022-03-21T03:42:52.905Z",
    "create_time": "2022-03-14T03:42:52.905Z",
    "update_time": "2022-03-15T05:55:23.823Z"
  },
  "credential_binding_link": "http://example.com/v1/tenants/000183a77dd50fa9/realms/cdf4862dc4d49791/identities/87fabad6956c6d4b/credential-binding-jobs/c4fc2d753ca22b14:invokeAuthenticator?token=1St9IKIIrYyQ8sOSeuk5UkbLKnBJhuD4I7nWIqt-BNANDEFS-XVuOHxB7TFdZcRm"
}
```

2. Once you have a binding link generated, feed the `credential_binding_link` directly into your application's front end using the Embedded SDK to complete the binding process. 

<FrontEndReturn/>

</TabItem>

<!-- EMAIL -->
<TabItem value="email" label="EMAIL">

The **EMAIL** delivery method sends an email to the user. Clicking the link will redirect the end user to the Beyond Identity Cloud. Beyond Identity Cloud will look up the Authenticator Config that is associated with that passkey creation link and redirect the end user to the Authenticator Config's Invoke URL with an appended `/bind` path. The `Invoke URL` should be an HTTP request handler in your application. Once the user has been redirected to your application, you as the developer can handle the binding link in the SDK.

<BindEmailDiagram/>

1. Verify the application's Invoke URL. When we send out a passkey email, the link will redirect to your application specified by the Authenticator Config's [Invoke URL](/docs/next/authentication#invoke-url). This should either be an app scheme or a Universal URL / App link.

  <DeepLinking />

2. Call the endpoint in your application following the below code example. 

<MultiLanguageCodeBlock
    curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
  -X POST \
  -H "Authorization: Bearer $(API_TOKEN)" \
  -H "Content-Type: application/json" \
  -d "{\"job\":{\"delivery_method\":\"EMAIL\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\",\"post_binding_redirect_uri\":\"$(POST_BINDING_REDIRECT_URI)\"}}"'
    title="/credential-binding-jobs"
  />

:::note
- You will need the user's `IDENTITY_ID` from identity creation above. This is the **id** returned in the response JSON from the create identity API.   
- You can find the `REGION`, `TENANT_ID`, `REALM_ID` and `AUTHENTICATOR_CONFIG_ID` in your console.
- You can generate an `API_TOKEN` from your [**Beyond Identity Management API application**](/docs/next/create-api-token#create-an-access-token-in-the-console) where the token contains the scope `credential-binding-jobs:create`.  
- Set the `POST_BINDING_REDIRECT_URI` to a URI in your application. On successful passkey binding the user will be re-directed to this URI.
:::

The result of calling this API will send your user with an email from Beyond Identity with a link to click on. That link will look like the following: 

```
http://your-app.com/v1/tenants/000183a77dd50fa9/realms/cdf4862dc4d49791/identities/87fabad6956c6d4b/credential-binding-jobs/c4fc2d753ca22b14:invokeAuthenticator?token=1St9IKIIrYyQ8sOSeuk5UkbLKnBJhuD4I7nWIqt-BNANDEFS-XVuOHxB7TFdZcRm
```

3. Add a /bind route to your application to handle redirection

When the user taps on the link in the email, they will be redirected to the Beyond Identity Cloud which will redirect them back to your application. The Beyond Identity Cloud will use the application's Authenticator Config's Invoke URL. A `/bind` path will be appended to your Invoke URL as well as several other query parameters. The path `/bind` must be implemented as a route in your application to intercept this URL:

```bash
$invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
```

4. Once you receive the incoming URL, pass it into the SDK to complete the binding process.

  <FrontEndEmail />

</TabItem>

</Tabs>

Upon success, a private key will be created in the user's device's hardware trust module, and the corresponding public key will be sent to the Beyond Identity Cloud. At this point, the user has a passkey enrolled on this device and is ready to authenticate.

## What can I do next?

After you have a passkey bound to an identity, you're ready to authenticate. See [Add passkeys to your app](/docs/next/embedded-sdk-add-passkeys) for next steps on authentication and token exchange.