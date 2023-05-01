---
title: Using Beyond Identity for Authentication
sidebar_position: 4
---

import Arcade, {Clip} from '../src/components/Arcade.tsx';

In the [Getting Started](/docs/v1/getting-started) section, we walked you over how to create a tenant, an application, as well as how to configure that application in order to authorize and authenticate a user with Beyond Identity.

Let's review those steps in a bit more detail in the following section.

## Create a Realm

A realm is a namespace in your tenant that isolates identities and applications from other realms. All new tenants have a default realm called Beyond Identity Admin which should not be used to configure for delegate IDP purposes.

For more information on realms, see the [Realms](./workflows/realms.md) guide.

<Arcade clip={Clip.CreateRealm} />

## Create an Application

Applications hold the configuration necessary to integrate your existing software stack with our authentication experience.

For more information on applications, see the [Applications](./workflows/applications.md) guide and [Authenticator Config](/docs/v1/platform-overview/authenticator-config).

<Arcade clip={Clip.CreateApplication} />

## Create an Identity

Before users can start authenticating with Beyond Identity, they must be provisioned in our directory.

For more information on user provisioning, see the [User and Group Provisioning](./workflows/user-provisioning.md) guide.

<Arcade clip={Clip.CreateIdentity} />

## Get a Universal Passkey

Before authentication you will need a [Universal Passkey](./platform-overview/passkeys-and-devices/what-are-passkeys.md). Use the identity you created above to bind a passkey.

Check out the [Bind Passkey To User](./workflows/bind-passkey) guide for more information.

## Authenticate with a passkey

After you have a passkey bound to an identity, you are ready to authenticate.

Follow the [Authentication with Passkey](./workflows/authentication.md) guide for next steps on authentication and token exchange.
