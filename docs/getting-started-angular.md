---
title: Getting Started (Angular)
sidebar_position: 3
---

import Arcade, {Clip} from '../src/components/Arcade.tsx';

:::tip
This guide is specifically for the Angular version of our getting started app. If you're interested in the React version, you can check that out [here](/docs/v1/getting-started).
:::

In this guide we will show you how to create and configure your account and connect a demo application to it. This app will demonstrate common workflows like creating a passkey and using it to authenticate.

:::info

## ** [Try it out](/docs/v1/try-it-out) 🚀 **

Want to see Universal Passkeys in action with no coding needed? [Try it out](/docs/v1/try-it-out)
:::

---

# Start by cloning the example app (for developers)

If you're not a developer or don't want to download the code yet, you can use the Try It Out 🚀 experience: [Try it out](/docs/v1/try-it-out) 🚀 

## 1. Check the basics

The Beyond Identity Example Application is made up of a [node.js](https://nodejs.org) backend and a [NextJS](https://next-auth.js.org/) frontend. You'll need standard developer tools to get it up and running.

#### **macOS, Windows and Linux**

1. **Git:** Download and install `git`: https://git-scm.com/downloads

2. **NodeJS**: Download and install `nodejs`: https://nodejs.org/en/download/

3. **Yarn**: Download and install `yarn`: https://classic.yarnpkg.com/lang/en/docs/install/

---

## 2. Download the example application

### Clone the repo

The source code for the example application is hosted in [Github](https://github.com/gobeyondidentity/getting-started-angular).

```bash
git clone https://github.com/gobeyondidentity/getting-started-angular.git
```

Change directory into the repo:

```bash
cd getting-started-angular
```

---

## 3. Create a Tenant

Head to the [signup form](https://www.beyondidentity.com/developers/signup) and fill out your info.

If you've already created a tenant, you can log in using the following links:

- [Admin Console - US Region](https://console-us.beyondidentity.com/login)
- [Admin Console - EU Region](https://console-eu.beyondidentity.com/login)

> This process creates various resources described in Beyond Identity's [architecture](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture). It also creates a [passkey](https://developer.beyondidentity.com/docs/v1/platform-overview/passkeys-and-devices/what-are-passkeys) that allows you to log into the Beyond Identity Console without a password. Due to the nature of passkeys, the credential created on signup _only works with the Console_. New passkeys must be created in the correct realm for accessing other applications. To learn more about what happens behind the scenes when you sign up for a developer account, see [Account Setup](./workflows/account-setup.md).

Once your tenant has been created with Beyond Identity, you can continue to configure the sample app, get an API token, a `tenant_id`, a `realm_id` and some other configuration parameters.

---

## 4. Set your Region

Set the `REGION` variable according to where your account was created: 

```mac tab
export REGION="us" | "eu"
```
```win tab
set REGION="us" | "eu"
```

---

## 5. Get your Tenant ID

<Arcade clip={Clip.FindTenantID} />

Log into the [Admin Console](https://console-us.beyondidentity.com), then to get your Tenant ID:

1. On the navigation bar to the left click **Home**.

2. Click **Edit Realm** on the top right side of your screen, copy the `Tenant ID` value.

3. Run the following command to configure the `TENANT_ID` variable:

```mac tab
export TENANT_ID=<tenant_id>
```
```win tab
set TENANT_ID=<tenant_id>
```

---

## 6. Create an API token

<Arcade clip={Clip.CreateAPIToken} />

From the [Admin Console](https://console-us.beyondidentity.com), create an API Token for your tenant by:

1. Click **Applications**.
2. Click **Beyond Identity Management API**.
3. Click **API Tokens**.
4. **Create a token and click the copy button**, use the API Token to set the environment variables as shown below.
5. Run the following command to set the `API_TOKEN` variable: 

```mac tab
export API_TOKEN=<api-token>
```
```win tab
set API_TOKEN=<api-token>
```

---

## 7. Configure Beyond Identity to manage identities for your app

So far, only the [Admin Realm](https://developer.beyondidentity.com/docs/v1/platform-overview/architecture#admin-realm) exists for your Beyond Identity tenant. You don't want your app's users to be created there! The steps below create a set of Beyond Identity resources that will contain your end users' identities.

### Create a Realm

We need to create a new [Realm](./workflows/realms.md) to hold identities and configuration:

<Arcade clip={Clip.CreateRealm} />

From the Admin Console:

1. Click the Realm selector on the top-left.
2. Click **Create New Realm**.
3. Type the name of your new realm. Click **Create Realm**.
4. Click **Switch to Realm**.
5. From the Realm's Home page, click Edit.
6. Copy the Realm ID from the response and set an environment variable for it:

```mac tab
export REALM_ID=<realm-id>
```
```win tab
set REALM_ID=<realm-id>
```

### Create an Application

Next, we we'll create a new [Application](./workflows/applications.md) that contains the configuration for your end users:

<Arcade clip={Clip.CreateApplication} />

From the Admin Console:

1. From the navigation bar, click **Apps**, then click **Add app**.
2. Type a name for your new Application.
3. Set the Protocol to "OIDC".
4. Set the Client Type to "Confidential".
5. Scroll to Redirect URIs, type `http://localhost:8082/auth/callback`. OIDC auth callbacks are handled on the backend and 8082 is the port where the backend is served on.
6. Ensure "Token Endpoint Auth Method" is set to "Client Secret Basic".
7. Click on the Authenticator Config tab, change the Configuration Type to `Embedded` and set the **Invoke URL** to `http://localhost:8082`. Angular handles routing on the backend and 8082 is the port where the backend is served on.
8. In the same Authenticator Config tab, set the **Trusted Origin** to: `http://localhost:8083`. API requests from the SDK are made from the frontend, so we need to specify port 8083 since that is the port where the frontend is served on.
8. Click Submit to save your changes.

### Complete your example application's configuration

Next, we'll set the **Application ID**, **Authenticator Configuration ID**, **App Client ID** and **App Secrets** variables in your environment.

<Arcade clip={Clip.CopyClientIDClientSecretAndApplicationID} />

From the Admin Console:

1. From the navigation bar, click **Applications**, then select the application created on the step above.
2. Copy the `Application ID` from the response and set an environment variable:

```mac tab
export APPLICATION_ID=<application-id>
```
```win tab
set APPLICATION_ID=<application-id>
```

3. Copy the `Client ID` from the response and set an environment variable:

```mac tab
export APP_CLIENT_ID=<app-client-id>
```
```win tab
set APP_CLIENT_ID=<app-client-id>
```

4. Copy the `Client Secret` from the response and set an environment variable:

```mac tab
export APP_CLIENT_SECRET=<app-client-secret>
```
```win tab
set APP_CLIENT_SECRET=<app-client-secret>
```

<Arcade clip={Clip.CopyAuthenticatorConfigID} />

Next, copy the Authenticator Config ID into the config file:

5. Click on the Authenticator Config tab, copy the Authenticator Configuration ID, and set an environment variable for it:

```mac tab
export AUTH_CONFIG_ID=<authenticator-config-id>
```
```win tab
set AUTH_CONFIG_ID=<authenticator-config-id>
```

Learn more about [Authenticator Configurations](/docs/v1/platform-overview/authenticator-config).

---

## 9. Running the example application

The example application uses the Beyond Identity Embedded [JavaScript SDK](./workflows/sdk-setup?sdks=javascript).

### Start the backend and frontend

Install dependencies

```
yarn install
```

and run with:

```
yarn start
```

Open a web browser and navigate to [http://localhost:3002](http://localhost:3002). The example application will now appear and allow you to create Passkeys in the browser.

<Arcade clip={Clip.GettingStartedDemoApp} />

You can also see this example in action by visiting: [https://acme.beyondidentity.com/](https://acme.beyondidentity.com/)

---

## What's next?

You can use the example application above to create one or more passkeys and log in with them.

Check out workflow guides for more detailed information starting with [Account Setup](./workflows/account-setup.md).

:::info

### Questions? Need a hand to get started?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.
:::
