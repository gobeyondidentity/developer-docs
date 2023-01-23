---
title: User Provisioning with API
sidebar_position: 7

# Display h2 to h2 headings
toc_min_heading_level: 2
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# User Provisioning Overview

Before creating a Passkey, a user must be provisioned as an identity under a realm. An identity is a unique identifier that may be used by an end-user to gain access governed by Beyond Identity. An end-user may have multiple identities. A realm can have many identities.

Identities can be part of a group. A realm can have many groups. An identity can belong to many groups. Groups are commonly used as a predicate in a policy rule. (e.g. Allow group "Beyond Identity Administrators" to access the "Beyond Identity Admin Console" application)

You can provision a user either through the [Beyond Identity Admin Console](user-provisioning-api#provision-user-with-the-beyond-identity-admin-console) or by using the [Beyond Identity APIs](user-provisioning-api#provision-user-with-the-beyond-identity-api).

## Provision User with the Beyond Identity Admin Console

From the Beyond Identity Admin Console you can add identities and manage groups.

### Identities

The simplest way to create an identity is through the Beyond Identity Admin Console. First select a realm. Under the "PROJECT MANAGEMENT" tab, select "Identities", and then click on "Add identity". From there you can enter the user's name, username, and email.

![Identities](./screenshots/user-provisioning-identities.png)

![Add Identity](./screenshots/user-provisioning-add-identity.png)

### Groups

You can manage groups in the Beyond Identity Admin Console, creating groups, adding to and removing identities from groups. Under the "PROJECT MANAGEMENT" tab, select "Groups".

![Groups](./screenshots/user-provisioning-groups.png)

## Provision User with the Beyond Identity API

A user can be provisioned via API. The following examples show how to create an identity. For deleting, updating, and managing groups via API, see the [API documentation](https://developer.beyondidentity.com/api/v1).

<Tabs groupId="user-provisioning-api-platform" queryString>
  <TabItem value="curl" label="Curl">

```bash
curl https://api-${REGION}.beyondidentity.com/v1/tenants/${TENANT_ID}/realms/${REALM_ID}/identities
-X POST \
   -H "Authorization: Bearer {API_TOKEN}" \
   -H 'Content-Type: application/json' \
   -d '{"display_name":"{USER_DISPLAY_NAME}","traits": {"type": "traits_v0","username": "{USER_USERNAME}",
"primary_email_address":"{USER_EMAIL}"}}'
```

  </TabItem>
  <TabItem value="node" label="Node">

```jsx
const identityResponse = await fetch(
  `https://api-${REGION}.beyondidentity.com/v1/tenants/${TENANT_ID}/realms/${REALM_ID}/identities`,
  {
    body: JSON.stringify({
      identity: {
        display_name: human_readable_name_for_an_identity,
        traits: {
          type: 'traits_v0',
          username: unique_username_for_an_identity,
          primary_email_address: primary_email_address_for_an_identity,
        },
      },
    }),
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    method: 'POST',
  }
);

const identityResponseJson = await identityResponse.json();
```

  </TabItem>
 </Tabs>
