---
title: Introduction
sidebar_position: 1
---

Welcome to developer docs for Beyond Identity Secure Customers. This is where you can find guides for building strong, passwordless authentication across your applications using universal passkeys. 

If you run into any issues or have feedback for us along the way, you can let us know by **[joining our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

## Just looking to get going? 

Follow our [Getting Started guide](/docs/v1/getting-started). 

## What is Beyond Identity

Beyond Identity helps companies deploy the strongest authentication primitives on the planet, eliminating shared secrets for customers, employees, developers, and contractors. 

Unique to Beyond Identity, the password is completely eliminated for sign-up, login, and recovery. For the customer, they never have to type a password, enter a code, click a push notification, or pick up a second device at all for authentication across all devices. 

Given that the password is completely deprecated from the user flows, you also don’t need to store it in your database. What doesn’t exist cannot be stolen and by eliminating the reliance on shared secrets, Beyond Identity eliminates over 80% of breaches. 

In addition to the fact that authentication is multi-factor by default, Beyond Identity also delivers real-time user and device risk signals that you can leverage to implement risk-based access controls that prompt for step-up authentication in scenarios you deem to be higher risk. 

Backed by a cloud-native architecture, our platform was built for enterprise workloads. All SDKs use industry-standard protocols (OIDC/OAuth2.0) and include a sample app.


## Why does Beyond Identity exist?

We believe that the burden of authentication should never fall to human beings and we believe this is a worthwhile problem to solve. 

In order to fully address challenges of customer authentication, the solution must be:
 - Secure: multi-factor with zero reliance on shared secrets or phishable factors
 - Easy to use: frictionless with no need for second devices or complicated steps
 - Universal across applications and devices: consistent passwordless experience cross native and web apps on any device
 - Simple for developers to integrate: to reduce engineering workload so developers can work on their core product instead of authentication

The only solution that met the above requirements was an authentication framework built off of public-private key pairs. 

While we’re not the first to solve the problem with asymmetric cryptography, the existing solutions today fall short given the lack of cross-platform interoperability, the continued reliance on passwords as the first factor, and the friction presented to users. 



## How it Works
Beyond Identity allows developers to implement strong authentication from multiple devices based on public-private key pairs (what we call universal passkeys). All keys are cryptographically linked to the user and can be centrally managed using our APIs.

Instead of shared secrets, Beyond Identity authenticates customers with two strong factors -- "something you are" from the device biometric and "something you own" from the private key -- without requiring a second device.

During enrollment, the user receives a binding token that prompts the creation of a unique, device-bound credential with a private key generated and stored in the TPM and a public key sent to the Beyond Identity Cloud.

During authentication, Beyond Identity issues a challenge signed by the private keys in the device’s hardware TPM, evaluates user and device 
security risk in real-time, and makes a risk-based access decision based on your security requirements.
