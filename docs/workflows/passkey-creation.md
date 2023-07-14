---
title: Passkey creation
id: passkey-creation
description: ''
slug: /passkey-creation
keywords: 
 - passkeys
 - overview
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
   author: Patricia McPhee
draft: false
doc_type: overview
displayed_sidebar: mainSidebar
---

High Level Flow

The high level flow for creating a passkey is:

1. A passkey creation link is created using the Beyond Identity APIs

2. The passkey creation link is delivered to the Beyond Identity SDK that is running on the user's device. Beyond Identity Provides two methods for delivering a passkey creation link to the SDK:

   - A developer can use the Beyond Identity API to generate a passkey creation link. The developer can then deliver that link to the end user however they want (in-line, sms, email, etc).

   - A developer can use the Beyond Identity API to send a passkey creation email to the end user.

3. The passkey creation link is passed to the Beyond Identity SDK bindPasskey() function. Upon success a private key will be generated, stored in the device's hardware trust module, and the public key will be stored in the Beyond Identity cloud.