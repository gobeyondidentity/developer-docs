---
title: Getting Started
sidebar_position: 2
---

In this guide we will show you how to create and configure your account and connect a demo application to it. This app will demonstrate common workflows like creating a passkey and using it to authenticate.

--- 

## 1. Check the basics

The Beyond Identity Example Application is made up of a [node.js](https://nodejs.org) backend and a [NextJS](https://next-auth.js.org/) frontend. You'll need standard developer tools to get it up and running.

#### **macOS, Windows and Linux**

1. **Git:** Download and install `git`: https://git-scm.com/downloads

2. **NodeJS**: Download and install `nodejs`: https://nodejs.org/en/download/

--- 

## 2. Download the example application

### Clone the repo

The source code for the example application is hosted in [Github](https://github.com/gobeyondidentity/getting-started).

```bash
git clone https://github.com/gobeyondidentity/getting-started.git
```

Change directory into the repo: 

```bash
cd getting-started
```

---

## 3. Create a Tenant

Head to the [signup form](https://www.beyondidentity.com/developers/signup) and fill out your info.

> This process creates various resources described in Beyond Identity's [architecture](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture). It also creates a [passkey](https://developer.beyondidentity.com/docs/v1/platform-overview/passkeys-and-devices/what-are-passkeys) that allows you to log into the Beyond Identity Console without a password. Due to the nature of passkeys, the credential created on signup *only works with the Console*. New passkeys must be created in the correct realm for accessing other applications.

Once your tenant has been created with Beyond Identity, you can continue to configure the sample app, get an API token, a `tenant_id`, a `realm_id` and some other configuration parameters.

--- 

## 4. Make a copy of the config file

Run the following command from the home directory for the example app:

```mac tab
cp .env.local.example .env.local
```
```win tab
copy .env.local.example .env.local
```
---

## 5. Set your Region variable on the config file

Edit `.env.local` and set the value of the `REGION` variable according to where your account was created (`us` or `eu`).

---

## 6. Get your Tenant ID

<img src="/assets/getting-started-copy-tenant-id.gif" width="800px" />

Log into the [Admin Console](https://console-us.beyondidentity.com), then to get your Tenant ID: 

1. On the navigation bar to the left click **Home**. 

2. Click **Edit Realm** on the top right side of your screen, copy the `Tenant ID` value. 

3. Edit `.env.local` and paste the value of the `TENANT_ID` variable from the clipboard.


--- 
## 7. Create an API token

<img src="/assets/getting-started-create-api-token.gif" width="800px" />

From the [Admin Console](https://console-us.beyondidentity.com), create an API Token for your tenant by: 

1. Click **Applications**.
2. Click **Beyond Identity Management API**.
3. Click **API Tokens**.
4. **Create a token and click the copy button**, use the API Token to set the environment variables as shown below. 
5. Edit `.env.local` and paste the value of the `API_TOKEN` variable from the clipboard.

---

## 8. Configure Beyond Identity to manage identities for your app

So far, only the [Admin Realm](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#admin-realm) exists for your Beyond Identity tenant. You don't want your app's users to be created there! The steps below create a set of Beyond Identity resources that will contain your end users' identities.

### Create a Realm

We need to create a new [Realm](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#realms) to hold identities and configuration: 

<img src="/assets/getting-started-create-realm.gif" width="800px" />

From the Admin Console: 
1. Click the Realm selector on the top-left.
2. Click **Create New Realm**.
3. Type the name of your new realm. Click **Create Realm**.
4. Click **Switch to Realm**.
5. From the Realm's Home page, click Edit. 
6. **Copy the value for Realm ID** and paste it on the `.env.local` file under `REALM_ID`.


### Create an Application

Next, we we'll create a new [Application](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#applications-and-authenticator-configs) that contains the configuration for your end users:

<img src="/assets/getting-started-create-app.gif" width="800px" />

From the Admin Console: 
1. From the navigation bar, click **Applications**, then click **Create app**.
2. Type a name for your new Application. 
3. Scroll to Redirect URIs, type `http://localhost:8083/api/auth/callback/beyondidentity`.
4. Ensure "Token Endpoint Auth Method" is set to "Client Secret Basic".
5. Click on the Authenticator Config tab, change the Configuration Type to `Embedded` and set the **Invoke URL** and **Trusted Origin** values to: `http://localhost:8083`.
6. Click Submit to save your changes.

### Complete your example application's configuration

Next, we'll copy the **Application ID**, **Authenticator Configuration ID**, **App Client ID** and **App Secrets** into the `.env.local` configuration. 

<img src="/assets/getting-started-copy-config.gif" width="800px" height="1200px" />

From the Admin Console: 
1. From the navigation bar, click **Applications**, then select the application created on the step above. 
2. **Copy the value for Application ID** and paste it on the `.env.local` file under `APPLICATION_ID`.
3. **Copy the value for Client ID** and paste it on the `.env.local` file under `APP_CLIENT_ID`.
4. **Copy the value for Client Secret** and paste it on the `.env.local` file under `APP_CLIENT_SECRET`.
5. Click on the Authenticator Config tab, **Copy the value for Authenticator Config ID** and paste it on the `.env.local` file under `AUTHENTICATOR_CONFIG_ID`.

Learn more about [Authenticator Configurations](/docs/v1/platform-overview/authenticator-config).

---

## 9. Running the example application

### Start the backend and frontend
Install dependencies and run with:

```yarn tab
yarn start
```
```npm tab
npm start
```

A new browser tab should open automatically. If it doesn't, open a web browser and navigate to [http://localhost:8083](http://localhost:8083). The example application will now appear and allow you to create passkeys in the browser. 

<img src="/assets/getting-started-example-app.gif" width="800px" />

---

## What's next? 

You can use the example application above to create one or more passkeys and log in with them. 

### Questions? Want to see more?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.


