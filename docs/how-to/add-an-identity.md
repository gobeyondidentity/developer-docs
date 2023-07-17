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
   date: 06/01/2023
   author: Patricia McPhee
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MultiLanguageCodeBlock from "@site/src/components/CodeBlocks/MultiLanguageCodeBlock";

import { Alert, Col, Row } from 'antd';

<Row>
  <Col span={12}>
    <Alert message="In progress (needs copy edit)" type="info" />
  </Col>
</Row>
<br />


Before users can start authenticating with Beyond Identity, they must be added as an identity under a realm. An identity is a unique identifier that may be used by an end-user to gain access governed by Beyond Identity. An end-user may have multiple identities and a realm can have many identities.

Identities can be part of a group. A realm can have many groups. An identity can belong to many groups. Groups are commonly used as a predicate in a policy rule (e.g. Allow group "Beyond Identity Administrators" to access the "Beyond Identity Admin Console" application).

You can users as an identity one of three ways:

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

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/identities" \
-X POST \
-H "Authorization: Bearer $(API_TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"identity\":{\"display_name\":\"$(NAME)\",\"traits\": {\"type\": \"traits_v0\",\"username\": \"$(USERNAME)\",
\"primary_email_address\":\"$(EMAIL)\"}}}"'
title="/identities"
/>