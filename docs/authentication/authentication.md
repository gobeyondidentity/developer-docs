---
title: Authentication
description: ''
keywords: 
 - scenario
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
   author: Patricia McPhee
draft: false
hide_table_of_contents: false
hide_title: false
hide_breadcrumbs: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

import { Alert, Col, Row } from 'antd';

<Row>
  <Col span={6}>
    <Alert message="In progress" type="info" />
  </Col>
</Row>
<br />

Beyond Identity console settings allow you to configure the authentication experience your users see.  

The settings described here are configured via the **Configuration Type** on the **Authenticator Config** tab when you [add an application](../how-to/add-an-application).  

The Beyond Identity platform offers three authenticator configuration types:  
1. **Hosted web**: In this model, Beyond Identity's hosted web app handles passkey registration and authentication for you, including generating new passkeys, presenting users with authenticator choice options as needed, and validating passkey assertions. With this model, your app simply needs to redirect to Beyond Identity's hosted web authenticator, and we do the rest.  

2. **Embedded SDK**: With this model you have more control over the authentication user experience, but your app must do the work of registering and enumerating passkeys for the user, presenting a passkey selection page if required, initiating authentication and verifying passkey assertions.  

3. **None**: If the authenticator configuration type is set to "none", it means that the application uses the client credentials grant type and does not use an authenticator. This configuration is designed to be used for machine to machine authentication.  

Currently the following authentication factors are supported and more are coming soon:  
 - Universal Passkey
 - FIDO2 Multi-Device Passkey - Coming Soon
 - Email OTP - Coming Soon
 - Federated IDP - Coming Soon  

