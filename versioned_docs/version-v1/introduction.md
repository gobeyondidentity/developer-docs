---
title: Introduction
---

Welcome to the developer documentation for Beyond Identity. This is where you can find guides for building authentication across your applications using Universal Passkeys. 

If you run into any issues or have feedback for us along the way, you can let us know by **[joining our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

## Just looking to get going? 

Follow our [Getting Started guide](./getting-started). 

Or explore what's possible with [Try it out](./try-it-out.mdx).

## What is Beyond Identity

Beyond Identity helps developers deploy the strongest authentication primitives on the planet, eliminating shared secrets for customers, employees, and contractors.

Unique to Beyond Identity, shared secrets are eliminated for sign-up, login, and recovery. For customers, they never have to type a password, enter a code, click a push notification, or pick up a second device at all for authentication across all devices.

In addition to the fact that authentication is multi-factor by default, Beyond Identity also delivers real-time user and device risk signals that you can leverage to implement risk-based access controls that prompt for step-up authentication in scenarios you deem to be higher risk. 

Backed by a cloud-native architecture, our platform was built for enterprise workloads. All SDKs use industry-standard protocols (OIDC/OAuth2.0) and include a sample app.

## Why does Beyond Identity exist?

We believe public private key pairs are fundamentally, a better way to authenticate users (and machines!).

In order to fully address challenges of customer authentication, any solution must be:
 - Secure: multi-factor with zero reliance on shared secrets or phishable factors
 - Easy to use: frictionless with no need for second devices or complicated steps
 - Universal across applications and devices: consistent experience across native and web apps on any device
 - Simple for developers to integrate: to reduce engineering workload so developers can work on their core product instead of authentication

The only solution that met the above requirements was an authentication framework built off of public-private key pairs. 

While we’re not the first to solve the problem with asymmetric cryptography, the existing solutions today fall short given the lack of cross-platform interoperability, and the friction presented to users. 


## How it Works
Beyond Identity allows developers to implement strong authentication from multiple devices based on public-private key pairs (what we call [Universal Passkeys](./platform-overview/what-are-passkeys)). All keys are cryptographically linked to the user and can be centrally managed using our APIs.

Instead of shared secrets, Beyond Identity authenticates customers with two strong factors -- "something you are" from the device biometric and "something you own" from the private key -- without requiring a second device.

During enrollment, the user receives a binding token that prompts the creation of a unique, device-bound credential with a private key generated and stored in the TPM and a public key sent to the Beyond Identity Cloud.

During authentication, Beyond Identity issues a challenge signed by the private keys in the device’s hardware TPM, evaluates user and device 
security risk in real-time, and makes a risk-based access decision based on your security requirements.
