---
title: Access token overview
id: api-token-overview
description: ''
slug: /api-token-overview 
keywords: 
 - api token
 - access token
pagination_next: null
pagination_prev: null
last_update: 
   date: 08/25/2023
   author: Jen Field
doc_type: overview
displayed_sidebar: mainSidebar
---   

import AppExternalProtocolProperties from '../includes/_app_external_protocol_properties.mdx';

## What is an access token

An access token, also called an API token, is an object or file that enables access to an application or resource. 

The token is digitally signed and contains information about what resources can be accessed and for how long.  

## Why do we have access tokens

Access tokens allow you to avoid using secret credentials, a.k.a. passwords, to authenticate API calls. 

Rather than using “Basic” authentication and including credentials in the Authorization header of an HTTP request, you can include a signed token instead. This is known as "Bearer” authentication.  

## Are there other token types

The OAuth and OIDC set of specifications define [access_tokens](https://datatracker.ietf.org/doc/html/rfc6749#section-1.4), [id_tokens](https://openid.net/specs/openid-connect-core-1_0.html#IDToken), and [refresh tokens](https://datatracker.ietf.org/doc/html/rfc6749#section-1.5).    

## Is it API token or access token?

The terms 'API token' and 'access token' refer to the same type of token. These are distinct from id tokens and refresh tokens.  

## Self-contained vs referential tokens  

Access tokens may contain all the information needed to validate them, or they may require relying parties to call an endpoint for validation. 
The former are called **self-contained tokens** and are encoded in JWS format. The latter are called **referential tokens** and are encoded in JWE.  

## Access token contents 

The information contained in (or referenced by) an access token varies, but some elements are common: 

- Issuer ID: The issuer of the token is the authority responsible for the token. The issuer's ID is commonly the URL (such as a Beyond Identity app URL) that received and responded to the token request  

- Audience: The identifier of the app or API that will consume the token   

- Subject: An identifier of either the user or the app the token represents / was issued to  

- Scope: One or more identifiers of specific access levels the token will allow.  Find out more about scopes [here](/docs/api-scopes).  


## How to get a token

You can obtain tokens [via the Beyond Identity console](/docs/create-api-token#admin-console) or [programmatically via the Beyond Identity API](/docs/create-api-token#api).  

## App properties that impact token requests and token validation

In order to request a token, you need to have an [app configured in your Beyond Identity tenant](/docs/add-an-application). 

This can be an application you configure yourself, or you can request a token for the built in Beyond Identity Management API app.  

<AppExternalProtocolProperties />  


