---
title: Realms
sidebar_position: 3
---

import MultiLanguageCodeBlock from "../../src/components/MultiLanguageCodeBlock";

# Realm Overview

A realm is a namespace in your tenant that isolates identities and applications from other realms. Each realm contains a unique set of directory, policy, event, application, and branding objects. On [account setup](./account-setup.md), a tenant and realm were created for you. This realm is populated with your admin identity, a console application and an API management application. While some tenants may only need the use of a single realm, there are common use cases for multiple realms:

- A need for multiple development environments - staging, QA, production
- The desire to provide separated services based on different administrative domains  
  (holding company delegating realms to its various companies, company delegating realms to its various brands, etc)
- The desire to separate Admin Console and API identities and policies from those for an end-user application

To see how a realm fits in the wider Beyond Identity architecture, check out [Architecture](../platform-overview/architecture.md)

## Create a Realm with the Admin Console

Creating a realm from the Beyond Identity Admin Console is easy. Tap on drop down with your Beyond Identity Admin realm and choose "Create a realm". Enter the realm's name and top on "Create realm". Your realm has been created and you can tap the button to switch to your newly create realm.

<div style={{position: 'relative', paddingBottom: 'calc(73% + 20px)', height: '0'}}>
	<iframe src='https://demo.arcade.software/eyWvI91g13J7qj5vmCfD?embed&forceNoOpeningAnimation=true' frameBorder="0" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
	</iframe>
</div>

## Create a Realm by API

Realms can also be created by API. Before making any API calls you'll want to generate an API access token. Check out [API Tokens](./api-token) for help creating an access token. Once you have an access token, make a request to the `/realms` endpoint below.

<MultiLanguageCodeBlock
curl='curl "https://api-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms" \
-X POST \
-H "Authorization: Bearer $(TOKEN)" \
-H "Content-Type: application/json" \
-d "{\"realms\":{\"display_name\":\"$(REALM_NAME)\"}}"'
title="/realms"
/>

## Next Steps

Once you've created a realm, feel free to add an application. A realm can host multiple applications. Check out the next guide [Applications](./applications.md).
