---
title: Introduction
description: Welcome to the Secure Customer developer documentation for Beyond Identity. Here you'll find guides for building strong authentication across your applications using public-private key pairs (what we call universal passkeys). 
keywords:
  - secure customer 
  - developer documentation
  - how it works
last_update:
  date: 01/12/2023
  author: Patricia McPhee
---

Welcome to the Secure Customer developer documentation for Beyond Identity. Here you'll find guides for building strong authentication across your applications using *universal passkeys* (public-private key pairs). 


If you run into any issues or have feedback for us along the way, you can let us know by **[joining our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

## Are you looking to get going quickly?

Follow the [Getting Started guide](./getting-started), where you'll create and configure your Beyond Identity account and connect it to a sample application. This application demonstrates common workflows for authentication. After working with the sample application, you can ...


## What is Beyond Identity?


Beyond Identity is a new kind of authenticator that advances your security posture. Instead of passwords, users download the Beyond Identity Authenticator to set up their secure, device-bound credentials for zero-friction [passwordless authentication](https://www.beyondidentity.com/resources/passwordless-authentication).


In a nutshell, Beyond Identity eliminates security vulnerabilities and user friction with secure multi-factor authentication. It also eliminates shared secrets for sign-up, sign-in/login, and recovery. As a result, customers never have to type a password, enter a code, click a push notification, or pick up a second device for authentication across all devices. 

Because authentication is multi-factor by default, Beyond Identity delivers real-time user and device risk signals. You can leverage these signals to implement risk-based access control that prompts step-by-step authentication in scenarios you deem higher risk. Therefore, with Beyond Identity, developers can deploy the strongest authentication primitives on the planet. 

Backed by a cloud-native architecture, you can use our platform for enterprise workloads. Also, our SDKs use industry-standard protocols (OIDC/OAuth2.0) and include a sample app found in the [Getting Started guide](./getting-started). 

## Why does Beyond Identity exist?

Public-private key pairs are a better way to authenticate users (and machines!). So, with that said, Beyond Identity fully addresses the challenges of customer authentication with the following requirements:

- **Secure:** multi-factor with zero reliance on shared secrets or phishable factors

- **Easy to use:** frictionless with no need for second devices or complicated steps

- **Universal across applications and devices:** consistent experience across native and web apps on any device

- **Simple for developers to integrate:** to reduce engineering workload so developers can work on their core product instead of authentication

Beyond Identity is an authentication framework built off public-private key pairs.

While we're not the first to solve the problem with asymmetric cryptography, today's existing solutions fall short, given the lack of cross-platform interoperability, and the friction presented to users.


## How it Works
Beyond Identity allows developers to implement strong authentication from multiple devices based on public-private key pairs (what we call universal passkeys). All keys are cryptographically linked to the user and can be centrally managed using our APIs.

Instead of shared secrets, Beyond Identity authenticates customers with two strong factors -- "something you are" from the device biometric and "something you own" from the private key -- without requiring a second device.

During enrollment, the user receives a binding token that prompts the creation of a unique, device-bound credential with a private key generated and stored in the TPM and a public key sent to the Beyond Identity Cloud.

During authentication, Beyond Identity issues a challenge signed by the private keys in the device’s hardware TPM, evaluates user and device 
security risk in real-time, and makes a risk-based access decision based on your security requirements.
