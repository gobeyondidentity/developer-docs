---
title: Universal Passkeys and devices
sidebar_position: 1
---

## What is a Universal Passkey?

A Universal Passkey is a public and private key pair. The private key is generated, stored, and never leaves the user’s devices’ hardware root of trust (i.e. secure enclave). The public key is sent to the Beyond Identity cloud.

Universal Passkeys are cryptographically linked to devices and an identity. Universal Passkeys are compatible with any device running any OS.

The private key cannot be tampered with, viewed, or removed from the device in which it is created unless the user explicitly indicates that the trusted device be removed. We support multiple passkeys per identity and a single device can store multiple passkeys for different users.

![Passkey Diagram](./screenshots/passkey.webp)

### Trust on first use

You can use Beyond Identity to prompt for a biometric authentication at sign-up to increase identity assurance. However, Beyond Identity does not provide identity verification as a native capability within our platform.

If your application requires identity verification, those requirements should be met before a passkey is created for the identity.

### Universal Passkey and trusted devices

A trusted device is a device that a user has authorized to have a passkey that allows them access to your application. The device with which the user enrolls in passkeys is their first trusted device.

Each trusted device is cryptographically linked to a specific user identity. A user can have an unlimited number of trusted devices or you can put a limit on the number of trusted devices.

:::info
Ready to start implementing? Visit our [Getting Started Guide](/docs/v1/getting-started)
:::
