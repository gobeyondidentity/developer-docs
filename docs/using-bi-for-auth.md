---
title: Using Beyond Identity for Authentication
sidebar_position: 3
---

In the [Getting Started](/docs/v1/getting-started) section, we walked you over how to create a tenant, an application, as well as how to configure that application in order to authorize and authenticate a user with Beyond Identity.

Let's review those steps in a bit more detail in the following section.

## Create a new Realm

A realm is a namespace in your tenant that isolates identities and applications from other realms. All new tenants have a default realm called Beyond Identity Admin which should not be used to configure for delegate IDP purposes.

For more information on realms, see the [Realms](./workflows/realms.md) guide.

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
	<iframe src='https://demo.arcade.software/eyWvI91g13J7qj5vmCfD?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
	</iframe>
</div>

## Create an Application

Applications hold the configuration necessary to integrate your existing software stack with our authentication experience.

For more information on applications, see the [Applications](./workflows/applications.md) guide and [Authenticator Config](/docs/v1/platform-overview/authenticator-config).

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
 	<iframe src='https://demo.arcade.software/KmtiNsx4Z31MkogQdwST?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
 	</iframe>
</div>

## Create a test identity

Before users can start authenticating with Beyond Identity, they must be provisioned in our directory.

For more information on user provisioning, see the [User and Group Provisioning](./workflows/user-provisioning.md) guide.

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
  <iframe src='https://demo.arcade.software/TufU7NgJYWOvNSDfuo9j?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
  </iframe>
</div>

## Get a Universal Passkey

Before authentication you will need a [Universal Passkey](./platform-overview/passkeys-and-devices/what-are-passkeys.md). Use the identity you created above to bind a passkey.

Check out the [Bind Passkey To User](./workflows/bind-passkey) guide for more information.

## Authenticate with a passkey

After you have a passkey bound to an identity, you are ready to authenticate.

Follow the [Authentication with Passkey](./workflows/authentication.md) guide for next steps on authentication and token exchange.
