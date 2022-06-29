---
title: Applications and Authenticator Config
sidebar_position: 5
---

### Authenticator Config: 

## What are Authenticator Configs: 

Authenticator Configs are: 

A few varieties that can be created. We support Hosted Web and Embedded which corresponds to the SDK. Each of them has configurable fields. 

In the embedded cloud config, Invoke URL and Array of Trusted Origins, which is required to support CORS. 
The Invoke URL is used to launch the authenticator during the credential binding process. 
The Trusted Origins are where we go get a couple of endpoints in the Authenticator gateway, to get metadata about the authentication request. There may be 3 endpoints we call out to here. [Expand this]

The Hosted Authenticator doesn't need any configurable fields. [Paho may know more about this]

If you need this credential binding job to work from your own origin, you can configure that using an SDK Auth Config. And that will support your trust binding from your own domain. 