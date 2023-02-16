---
title: User and Group Provisioning
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Arcade, {Clip} from '../../src/components/Arcade.tsx';
import MultiLanguageCodeBlock from "../../src/components/MultiLanguageCodeBlock";

# User and Group Provisioning

## Prerequisites

- Set up a [developer account](./account-setup.md)

## Overview

Before creating a passkey, a user must be provisioned as an identity under a realm. An identity is a unique identifier that may be used by an end-user to gain access governed by Beyond Identity. An end-user may have multiple identities. A realm can have many identities.

Identities can be part of a group. A realm can have many groups. An identity can belong to many groups. Groups are commonly used as a predicate in a policy rule (e.g. Allow group "Beyond Identity Administrators" to access the "Beyond Identity Admin Console" application).

You can provision a user with:

1. [Beyond Identity Admin Console](user-provisioning#provision-user-with-the-beyond-identity-admin-console)
2. [Beyond Identity APIs](user-provisioning#provision-user-with-the-beyond-identity-api)
3. [SCIM](../scim/v1/scimv1)

## Provision User with the Beyond Identity Admin Console

You can add identities and manage groups from the Beyond Identity Admin Console.

### Identities

The simplest way to create an identity is through the Beyond Identity Admin Console. First select a realm. Under the "PROJECT MANAGEMENT" tab, select "Identities", and then click on "Add identity". From there you can enter the user's name, username, and email.

<Arcade clip={Clip.CreateIdentity} />

### Groups

You can also create groups and add or remove identities from groups in the Beyond Identity Admin Console. Under the "PROJECT MANAGEMENT" tab, select "Groups".

<Arcade clip={Clip.AddIdentityToGroup} />

## Provision User with the Beyond Identity API

You can add identities and manage groups from the [Beyond Identity API](https://developer.beyondidentity.com/api/v1).

Before making any API calls you'll want to generate an API access token. Check out [API Tokens](./api-token) for help creating an access token.

### Identities

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

### Groups

You can also create groups and add or remove identities from groups in the Beyond Identity API.

For deleting, updating, and managing groups via API, see the [API documentation](https://developer.beyondidentity.com/api/v1#tag/Groups).
