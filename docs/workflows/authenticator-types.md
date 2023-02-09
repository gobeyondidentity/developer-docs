---
title: Authenticator Types
sidebar_position: 4
---

# Authenticator Types

## Prerequisites

- Set up a [developer account](./account-setup.md)

## Overview

Beyond Identity currently offers two different types of authenticators:

- [Hosted Web Authenticator](#hosted-web-authenticator)
- [Embedded SDK Authenticator](#embedded-sdk-authenticator)

These can be configured in your [Authenticator Config](../platform-overview/authenticator-config.md).

## Hosted Web Authenticator

The hosted web authenticator is a webpage hosted by Beyond Identity that embeds the [JavaScript SDK](./sdk-setup.mdx). Think of this as a wallet, hosted by Beyond Identity Cloud, that can be used to hold an identity's passkeys.

It can be found at `https://auth-<REGION>.beyondidentity.com/authenticator`.

- https://auth-us.beyondidentity.com/authenticator
- https://auth-eu.beyondidentity.com/authenticator

The hosted web authenticator requires less configuration and code, but it does require redirecting your users to the hosted webpage. Keep in mind that passkeys are stored on a specific browser.

## Embedded SDK Authenticator

The embedded SDK authenticator is embedded directly in your application on installation of an [SDKs](./sdk-setup.mdx) (iOS, Android, Flutter, React Native, or JS).

Using one of the SDKs requires more configuration and code, but it comes with more flexibility and passkeys are stored on the same device as your application.

For more information on what it takes to wire up authentictaion in your application with an SDK, visit the guide [Authentication with Passkey](./authentication.md).
