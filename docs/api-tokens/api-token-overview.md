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
   date: 07/07/2023
   author: Jen Field
doc_type: overview
displayed_sidebar: mainSidebar
---   


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

- Scope: One or more identifiers of specific access levels the token will allow.  Find out more about scopes [here](/docs/next/api-scopes).  


## How to get a token

You can obtain tokens [via the Beyond Identity console](/docs/next/create-api-token#admin-console) or [programmatically via the Beyond Identity API](/docs/next/create-api-token#api).  

## App properties that impact token requests and token validation

In order to request a token, you need to have an [app configured in your Beyond Identity tenant](/docs/next/add-an-application). 

This can be an application you configure yourself, or you can request a token for the built in Beyond Identity Management API app.  

Several app properties impact how tokens should be requested and validated.   
  
- **Protocol**: the two options for protocol are OAuth2 and OIDC:  

  - With the OAuth2 protocol, you can use either the client credentials grant type or the authorization code grant type.

  - With the OIDC protocol, you must use the authorization code grant type. The OIDC response will contain an id_token as well as an access_token.  

  With either protocol, you can configure your client to be either a confidential or a public client.  

- **Client type**: the two options for client type are **Confidential** and **Public**. 

  - A **Confidential** client has client credentials (a client secret) that it can use to authenticate a token request API call. 

  - A **Public** client does not. 

- **PKCE** setting: 

  - If the app's PKCE setting is 's256', you will need to create and send the PKCE parameters (code_challenge, code_challenge_method, and code_verifier) in your token requests as described [in the examples here](/docs/next/create-api-token)

  - If the app's PKCE setting is **Disabled**, you do not need to send the PKCE parameters in your token requests. However, authorization code grant with PKCE is the recommended flow for token requests and is required for public clients.  

- **Token Endpoint Auth Method**: this setting determines how token requests that contain client credentials send those credentials    

  - **Client secret basic** means that the client credentials are sent as HTTP headers  

  - **Client secret POST** means that client credentials are sent in the POST body of the HTTP request

- **Grant Type**: the two options for grant type are **Client Credentials** and **Authorization Code**. This determines how you will construct the token requests and what the user experience will be. 

- **Resource Server**: If the app is linked to a resource server, the resource server determines the [scopes the app can be allowed](/docs/next/api-scopes) to issue.

- **Token Format**: the two options for token format are **Self-Contained** and **Referential**. The difference between these two options impacts how the tokens will be validated. 

  - **Self-Contained** tokens can be validated offline because they contain all of the validation information. 

  - **Referential** tokens require a [call to an introspection API for validation](/docs/next/validate-access-tokens).  

- **Token Configuration**: within an app's token configuration, the **Allowed Scopes** and **Expires** attributes determine, respectively, which [scopes can be requested from the app](/docs/next/api-scopes), and how long tokens will be valid.

  :::note
  The **Allowed Scopes** will not be available unless the app is linked to a [resource server](/docs/next/add-resource-server).
  :::

- **Enable refresh tokens**: Finally, the **Enable Refresh Tokens** option determines whether refresh tokens will be included in token responses in addition to access tokens.  
