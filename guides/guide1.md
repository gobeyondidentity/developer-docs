---
title: Sending Enrollment Emails
sidebar_position: 2
---

In Beyond Identity, Passkeys are created within the devices default Browser or specific SDK instance associated with an [Application](/api/v1#tag/Applications). An [Authenticator Configuration](/docs/v1/platform-overview/authenticator-config) indicates to the system how the Passkey will be bound. 

### Create an Authenticator Configuration

To start, you'll need to create an [Authenticator Configuration](/docs/v1/platform-overview/authenticator-config) of type `hosted_web` for a given [Realm](/docs/v1/platform-overview/architecture#realms). The authenticator configuration `id` will be required for the next step. 

**Request:**

```mac tab
curl -X POST \
-H "Authorization: Bearer $API_TOKEN" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{ 
  "authenticator_config": {
    "config": {
      "type": "hosted_web"
    }
  }
}' "https://api-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs"
```
```win tab
curl -X POST \
-H "Authorization: Bearer %API_TOKEN%" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{ 
  "authenticator_config": {
    "config": {
      "type": "hosted_web"
    }
  }
}' https://api-%REGION%.beyondidentity.com/v1/tenants/%TENANT_ID%/realms/%REALM_ID%/authenticator-configs
```

**Example response for a new configuration:**

```json
{
    "id": "4e129fc8-29eb-440a-9c43-5e6bd419e416", // <-- copy AUTH_CONFIG_ID from your response
    "realm_id": "1893ca3144993842",
    "tenant_id": "00010f21d92c5114",
    "config": {
        "type": "hosted_web"
    }
}
```

### Create a Credential Binding Job

Next, you'll need to create a [Credential Binding Job](/api/v1#tag/Credential-Binding-Jobs) of type `EMAIL` for a given [identity](http://localhost:3000/api/v1#tag/Identities). The identity must be Active and have a valid email associated with it. 

To complete this step you'll need the `IDENTITY_ID` for which the Passkey is being created. You can find the correct value by logging into the [Admin Console](https://console-us.beyondidentity.com), or use the API to [list all identities](/api/v1/#tag/Identities).

**Request:**

```mac tab
curl -X POST \
-H "Authorization: Bearer $API_TOKEN" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "job": {
    "delivery_method": "EMAIL",
    "authenticator_config_id": "$AUTH_CONFIG_ID"
  }
}' https://api-$REGION.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credential-binding-jobs
```
```win tab
curl -X POST \
-H "Authorization: Bearer %API_TOKEN%" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "job": {
    "delivery_method": "EMAIL",
    "authenticator_config_id": "%AUTH_CONFIG_ID%"
  }
}' "https://api-%REGION%.beyondidentity.com/v1/tenants/%TENANT_ID%/realms/%REALM_ID%/identities/%IDENTITY_ID%/credential-binding-jobs"
```

**Example response:**

```bash
{
  "credential_binding_job": {
    "authenticator_config_id": "4e129fc8-29eb-440a-9c43-5e6bd419e416",
    "create_time": "2022-07-11T21:10:33.383828Z",
    "delivery_method": "EMAIL",
    "expire_time": "2022-07-18T21:10:33.381786Z",
    "id": "57d73b5909ede35a",
    "identity_id": "9ca7716e846cfa97",
    "realm_id": "1893ca3144993842",
    "state": "LINK_SENT",
    "tenant_id": "00010f21d92c5114",
    "update_time": "2022-07-11T21:10:33.383828Z"
  }
}
```

If the above call succeeds, an email will be sent to the email adddress associated with `IDENTITY_ID`. 
