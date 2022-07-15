---
title: Getting Started
sidebar_position: 2
---

In this guide we will show you how to create a tenant and connect the [Beyond Identity Demo Application](https://github.com/gobeyondidentity/getting-started) to it. This app will demonstrate common workflows such as creating a passkey and using it to authenticate.

--- 

# 1. Check the basics

The Beyond Identity Example Application is made up of a [node.js](https://nodejs.org) backend and a [angularjs](https://angular.io/) frontend. You'll need standard developer tools to get it up and running.

#### **macOS, Windows and Linux**

1. **Git:** Download and install `git`: https://git-scm.com/downloads

2. **NodeJS**: Download and install `nodejs`: https://nodejs.org/en/download/

3. **Yarn:** Install `yarn`: https://classic.yarnpkg.com/lang/en/docs/install/

#### **macOS only**

4. **Homebrew:** Download and install `brew`: https://brew.sh/

5. **Jq and cURL:** Install `jq` and `curl`. 
    ``` bash
    brew install jq curl
    ```

--- 

# 2. Create a Tenant

Navigate here to [Create a Tenant](https://www.beyondidentity.com/developers/signup).

Once your tenant has been created with Beyond Identity, you can continue to clone the app, get a `tenant_id` and API token.

---

# 3. Configure the example application

You can review the [pre-requisites](#pre-requisites) if you need help configuring your environment. 

### Cloning the repo

The source code for the example application is hosted in Github: https://github.com/gobeyondidentity/getting-started.

```bash
git clone https://github.com/gobeyondidentity/getting-started.git
```

Change directory into the repo: 

```bash
cd getting-started
```

--- 

# 4. Get your Tenant ID
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
--- 
## 5. Create an API token

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




