---
title: Introduction
---

## Overview

Welcome to the Beyond Identity Developer docs. The place where you can find product guides for Beyond Identity's strong authentication product. 

These guides provide the information and tools to implement authentication user journeys. 

If you run into any issues or have feedback for us along the way, you can let us know by **[joining our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

## About Beyond Identity
Beyond Identity helps customers deploy the strongest authentication primitives on the planet, eliminating shared secrets for customers at registration, login, and recovery, as well as from your database.

Unique to Beyond Identity, customers never have to pick up a second device to enroll or perform multifactor authentication, passwords are never used on user flows. They can be removed from your database, and you can implement risk-based access controls using granular user and device risk captured in real-time.

Backed by a cloud-native architecture, our platform was built for enterprise workloads. All SDKs use industry-standard protocols (OIDC/OAuth2.0) and include a sample app. 

## How it Works
Beyond Identity allows developers to implement strong authentication from multiple devices based on public-private keypairs. All keys are cryptographically linked to the user and can be centrally managed using our APIs. 

Instead of shared secrets, Beyond Identity authenticates customers with two strong factors -- "something you are" from the device biometric and "something you own" from the private key -- without requiring a second device. 

During enrollment, the user receives a binding token that prompts the creation of a unique, device-bound credential with a private key generated and stored in the TPM and a public key sent to the Beyond Identity Cloud.

During authentication, Beyond Identity issues a challenge signed by the private keys in the device’s hardware TPM, evaluates user and device security risk in real-time, and makes a risk-based access decision based on your security requirements.