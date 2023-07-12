---
title: Add a passkey
description: ''
keywords: 
 - passkeys
 - bind
 - credential binding job
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
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


To authenticate with Beyond Identity, your users must register a credential (passkey) through a binding job, which generates a Universal Passkey. Upon success, a private key will be created in the device's hardware trust module, and a public key will be sent to the Beyond Identity Cloud. 

A passkey can be bound to an identity directly from the Beyond Identity Admin Console or the Beyond Identity API. This guide will walk you through binding a passkey to an identity (user) and creating a credential-binding job.  


## Passkey binding methods

<PasskeyBindingMethods />

## Prerequisites

- Developer account <mark>Do we need to call this out in every prerequisite or is it assumed?</mark>

- At least one application <mark>Is the Beyond Identity Management API count as the application or do they need to create an app?</mark>

- Authenticator Config ID, which indicates to the system how to bind the passkey. <mark>Do we need to call out that the Authenticator Type cannot be <b>None</b>?</mark>

- At least one identity <mark>is there a specific role or permission level?</mark>

## Best practices

<mark>Are there best practices we want to point out? If not, we don't need this section.</mark>


## Admin Console

import BindPasskeyToAnIdentity from '../includes/_bind-passkey-to-an-identity.mdx';

<BindPasskeyToAnIdentity />

## API

Before making any API calls you'll want to generate an [API access token](../api-tokens/create-api-token#api). 

A binding job can be generated through the [Beyond Identity API](https://developer.beyondidentity.com/api/v1). There are two delivery method options to consider:

- **RETURN**: A binding link will be returned to the caller immediately upon creation of the binding job. 

- **EMAIL**: A passkey creation email will be sent to the end user. 


<Tabs groupId="bind-delivery-method" queryString>

<!--  RETURN -->
<TabItem value="return" label="RETURN">

The RETURN  delivery method is the fastest way to get a binding link, which is the link you'll send to your application to complete the passkey binding process. You can deliver the link in-line, SMS, email, etc. This is the suggested method if you want the end user to create a passkey without leaving your application.

1. Generate an API access token for API calls. See [Create an API token](../api-tokens/create-api-token#api) to create an access token.

2. (Optional) You'll need the `identityId` to bind to a passkey. If your user is creating a new account, you'll want to create an identity with their information, such as email address and username. Collect this information on your front end and create the identity on your back end. See [Add an identity](./add-an-identity#api) for information on creating an identity via API.

3. Get a binding link for identity by creating a binding job for an existing identity. 

  <MultiLanguageCodeBlock
    curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
  -X POST \
  -H "Authorization: Bearer $(API_TOKEN)" \
  -H "Content-Type: application/json" \
  -d "{\"job\":{\"delivery_method\":\"RETURN\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\"}}"'
    title="/credential-binding-jobs"
  />

4. Once you have a binding link generated, feed that link into your application to complete the binding process. You'll need to query your backend for the link and feed it into the SDK. Upon success, a private key will have been created in the device's hardware trust module, and the corresponding public key will be sent to the Beyond Identity Cloud. At this point, the user has a passkey enrolled on this device.

  Remember to initialize your SDK ahead of time. For more information, see [SDK Setup](../sdks/sdk-setup).

  <Tabs groupId="bind-platform">
  <TabItem value="javascript" label="Javascript">

  ```javascript
  const bindResponse = await embedded.bindPasskey(bindingLink);
  console.log(bindResponse);
  ```

  </TabItem>
  <TabItem value="kotlin" label="Kotlin">

  ```kotlin
  EmbeddedSdk.bindPasskey(url = bindingLink)
  .onEach { result ->
      result.onSuccess { success ->
          Timber.d("Bind Passkey success = $success")
      }
      result.onFailure { failure ->
          Timber.e("Bind Passkey failure = $failure")
      }
  }
  ```

  </TabItem>
  <TabItem value="swift" label="Swift">

  ```swift
  Embedded.shared.bindPasskey(url: bindingLink) { result in
      switch result {
      case let .success(bindResponse):
          print(bindResponse)
      case let .failure(error):
          print(error.localizedDescription)
      }
  }
  ```

  </TabItem>
  <TabItem value="reactnative" label="React Native">

  ```javascript
  const bindResponse = await Embedded.bindPasskey(bindingLink);
  console.log(bindResponse);
  ```

  </TabItem>
  <TabItem value="flutter" label="Flutter">

  ```dart
  var bindResponse = await EmbeddedSdk.bindPasskey(bindingLink);
  debugPrint(bindResponse);
  ```

  </TabItem>
  </Tabs>

</TabItem>

<!-- EMAIL -->
<TabItem value="email" label="EMAIL">

The EMAIL delivery method sends an email to the user to generate a passkey from the binding link provided. Clicking the link will redirect the end user to the Beyond Identity Cloud. Beyond Identity Cloud will look up the Authenticator Config that is associated with that passkey creation link and redirect the end user to the Authenticator Config's Invoke URL with an appended `/bind` path. The `Invoke URL` should be an HTTP request handler in your application. Once the user has been redirected to your application, you as the developer can handle the binding link in the SDK.

1. Generate an API access token for API calls. See [Create an API token](../api-tokens/create-api-token#api) to create an access token.

2. (Optional) You'll need the `identityId` to bind to a passkey. If your user is creating a new account, you'll want to create an identity with their information, such as email address and username. Collect this information on your front end and create the identity on your back end. See [Add an identity](./add-an-identity#api) for information on creating an identity via API.

3. Get a binding link for identity by creating a binding job for an existing identity. 

  <MultiLanguageCodeBlock
    curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities/$(IDENTITY_ID)/credential-binding-jobs" \
  -X POST \
  -H "Authorization: Bearer $(API_TOKEN)" \
  -H "Content-Type: application/json" \
  -d "{\"job\":{\"delivery_method\":\"EMAIL\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\",\"post_binding_redirect_uri\":\"$(APP_REDIRECT_URI)\"}}"'
    title="/credential-binding-jobs"
  />

4. Verify the Invoke URL for deeping linking. When we send out a passkey email, the link will redirect to your application specified by the Authenticator Config's [Invoke URL](../foundations/authenticator-config#invoke-url). This URI should either be an app scheme or a Universal URL / App link.

  <DeepLinking />

  The binding link that is redirected to your application will take on the following form. A `/bind` path will be appended to your Invoke URL as well as several other query parameters. The path `/bind` must be implemented as a route in your application to intercept this URL:

  ```bash
  $invoke_url/bind?api_base_url=<api_base_url>&tenant_id=<tenant_id>&realm_id=<realm_id>&identity_id=<identity_id>&job_id=<job_id>&token=<token>
  ```

5. Once you receive the incoming URL, pass it into the SDK to complete the binding process. Upon success, a private key will have been created in the device's hardware trust module and the corresponding public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

  <FrontEndEmail />

</TabItem>

</Tabs>

Upon success a private key will have been created in the device's hardware trust module, and public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device.

## Test access

<mark>Is there a way for the developer to test this?</mark>

## What can I do next?

After you have a passkey bound to an identity, you're ready to authenticate. For apps configured with the Embedded SDK Authenticator Config, see [Add passkeys to your app](../authentication/embedded-sdk-add-passkeys.mdx) for next steps on authentication and token exchange. <mark>We have a topic on this but it's specifically Embedded SDK. Are steps needed for Host Web?</mark>


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BackendGeneral from '../includes/_bind-passkey-backend-general.mdx';
import FrontEndReturn from '../includes/_bind-passkey-frontend-return.mdx';
import FrontEndEmail from '../includes/_bind-passkey-frontend-email.mdx';
import BindEmailDiagram from '../includes/_bind-delivery-method-email-diagram.mdx';
import BindReturnDiagram from '../includes/_bind-delivery-method-return-diagram.mdx';
import MultiLanguageCodeBlock from '@site/src/components/CodeBlocks/MultiLanguageCodeBlock';
import DeepLinking from '../includes/_deeplinking-native-sdk.mdx';
import PasskeyBindingMethods from '../includes/_passkey-binding-methods.mdx';