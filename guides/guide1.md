---
title: Sending Enrollment Emails
sidebar_position: 1
---

### Create an Authenticator Configuration

Creates an [Authenticator Configuration](/docs/v1/platform-overview/authenticator-config) for a [realm](/docs/v1/platform-overview/architecture#realms). The authenticator configuration `id` will be required for the next step. 

**Request example for a new configuration:**

```bash
curl -X POST \
-H "Authorization: Bearer ${api_token}" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{ 
  "authenticator_config": {
    "config": {
      "type": "hosted_web"
    }
  }
}' "https://api-{$region}.beyondidentity.com/v1/tenants/${tenant_id}/realms/${realm_id}/authenticator-configs"
```

**Response example for a new configuration:**

```json
{
    "id": "4e129fc8-29eb-440a-9c43-5e6bd419e416", // authenticator_config_id
    "realm_id": "1893ca3144993842",
    "tenant_id": "00010f21d92c5114",
    "config": {
        "type": "hosted_web"
    }
}
```

### Create a Credential Binding Job

**Request example to create an credential binding job of type Email:**

```bash
curl -X POST \
-H "Authorization: Bearer ${api_token}" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "job": {
    "delivery_method": "EMAIL",
    "authenticator_config_id": "${authenticator_config_id}"
  }
}' "https://api-{$region}.beyondidentity.com/v1/tenants/${tenant_id}/realms/${realm_id}/identities/${identity_id}/credential-binding-jobs"
```

**Response example for a successful email sent:**

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
