---
title: Add an identity
id: add-an-identity
description: 'Learn how to add an identity to a realm so the user can start authenticating with Beyond Identity. '
slug: /add-an-identity
keywords:
  - identities
  - create
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
import MultiLanguageCodeBlock from "@site/src/components/CodeBlocks/MultiLanguageCodeBlock";

Before your users can use Beyond Identity or obtain a passkey, they need to be added as a member in a realm. This realm is like a container for different apps, settings and users. Each user needs thier own identity to access an application in that realm.

An identity is a unique identifier and an end-user may have multiple identities. Identities can also be part of a group or belong to many groups. Groups are commonly used as a predicate in a policy rule (e.g. Allow group "Beyond Identity Administrators" to access the "Beyond Identity Admin Console" application).

You can add user identities one of three ways:

1. [Beyond Identity Admin Console](#admin-console)
2. [Beyond Identity APIs](#api)
3. [SCIM](/docs/scim-server)

## Prerequisites

- [x] Developer account
- [x] API access token

## Admin Console

import AddAnIdentity from '../includes/\_add-an-identity.mdx';

<AddAnIdentity />

## API

You can create an identity using the [Beyond Identity API](https://developer.beyondidentity.com/api/v1#tag/Identities/operation/CreateIdentity). The following examples show how to create an identity via API.

:::note
- You can find the `REGION`, `TENANT_ID` and `REALM_ID` in your console.  
- You can generate an `API_TOKEN` from your [**Beyond Identity Management API application**](/docs/create-api-token#create-an-access-token-in-the-console) where the token contains the scope `identities:create`.  
:::

:::note
Collect `DISPLAY_NAME`, `USERNAME` and `EMAIL` from your users via a front-end form to populate these values.

where:

- `DISPLAY_NAME` is a string containing any name you wish

- `USERNAME` is a string containing a unique, case insensitive username for the identity

- `EMAIL` is set to an address that can receive email in the format 'user@example.com'
:::

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"identity\":{\"display_name\":\"$(DISPLAY_NAME)\",\"traits\": {\"type\": \"traits_v0\",\"username\": \"$(USERNAME)\",
\"primary_email_address\":\"$(EMAIL)\"}}}"'
title="/identities"
/>

The response JSON will contain the **id** of the new identity, which you'll use in the next call to create a credential binding job. 

```json
{
   "id": "e372db224c06e850",
   "realm_id": "8f5bec58229e6f29",
   "tenant_id": "0001f1f460b1ace6",
   "display_name": "Test Identity",
   "create_time": "2022-04-12T05:53:07.119Z",
   "update_time": "2022-06-16T14:31:03.770Z",
   "traits": {
      "type": "traits_v0",
      "username": "test",
      "primary_email_address": "test@example.com"
   }
}
```

See [Add a passkey](/docs/add-passkey) for more information and next steps.