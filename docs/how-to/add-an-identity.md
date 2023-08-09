---
title: Add an identity
id: add-an-identity
description: "Learn how to add an identity to a realm so the user can start authenticating with Beyond Identity. "
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
displayed_sidebar: howToGuidesSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MultiLanguageCodeBlock from "@site/src/components/CodeBlocks/MultiLanguageCodeBlock";

Before your users can use Beyond Identity or obtain a passkey, they need to be added as a member in a realm. This realm is like a container for different apps, settings and users. Each user needs thier own identity to access an application in that realm. 

An identity is a unique identifier and an end-user may have multiple identities. Identities can also be part of a group or belong to many groups. Groups are commonly used as a predicate in a policy rule (e.g. Allow group "Beyond Identity Administrators" to access the "Beyond Identity Admin Console" application).

You can add user identities one of three ways:

1. [Beyond Identity Admin Console](#admin-console)
2. [Beyond Identity APIs](#api)
3. [SCIM](/docs/next/scim-server)


## Prerequisites

- [x] Developer account
- [x] API access token

## Admin Console

import AddAnIdentity from '../includes/_add-an-identity.mdx';

<AddAnIdentity />

## API

The following examples show how to create an identity via API.

:::note
You can find the `REGION`, `TENANT_ID` and `REALM_ID` in your console.  
You can generate an `API_TOKEN` from you Beyond Identity Management API application.
:::

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"identity\":{\"display_name\":\"$(NAME)\",\"traits\": {\"type\": \"traits_v0\",\"username\": \"$(USERNAME)\",
\"primary_email_address\":\"$(EMAIL)\"}}}"'
title="/identities"
/>