---
title: App Config for Mac and Linux
sidebar_position: 3
---

**(continuation from [Getting Started](/docs/v1/getting-started))**

For instructions on Windows jump to: [Example app for Windows](/docs/v1/example-app-windows)

## 6. Configure your local environment (macOS and Linux)

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

---

## What's next? 

You can use the example application above to create one or more Passkeys and log in with them. 

### Questions? Want to see more?

**[Join our Slack community](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ)**.
