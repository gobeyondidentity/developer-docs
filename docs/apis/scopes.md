---
title: Scopes
sidebar_position: 2
---

Requests to the APIs must be authorized and contain appropriate scopes for the actions being taken. The scopes required for a given request are intended to be intuitive based on the API being called. They are formatted as `<resource>:<action>`, where `resource` will map exactly to the resource being requested (in the URL), and `action` will be a CRUD action (Create, Read, Update, Delete) that can be performed on that resource.

For example, the following curl request would require the scope `applications:read`:

```bash
curl https://api-us.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID \
  -X GET \
  -H "Authorization": "Bearer: $TOKEN" \
```

## Scope Types

- `<resource>:read`
	- Allows for the retrieval of the resource information via a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/<resource>/$RESOURCE_ID`.
		- For realms, paths omit `/<resource>/$RESOURCE_ID`
		- For tenants, paths omit `/realms/$REALM_ID/<resource>/$RESOURCE_ID`
	- This same scope also gates requests to list more than one of the resource via a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/<resource>`. 
	- Requests to list multiple resources will always be filtered to the tenant and realm for which they are requested.

- `<resource>:create`
	- Allows for the creation of a new resource via a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/<resource>`.
	- Resource creation may involve the auto-population of one or many fields on the resource itself. At a minimum, this will include an identifier (`id`) field. Such fields would not be allowable to be sent on creation but will be returned in the API response. Documentation of which fields are available for which resources is available in our [API documentation](https://developer.beyondidentity.com/api/v1).
	- Note that the resource creation request returns the same response as the read request. Therefore, while it is allowable to provide `<resource>:create` without `<resource>:read`, it is not self-consistent and so is not advisable.

- `<resource>:update`
	- Allows for the updating of an existing resource via a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/<resource>/$RESOURCE_ID`.
	- Resource patching may disallow the updating of certain fields. Documentation of which fields are available for which resources is available in our [API documentation](https://developer.beyondidentity.com/api/v1).
	- Note that the resource update request returns the same response as the read request. Therefore, while it is allowable to provide `<resource>:update` without `<resource>:read`, it is not self-consistent and so is not advisable.

- `<resource>:delete`
	- Allows for the deletion of an existing resource via a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/<resource>/$RESOURCE_ID`.
	- Deletion requests return empty responses.
