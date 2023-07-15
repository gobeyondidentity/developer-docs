---
title: Authenticator Types
last_update: 
   date: 02/15/2023
---

# Authenticator Types

## Prerequisites

- Set up a [developer account](./account-setup)

## Overview

Beyond Identity currently offers two different types of authenticators:

- [Authenticator Types](#authenticator-types)
  - [Prerequisites](#prerequisites)
  - [Overview](#overview)
  - [Hosted Web Authenticator](#hosted-web-authenticator)
  - [Embedded SDK Authenticator](#embedded-sdk-authenticator)

These can be configured in your [Authenticator Config](../platform-overview/authenticator-config).

## Hosted Web Authenticator

The hosted web authenticator is a webpage hosted by Beyond Identity that embeds the [JavaScript SDK](./sdk-setup.mdx). Think of this as a wallet, hosted by Beyond Identity Cloud, that can be used to hold an identity's passkeys. 

It can be found at `https://auth-<REGION>.beyondidentity.com/authenticator`.

- https://auth-us.beyondidentity.com/authenticator
- https://auth-eu.beyondidentity.com/authenticator

The hosted web authenticator requires less configuration and code, but it does require redirecting your users to the hosted webpage. Keep in mind that passkeys are tied to an origin and they are stored on a specific browser.

## Embedded SDK Authenticator

The embedded SDK authenticator is embedded directly in your application on installation of an [SDK](./sdk-setup.mdx) (iOS, Android, Flutter, React Native, or JS).

Using an SDK requires more configuration and code, but it comes with more flexibility such as silent authentication and keeping the whole experience inside your application. Passkeys are stored on the same device as your native application or on a specific browser and origin for your web application.

For more information on what it takes to wire up authentictaion in your application with an SDK, visit the guide [Authentication with Passkey](./authentication.md).
