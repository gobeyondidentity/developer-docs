---
title: Configure OIDC Connection
sidebar_position: 1
---

Before you can use Beyond Identity to authenticate users, you will need to create an OpenID Connect (OIDC) client. OIDC is an identity layer built on top of OAuth2.0 that enables:

* Your users to authenticate into your app
* You, as the developer of the app to receive basic information about the user

You can create a OIDC client within the Admin portal or via our API. The rest of this guide documents how to create an OIDC client via API.

To create an OIDC client, you will need to issue an `HTTP POST` to `https://api.byndid.com/v0/oidc/clients` with the following fields:

| Name								| Type		|Description	|
|------------------------------ 	|-----------|---------------|
| **name**							| String	|**Required.** This is the name of the OIDC client you are creating. Typically this will be the same as or similar to the name of the application you are building.|
| **redirect_uris**					| [String]	|**Required.** The redirect URIs that you will want the authorization code routed to. This can either be a url to a page in your web application, a universal url/app link to a page in your native app, or directly to a server.|
| **id_token_signed_response_alg**	| String	|**Required.** The algorithm used to sign the JWT that authenticates the client. This can be either `ES256` or `RS256`.|
| **token_endpoint_auth_method**	| String	|**Required.** The request client authentication method when used to request an access token. Values supported here are `client_secret_basic`, `client_secret_post` and `none` (only supported on public clients).|

Example Request

```bash
curl -X POST "https://api.byndid.com/v0/oidc/clients" \
--header "content-type: application/json" \
--header "Authorization: Bearer <API_TOKEN>" \
--data-binary @- << 'EOF'
{
  "name": "<OAUTH_APP_NAME>",
  "redirect_uris": "[<REDIRECT_URIS>]",
  "id_token_signed_response_alg": "ES256 | RS256",
  "token_endpoint_auth_method": "client_secret_basic"
}
EOF
```

:::tip 
Even though we only allow one value for both `id_token_signed_response_alg` and `token_endpoint_auth_method`, you must still specify them in the request.
:::

The response to this API call is a JSON object consisting of the following fields:

| Name 								| Type 		| Description 	|
| ----------------------------- 	| ---------	| ------------- |
|**id** 							| String	| The OIDC client's unique identifier. This is not the same as the `client_id`.| 
|**redirect_uris**					| [String]	| The same array of redirect URIs you used to configure your OIDC client.|
|**id_token_signed_response_alg**	| String	| The algorithm used to sign the JWT that authenticates the client. This can be either `ES256` or `RS256`.|
|**token_endpoint_auth_method**		| String	| The request client authentication method when used to request an access token. Values supported here are `client_secret_basic`, `client_secret_post` and `none`.|
|**client_id**						| String	| The id of the client that is used when making requests to the `/authorize` and `/token` endpoints.||client_secret|String|The secret that is used when making a request to the `/token` endpoint from a confidential client.|
|**date_created**					| String	| The date that specifies when the OIDC client was created. Formatted as [RFC 3339](https://tools.ietf.org/html/rfc3339).||date_modified|String|The date that specifies when the OIDC client was updated. Formatted as  [RFC 3339](https://tools.ietf.org/html/rfc3339).|

Example Response

```json
{
  "id": "<ID>",
  "name": "<NAME>",
  "redirect_uris": "[<REDIRECT_URIS>]",
  "id_token_signed_response_alg": "<ID_TOKEN_SIGNED_RESPONSE_ALG>",
  "token_endpoint_auth_method": "<TOKEN_ENDPOINT_AUTH_METHOD>",
  "client_id": "<CLIENT_ID>",
  "client_secret": "<CLIENT_SECRET>",
  "date_created": "<DATE_CREATED>",
  "date_modified": "<DATE_MODIFIED>"
}
```

:::tip 
It might be easy to confuse id with `client_id`. One easy way to remember is the `client_id` lives on the public or confidential client that is requesting the authorization code and/or the access token. The `id` on the other hand is only used when making an HTTP PUT request to update your OIDC client.
:::

You can optionally update your OIDC client after you've created it. In order to do so, you'll need to make an `HTTP PUT` request to `https://api.byndid.com/v0/oidc/clients/{id}`. Note that the id that needs to be specified here is the `id` in the response after you first created the OIDC client. The same fields specified when creating the OIDC client are the same fields that you can update.

Now that you've created an account with Beyond Identity, configured it and created an OIDC client, you're ready to implement Beyond Identity into your registration and authentication flow.