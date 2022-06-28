---
title: Passkeys and Devices
sidebar_position: 3
---

[ROUGH DRAFT, needs fleshing out and editing]

# Passkeys and how to bind them to devices

## What are credential binding jobs:
We have a passkey which is a link between device and identity
We Support multiple passkeys per identity
We bind them using Credential Binding Job (may want to change name)
This tracks the process of enrolling a new device and tracking the status of that. 

How? 

Credential Binding Jobs are created via the REST API. To create a new job you need to provie the ID's for all the entities related to it. 
Parameters include a delivery method (e.g ask for credential binding to be delivered directly on the API response or email). 
Specify a redirect URI which is where the caller will be redirected once the binding is completed. 

We set an expiration on the link. The expiration defaults to 7 days. 

A credential binding job is essentially a state machine. We track different states: 
Link opened, link sent, request delivered, and complete. This state can be seen in the console. 

There's also a REST API to see the state of a credential binding job. Those can be found here [provide link]. 
We don't currently support stopping a credential binding job. Credential binding jobs expire naturally after 7 days. 

### SDK Auth Config: 

## What are SDK Auth Configs: 

SDK Auth Configs are There are a few varieties that can be created. We support Hosted Web and Embedded which corresponds to the SDK. Each of them has configurable fields. 

In the embedded cloud config, Invoke URL and Array of Trusted Origins, which is required to support CORS. 
The Invoke URL is used to launch the authenticator during the credential binding process. 
The Trusted Origins are where we go get a couple of endpoints in the Authenticator gateway, to get metadata about the authentication request. There may be 3 endpoints we call out to here. [Expand this]

The Hosted Authenticator doesn't need any configurable fields. [Paho may know more about this]

If you need this credential binding job to work from your own origin, you can configure that using an SDK Auth Config. And that will support your trust binding from your own domain. 

## Which mechanisms can be used to bind credentials [Jeff Chapman]: 

JWT and WebAuthn signing requests. 

## Credentials: 

- Lifecycle: 
- Doesn't support a true update, it's just a state change. You can't put fields on the credential, you can revoke. 

We currently don't drive revocation. They don't expire either. 
There's an API endpoint to revoke a credential which is essentially stop trusting the public key. 

## You can't create a credential directly on the endpoint. You have to go via the binding jobs. 
We don't support this because we wanted to be able to keep track of whats on every credential for now. 

[Confirm if there's a signature associated with our credential]



