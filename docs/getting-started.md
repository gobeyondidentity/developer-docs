---
title: Getting Started
sidebar_position: 2
---
In this guide we will show you how to create a tenant and connect the [Beyond Identity Demo Application](https://github.com/gobeyondidentity/bi-getting-started) to it. This app will demonstrate common workflows such as creating a passkey and using it to authenticate.

# Create a Tenant

Navigate here to [Create a Tenant](https://www.beyondidentity.com/developers/signup).

Once your tenant has been created with Beyond Identity, you can continue to clone the app, get a `tenant_id` and API token.

---

# Configuring the example application

You can review the [pre-requisites](#pre-requisites) if you need help configuring your environment. 

## Cloning the repo

The source code for the example application is hosted in Github: https://github.com/gobeyondidentity/bi-getting-started.

```bash
git clone https://github.com/gobeyondidentity/bi-getting-started.git
```

Change directory into the repo: 

```bash
cd bi-getting-started
```

--- 

## Get your Tenant ID
Log into the [Admin Console](https://console-us.beyondidentity.com) using the Passkey obtained from the step above. 

To get your Tenant ID and Realm ID: 

1. On your left navigation bar click **Home**. 

2. Click **Edit Realm** on the top right side of your screen, copy the `Tenant ID` value. 

### **On macOS and Linux**

```bash
export VDC_REGION=<use "us" or "eu">
```

```bash
export TENANT_ID=<tenant_id_from_above>
```

### **On Windows**
```bash
set VDC_REGION=<use "us" or "eu">
```

```bash
set TENANT_ID=<tenant_id_from_above>
```

## Create an API token

From the [Admin Console](https://console-us.beyondidentity.com), create an API Token for your tenant by: 

1. Click **Applications**.
2. Click **Beyond Identity Management API**.
3. Click **API Tokens**.
4. **Create a token and click the copy button**, use the API Token to set the environment variables as shown below. 

### **On macOS and Linux**

```bash
export API_TOKEN=<api-token-from-above>
```

### **On Windows**
```bash
set API_TOKEN=<api-token-from-above>
```

---

## Configure your local environment (macOS and Linux)

For instructions on Windows jump to: [Windows](#configure-your-local-environment-windows)

This script will generate the necessary configuration to connect the example application to your tenant. 
``` bash
./configure-tenant.sh
```
After running the script a .env file should appear in your directory. This .env file contains necessary configuration for the example application. It should look something like this.

``` bash
# Generated with ./configure-tenant.sh
export TENANT_ID=0001c8ea474452ea
export API_TOKEN=eyJ0eXAiOiJKV1...0eXA
export REALM_ID=91f5d90efccb5cd1
export AUTH_CONFIG_ID=21ca78da-1272-4f65-5894-12d16c01393f
export APPLICATION_ID=8c62e8c5-519b-4756-ba1d-33bbc7425898
export APP_CLIENT_ID=ciNDwLl5_1lqjDJ5A-fN0
export APP_CLIENT_SECRET=wNY-T33IqCL0PEflitmPkFZE2GpwXDiVXPDpXPfP8BU
export VDC_REGION=us
```

### Start the backend and frontend
1. Install dependencies with:
	``` bash
	yarn install
	```

2. Build and run the frontend application:
	``` bash
	yarn start
	```

3. Open a web browser and navigate to [http://localhost:3002](http://localhost:3002)

**That's it!** You now have a fully configured environment and example application to discover. 

## What's next? 

You can use the example application above to create one or more Passkeys and log in with them. 

### Questions? Want to see more?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

---

## Configure your local environment (Windows)

For instructions on macOS and Linux jump to: [macOS and Linux](#configure-your-local-environment-macos-and-linux)

### Create a Realm

First, we need to create a new realm to hold identities and configuration: 

**Request**
```bash
curl -v -H "Authorization: Bearer %API_TOKEN%" -d "{\"realm\" : { \"display_name\" : \"Test Realm\" }}" -H "Content-Type: application/json" https://api-us.beyondidentity.com/v1/tenants/%TENANT_ID%/realms
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
set REALM_ID=<realm-id-from-your-response>
```

### Create an Authenticator Configuration

**Request:**
```bash
curl -v -H "Authorization: Bearer %API_TOKEN%"  -d "{ \"authenticator_config\" : { \"config\" : { \"type\" : \"embedded\", \"invoke_url\" : \"http://localhost:3001\", \"trusted_origins\" : [\"http://localhost:3002\"] }}}" -H "Content-Type: application/json" https://api-us.beyondidentity.com/v1/tenants/%TENANT_ID%/realms/%REALM_ID%/authenticator-configs
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
set AUTH_CONFIG_ID=<authenticator-config-id-from-your-response>
```

### Create an Application

**Request: **
```bash
curl -v -H "Authorization: Bearer %API_TOKEN%" -d "{ \"application\": { \"protocol_config\": {\"type\" : \"oidc\", \"allowed_scopes\": [], \"confidentiality\":\"confidential\", \"token_endpoint_auth_method\" : \"client_secret_basic\", \"grant_type\": [\"authorization_code\"], \"redirect_uris\":[\"http://localhost:3001/auth/callback\"], \"token_configuration\": {\"expires_after\":86400, \"token_signing_algorithm\": \"RS256\", \"subject_field\":\"USERNAME\"}}, \"authenticator_config\" : \"%AUTH_CONFIG_ID%\", \"display_name\": \"Test Application\"}}" -H "Content-Type: application/json" https://api-us.beyondidentity.com/v1/tenants/%TENANT_ID%/realms/%REALM_ID%/applications
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
set APPLICATION_ID=<application-id-from-your-response>
set APP_CLIENT_ID=<app-client-id-from-your-response>
set APP_CLIENT_SECRET=<app-client-secret-from-your-response>
```

# Running the example application

### Start the backend and frontend
1. Install dependencies with:
	``` bash
	yarn install
	```

If `yarn` is not installed in your system, check the [Prerequisites](#pre-requisites).

2. Run the server:
	``` bash
	yarn serve_win
	```

3. Build and run the frontend application:
	``` bash
	yarn start
	```
4. Open a web browser and navigate to [http://localhost:3002](http://localhost:3002)

## What's next? 

You can use the example application above to create one or more Passkeys and log in with them. 

### Questions? Want to see more?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

--- 

## Pre-requisites
The Beyond Identity Example Application is made up of a [node.js](https://nodejs.org) backend and a [angularjs](https://angular.io/) frontend. Youll need standard developer tools to get it up and running.

#### **macOS, Windows and Linux**

1. Download and install `git`: https://git-scm.com/downloads

2. Download and install `nodejs`: https://nodejs.org/en/download/

3. Install `yarn`: https://classic.yarnpkg.com/lang/en/docs/install/

#### **macOS only**

4. Download and install `brew`: https://brew.sh/

5. Install `jq` and `curl`. 
	``` bash
	brew install jq curl
	```
2. Download and install nodejs https://nodejs.org/en/download/



