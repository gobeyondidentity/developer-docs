---
title: App Config for Mac and Linux
sidebar_position: 3
---

**(continuation from [Getting Started](/docs/v1/getting-started))**

For instructions on Windows jump to: [Example app for Windows](/docs/v1/example-app-windows)

## 6. Configure your local environment (macOS and Linux)

### Create a Realm

First, we need to create a new realm to hold identities and configuration: 

**Request**
```bash
curl -X POST -H "Authorization: Bearer $API_TOKEN" -H "Content-Type: application/json" -d '{
  "realm" : { 
  "display_name" : "Test Realm" 
  }
}' https://api-us.beyondidentity.com/v1/tenants/$TENANT_ID/realms
```

**Response:**
```json
{
  "id": "76faedfb4342e82f", // <= REALM_ID
  "create_time": "2022-07-12T21:34:37.427115Z",
  "display_name": "Test Realm",
  "tenant_id": "000191bbf35a63ac",
  "update_time": "2022-07-12T21:34:37.427115Z"
}
```

Grab the Realm ID from the response and set an environment variable for it:

```bash
export REALM_ID=<realm-id-from-your-response>
```

### Create an Authenticator Configuration

**Request:**
```bash
curl -X POST -H "Authorization: Bearer $API_TOKEN" -H "Content-Type: application/json" -d '{
"authenticator_config": {
  "config": {
  "type": "embedded",
  "invoke_url": "http://localhost:3001",
  "trusted_origins":["http://localhost:3002"]
  }
}}' https://api-us.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs
```

**Example Response:**
```json
{
  "id": "f90019f4-e9e4-4989-af17-7c7b531f7c2c", // <= AUTH_CONFIG_ID
  "realm_id": "76faedfb4342e82f",
  "tenant_id": "000191bbf35a63ac",
  "config":
  {
    "type": "embedded",
    "invoke_url": "http://localhost:3001",
    "trusted_origins":
    [
      "http://localhost:3002"
    ]
  }
}
```

Grab the Authenticator Configuration ID from the response and set an environment variable for it:

```bash
export AUTH_CONFIG_ID=<authenticator-config-id-from-your-response>
```

### Create an Application

**Request: **
```bash
curl -X POST -H "Authorization: Bearer $API_TOKEN" -H "Content-Type: application/json" -d '{
  "application": {
    "protocol_config": {
      "type": "oidc",
      "allowed_scopes":[],
      "confidentiality": "confidential",
      "token_endpoint_auth_method": "client_secret_basic",
      "grant_type":["authorization_code"],
      "redirect_uris":["http://localhost:3001/auth/callback"],
      "token_configuration": {
        "expires_after": 86400,
        "token_signing_algorithm": "RS256",
        "subject_field": "USERNAME"
      }
    },
    "authenticator_config": "$AUTH_CONFIG_ID",
    "display_name": "Test Application"
  }
}' https://api-us.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications
```

**Example Response:**
```json
{
  "id": "845b9fc9-cb61-4892-8272-a9899657bef1", // <= APPLICATION_ID
  "realm_id": "76faedfb4342e82f",
  "tenant_id": "000191bbf35a63ac",
  "protocol_config":
  {
    "type": "oidc",
    "allowed_scopes":
    [],
    "client_id": "8qwi78xeHtcgSmM16I3H7eNN",  // <= APP_CLIENT_ID
    "client_secret": "KGkJiGVqdplvm_KtLZrpulckYsd6EFTwPHP9Ld6aa4aUDWqO", // <= APP_CLIENT_SECRET
    "confidentiality": "confidential",
    "token_endpoint_auth_method": "client_secret_basic",
    "grant_type":
    [
      "authorization_code"
    ],
    "redirect_uris":
    [
      "http://localhost:3001/auth/callback"
    ],
    "token_configuration":
    {
      "expires_after": 86400,
      "token_signing_algorithm": "RS256",
      "subject_field": "username"
    }
  },
  "authenticator_config": "f90019f4-e9e4-4989-af17-7c7b531f7c2c",
  "is_managed": false,
  "display_name": "Test Application"
}
```

Grab the `Application ID`, `Client ID` and `Client Secret` from the response and set an environment variable each one of them:

```bash
export APPLICATION_ID=<application-id-from-your-response>
export APP_CLIENT_ID=<app-client-id-from-your-response>
export APP_CLIENT_SECRET=<app-client-secret-from-your-response>
```

# Running the example application

### Start the backend and frontend
1. Install dependencies with:
  ``` bash
  yarn install
  ```

If `yarn` is not installed in your system, check the [Prerequisites](/docs/v1/getting-started#1-check-the-basics).

2. Build and run the application:
  ``` bash
  yarn start
  ```
3. Open a web browser and navigate to [http://localhost:3002](http://localhost:3002)

---

## What's next? 

You can use the example application above to create one or more Passkeys and log in with them. 

### Questions? Want to see more?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.
