---
title: Credentials
sidebar_position: 1
---

A Credential can be described as a public/private key pair where the private key is stored securely in a [TEE](https://en.wikipedia.org/wiki/Trusted_execution_environment). 

On macOS/iOS, this would be the [Secure Enclave](https://support.apple.com/guide/security/secure-enclave-sec59b0b31ff/web). 
When a user sets up an account with Beyond Identity, the device in which they register creates a Credential that becomes their identity. 
This private key associated with this Credential can never be removed from the device in question. It is however possible to extend the Credential’s chain of trust by creating a new Credential on a different device and signing it with the private key of the first Credential.