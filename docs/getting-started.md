---
title: Getting Started
sidebar_position: 2
---
In this guide we will show you how to create a tenant and connect the Beyond Identity Example Application to it. The Beyond Identity Example Application will demonstrate common workflows such as creating a passkey and using it to authenticate.

## Tenant Setup

### Create a Tenant
Navigate here to [Create a Tenant](https://www.beyondidentity.com/developers/signup).

Once your tenant has been created with Beyond Identity, you can continue to create an API token. 

### Create an API token
Create an API Token for your tenant by: 

1. Click **Applications**.
2. Click **Beyond Identity Management API**.
3. Click **API Tokens**.
4. **Create a token and click the copy button**, we'll need it later. 

### Get your Tenant ID
To get your Tenant ID and Realm ID: 

1. On your left navigation bar click **Home**. 
2. Click **Edit Realm** on the top right side of your screen, copy the Tenant ID and Realm ID values. 

You will also receive an email from Beyond Identity that contains your Tenant and Realm ID's for later reference.

## Run the example application

You can review [pre-requisites](#pre-requisites) if needed. 

### Cloning the repo

The git repository for the example application is https://github.com/gobeyondidentity/bi-getting-started.

``` bash
git clone git@github.com:gobeyondidentity/bi-getting-started.git
cd bi-getting-started
```

### Run the tenant configuration script

This script will generate the necessary configuration to connect the example application to your tenant. 
``` bash
TENANT_ID=<your-tenant-id> API_TOKEN=<your-api-token> ./configure-tenant.sh
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

## What's next? 

You can use the example application above to create one or more Passkeys and log in with them. 

### Questions? Want to see more?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.

### Pre-requisites
The Beyond Identity Example Application is made up of a [node.js](https://nodejs.org) backend and a [angularjs](https://angular.io/) frontend. Youll need standard developer tools to get it up and running.

1. Download and install git https://git-scm.com/downloads

2. Download and install nodejs https://nodejs.org/en/download/

3. Download and install brew https://brew.sh/

4. Install jq and curl. 
``` bash
brew install jq curl
```

