---
title: Applications
last_update: 
   date: 03/03/2023
---

import AppSchemeCaution from '../includes/_app-scheme-caution.mdx';
import InvocationTip from '../includes/_invocation-type-tip.mdx';
import MultiLanguageCodeBlock from "@site/src/components/MultiLanguageCodeBlock";
import Arcade, {Clip} from '@site/src/components/Arcade.tsx';


## Prerequisites

- Set up a [developer account](./account-setup)
- Read about [realms](./realms)

## Application Overview

An application is an abstraction in the admin console that enables you to configure passkey binding and authentication in your mobile/web apps. An application contains client configuration, token configuration, and an [Authenticator Config](../platform-overview/authenticator-config.md). There are two ways to create an admin console application for your apps:

- **One application per platform**: In this scenario, there is one admin console application created per app on each platform your app supports (iOS, Android, Web, etc). This is easier to configure upfront and provides flexibility in regards to platform specific configurability. However, it is more difficult to configure the generation of passkey binding links across platforms.

- **One application for all platforms**: In this scenario, there is one admin console application created for your app across all platforms you support. This is more difficult to configure upfront as it required building a web routing layer to redirect passkey binding links appropriately, however it makes it easier to accomplish a more seamless experience when generating passkey binding links across platforms.

A [realm](./realms.md) contains multiple applications, and an application utilizes the realm's directory, policy, events, and branding objects. To see how an application fits in the wider Beyond Identity architecture, check out [Architecture](../platform-overview/architecture.md).

## Create Application from Admin Console

An application can be created from the Beyond Identity Admin Console. Navigate to your application's realm and from the navigation bar, click **Apps**, then click **Add app**. Configure both the **External Protocol** tab as well as the **Authenticator Config** tab.

### External Protocol

From the External Protocol tab, configure your application's OAuth 2.0 and OIDC values such as the Client Type, PKCE, Token Endpoint Auth Method, token minting configurations, and a redirect URI back to your application. After saving, the values entered will be used to generate OpenID Connect well-known configuration endpoints for your application as well as your Client ID and Client Secret.

:::tip Which Client Type should I use?
`Confidential` clients are applications that are able to securely authenticate with the authorization server, for example being able to keep their registered client secret safe. Think of an application with a backend.

`Public` clients are unable to use registered client secrets, such as applications running in a browser or on a mobile device. You will not receive an application "Client Secret" if you create this type of application.
:::

### Authenticator Config

From the Authenticator Config tab, select a `Configuration Type`. This setting determines if your application is using an [Embedded SDKs](./authenticator-types.md#embedded-sdk-authenticator) or the hosted Web Authenticator to generate and manage passkeys.

For more information on the Authenticator Config, visit the [Authenticator Config](../platform-overview/authenticator-config.md) guide.

:::tip Which Configuration Type should I use?
`Embedded SDK`, select this if your application is using either a native SDK (iOS, Android, Flutter, React Native) or web SDK (JS). When this option is selected you can configure your application's Invocation Type, Invoke URL, and Trusted Origins.

`Hosted Web`, select this to default all bound credentials and authentications to our [Hosted Web Authenticator](./authenticator-types.md#hosted-web-authenticator). This is a constrained version of the Embedded Authenticator Config with the following values:

- **Invocation Type:** `automatic`
- **Invoke URL:** `https://auth-<REGION>.beyondidentity.com/authenticator/`
- **Trusted Origins:** `[https://auth-<REGION>.beyondidentity.com/authenticator/]`

:::

#### **Embedded SDK**

If you selected the Embedded SDK Configuration Type, you will need to configure a few more items:

1. Set an `Invocation Type` to specify how an authentication URL is delivered to your application.

<InvocationTip />

2. Set an `Invoke URL` that "points" to where your application is. In the case of a native application (iOS, Android, Flutter, React Native), this is either an App Scheme or an Universal URL / App Link. In the case of a web application, this is just a URL to your web application or a specific page of your web application.

<AppSchemeCaution/>

3. Set `Trusted Origins` with your website's URL to add it to a whitelist. By default, cross origin requests are blocked by our server.

<Arcade clip={Clip.CreateApplication} />

## Create Application by API

An application can also be created from the [Beyond Identity API](https://developer.beyondidentity.com/api/v1). Before making any API calls you'll want to generate an API access token. Check out [API Tokens](./api-token) for help creating an access token.

### Create a Resource Server

Before creating an application by API, you may want to create a resource server. A resource server is a namespace for application scopes. Application scopes is a set of all scopes supported by the application. When an application is created without a resource server, this application may provide authentication (identity) but not authorization (access). If your application doesn't provide multiple levels of access -- like admin access vs user access, then there might not be a need for a resource server.

If you are creating another application to mint tokens, you will want to set the resource server to the "Beyond Identity Management API" resource server.

If you create a resource server, make note of the response `id`, as you'll need the resource server ID when creating an application.

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/resource-servers" \
-X POST \
-H "Authorization: Bearer $(TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"resource_server\":{\"display_name\":\"$(APPLICATION_DISPLAY_NAME)\",\"identifier\":\"$(APPLICATION_URI)\",\"scopes\":[\"$(SCOPE)\"]}}"'
title="/resource-servers"
/>

### Create an Authenticator Config

Before creating an application by API, you'll need to create an Authenticator Config by setting the application's Configuration Type, Invocation Type, Invoke URL and Trusted Origins. See configuring the [Authenticator Config](#authenticator-config) from the admin console for help setting the appropriate options.

Make note of the response `id`, as you'll need the Authenticator Config ID when creating an application.

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/authenticator-configs" \
-X POST \
-H "Authorization: Bearer $(TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"authenticator_config\":{\"config\":{\"type\":\"$(CONFIGURATION_TYPE)\",\"invoke_url\":\"$(INVOKE_URL)\",\"trusted_origins\":[\"$(TRUSTED_ORIGIN)\"],\"invocation_type\":\"$(INVOCATION_TYPE)\"}}}"'
title="/authenticator-configs"
/>

### Create an Application

Once you have created an [Authenticator Config](#create-an-authenticator-config) and a [Resouce Server](#create-an-application-resource-server), you can create an application.

While the Resouce Server ID is optional, make sure to have the Authenticator Config ID for the applications with `grant_type` set to **authorization_code**. If you only wish to create an application with the client credentials OAuth flow, then the Authenticator Config ID is not required either. This is how the Beyond Identity Management API appliction is configured in your Beyond Identity Admin realm, however for most applications you will want to use the authorization code flow. The below example makes this assumption.

Set the application's Display Name, Client Type, Token Configuration, and redirect URI in the below request.

There are two options available for `confidentiality`:

- If you choose **confidential**, set the `token_endpoint_auth_method` to either **client_secret_post** or **client_secret_basic**.
- If you choose **public**, then set the `token_endpoint_auth_method` value to **none**.

If the application references a resource server, the `allowed_scopes` must be a subset of the resource server's available scopes. If the application does not reference a resource server, then this application can only be used for authentication and thereby scopes must necessarily be empty.

See configuring [External Protocol](#external-protocol) from the admin console for help setting appropriate options.

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications" \
-X POST \
-H "Authorization: Bearer $(TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"application\":{\"display_name\":\"$(DISPLAY_NAME)\",\"resource_server_id\":\"$(RESOURCE_SERVER_ID)\",\"authenticator_config_id\":\"$(AUTHENTICATOR_CONFIG_ID)\",\"protocol_config\":{\"type\":\"oidc\",\"allowed_scopes\": [\"$(SCOPE)\"],\"confidentiality\": \"$(CLIENT_TYPE)\",\"token_endpoint_auth_method\":\"$(TOKEN_ENDPOINT_AUTH_METHOD)\",\"grant_type\": [\"authorization_code\"],\"redirect_uris\": [\"$(REDIRECT_URI)\"],\"token_configuration\":{\"subject_field\":\"$(TOKEN_SUBJECT_FIELD)\",\"expires_after\":86400,\"token_signing_algorithm\":\"RS256\"},\"pkce\":\"s256\", \"token_format\": \"self_contained\"}}}"'
title="/applications"
/>
