---
title: SCIM server setup
id: scim-server
description: ''
slug: /scim-server
keywords: 
 - scim server
pagination_next: null
pagination_prev: null
last_update: 
   date: 06/01/2023
   author: Patricia McPhee
draft: false
doc_type: how-to
displayed_sidebar: mainSidebar
---




To use SCIM functionality, an access token with `scim:all` scope is required on the SCIM server, which is available by default when creating a new realm. It is recommended to use a dedicated application for SCIM operations to differentiate between API and SCIM operations in the logs.


import ScimDescription from './includes/_scim-description.mdx';

<ScimDescription />

## Discovery
You can use the following endpoints to discover the implementation details of BI's SCIM server.

| Endpoint                                 | SCIM spec                                     |
|:-----------------------------------------|:----------------------------------------------|
| `{{baseUrl}}/scim/ServiceProviderConfig` | https://tools.ietf.org/html/rfc7643#section-5 |
| `{{baseUrl}}/scim/ResourceTypes`         | https://tools.ietf.org/html/rfc7643#section-6 |
| `{{baseUrl}}/scim/Schemas`               | https://tools.ietf.org/html/rfc7643#section-7 |

<br />

Where **base_url** is `https://api-{{us|eu}}.beyondidentity.com/v1/tenants/{{tenant_id}}/realms/{{realm_id}}/scim/v2`.  Note that the URL's subdomain will change according to your region, either _us_ or _eu_.

## Operations
The following operations are currently supported by BI SCIM server:

- Create: POST {{baseUrl}}/{{resource}}
- Read: GET {{baseUrl}}/{{resource}}/{{id}}
- Replace: PUT {{baseUrl}}/{{resource}}/{{id}}
- Delete: DELETE {{baseUrl}}/{{resource}}/{{id}}
- Search: GET {{baseUrl}}/{{resource}}?ﬁlter={{attribute}}{{op}}{{value}}

Where **base_url** is `https://api-us.beyondidentity.com/v1/tenants/{{tenant_id}}/realms/{{realm_id}}/scim/v2`, **resource** can either be `Groups` or `Users`, and 
**id** represents the BI's unique identifier of the corresponding resource.  

### Users

We support the following **Users**`(urn:ietf:params:scim:schemas:core:2.0:User)`attributes:

| User Attribute | Attribute Type | Data Type | Required? | Mutability | Description                                                                                                                       |
|:---------------|:---------------|:----------|:----------|:-----------|:----------------------------------------------------------------------------------------------------------------------------------|
| id             | SVA            | string    | N         | N          | ID is unique attribute that identifies the user within a realm.                                                                   |
| userName       | SVA            | string    | Y         | Y          | The username of the user. The value of this field will be returned as the subject of a OIDC ID Token.                             |
| displayName    | SVA            | string    | Y         | Y          | The name of the User, suitable for display to end-users.  The name SHOULD be the full name of the User being described, if known. |
| emails         | CMVA           | n/a       | N         | Y          | Email for the User. Only one email is allowed. Primary must be set to true.                                                       |
| email.value    | SVA            | string    | Y         | Y          | Address of the user email.                                                                                                        |
| email.primary  | SVA            | bool      | Y         | N          | Indicates if this email is primary email of the user.  Always set to `true`                                             |

<br />

SVA = single value attribute   
CMVA = complex multi value attribute

If unsupported attributes are specified in the request, they will be ignored.

#### **Create user example**

:::caution Note:
- If email is provided, `primary` must be set to `true` and `value` must be a valid email address
:::

```markdown title="Sample request"
    POST /scim/v2/Users HTTP/1.1
    Authorization: <Authorization credentials>
    Content-Type: application/json

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "userName": "test.user@bi.com",
        "emails": [{
            "primary": true,
            "value": "test.user@bi.com",
        }],
        "displayName": "Test User"
    }
```

```markdown title="Sample response"
    HTTP/1.1 201 Created
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "2243c09e9825"
        "userName": "test.user@bi.com",
        "emails": [{
            "primary": true,
            "value": "test.user@bi.com",
        }],
        "displayName": "Test User"
        "meta": {
            "resourceType": "User"
        }
    }
```

#### **Read user example**

```markdown title="Sample request"
    GET /scim/v2/Users/2243c09e9825 HTTP/1.1
    Authorization: <Authorization credentials>
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "2243c09e9825"
        "userName": "test.user@bi.com",
        "emails": [{
            "primary": true,
            "value": "test.user@bi.com",
        }],
        "displayName": "Test User"
        "meta": {
            "resourceType": "User"
        }
    }
```
#### **Replace(full update) user example**

```markdown title="Sample request"
    PUT /scim/v2/Users/2243c09e9825 HTTP/1.1
    Authorization: <Authorization credentials>
    Content-Type: application/json

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "userName": "test.user@bi.com",
        "emails": [{
            "primary": true,
            "value": "test.user@bi.com",
        }],
        "displayName": "NEW Test User"
    }
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "2243c09e9825"
        "userName": "test.user@bi.com",
        "emails": [{
            "primary": true,
            "value": "test.user@bi.com",
        }],
        "displayName": "NEW Test User"
        "meta": {
            "resourceType": "User"
        }
    }
```
#### **Delete user example**

```markdown title="Sample request"
    DELETE /scim/v2/Users/2243c09e9825 HTTP/1.1
    Authorization: <Authorization credentials>
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
```
#### **Search users example**
:::tip Limitations:
- Can only filter by `username`
- Ony `eq` and `ne` filter operators are supported
- Can retrieve a maximum of 1000 users at a time
- `sortBy` and `orderBy` are not yet supported
:::
For more information on filtering please see [SCIM Filtering](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2).

```markdown title="Sample request"
    GET /scim/v2/Users?ﬁlter=username eq "test.user@bi.com"&startIndex=1&count=100 HTTP/1.1
    Authorization: <Authorization credentials>
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    [{
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "2243c09e9825"
        "userName": "test.user@bi.com",
        "emails": [{
            "primary": true,
            "value": "test.user@bi.com",
        }],
        "displayName": "Test User"
        "meta": {
            "resourceType": "User"
        }
    }]
```

### Groups

We support the following **Groups**`(urn:ietf:params:scim:schemas:core:2.0:Group)`attributes:

| Group Attribute | Attribute Type | Data Type | Required? | Mutability | Description                                                     |
|:----------------|:---------------|:----------|:----------|:-----------|:----------------------------------------------------------------|
| id              | SVA            | string    | N         | N          | ID is unique attribute that identifies the user within a realm. |
| displayName     | SVA            | string    | N         | Y          | A human-readable name for the Group.                            |
| members         | CMVA           | n/a       | N         | N          | A list of members of the group.                                 |
| member.value    | SVA            | string    | N         | N          | Identifier of the member of this Group.                         |

SVA = single value attribute
CMVA = complex multi value attribute

:::caution note: 
- members attribute is never returned
:::

#### **Create group example**

```markdown title="Sample request"
    POST /scim/v2/Groups HTTP/1.1
    Authorization: <Authorization credentials>
    Content-Type: application/json

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "displayName": "Test SCIMv2",
        "members": [
            {
                "value": "2243c09e9825"
            },
            {
                "value": "9674c09e6784"
            }
        ]
    }
```
```markdown title="Sample response"
    HTTP/1.1 201 Created
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "id": "43b03340cb6a",
        "displayName": "Test SCIMv2",
        "meta": {
            "resourceType": "Group"
        }
    }
```

#### **Read group example**

```markdown title="Sample request"
    GET /scim/v2/Groups/43b03340cb6a HTTP/1.1
    Authorization: <Authorization credentials>
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Tue, 10 Sep 2019 05:06:25 GMT
    Content-Type: text/json;charset=UTF-8
    
    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "id": "43b03340cb6a",
        "displayName": "Test SCIMv2",
        "meta": {
            "resourceType": "Group"
        }
    }
```
#### **Replace(full update) group example**

```markdown title="Sample request"
    PUT /scim/v2/Groups/43b03340cb6a HTTP/1.1
    Authorization: <Authorization credentials>
    Content-Type: application/json

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "displayName": "New Test SCIMv2",
        "members": [
            {
                "value": "2243c09e9825"
            }
        ]
    }
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "id": "43b03340cb6a",
        "displayName": "New Test SCIMv2",
        "meta": {
            "resourceType": "Group"
        }
    }
```
#### **Delete group example**

```markdown title="Sample request"
    DELETE /scim/v2/Groups/43b03340cb6a HTTP/1.1
    Authorization: <Authorization credentials>
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
```
#### **Search groups example**
:::tip Limitations:
- Can only filter by `displayname`
- Ony `eq` and `ne` filter operators are supported
- Can retrieve a maximum of 1000 groups at a time
- `sortBy` and `orderBy` are not yet supported
:::

For more information on filtering please see [SCIM Filtering](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2).

```markdown title="Sample request"
    GET /scim/v2/Groups?ﬁlter=displayname eq "Test SCIMv2"&startIndex=1&count=100 HTTP/1.1
    Authorization: <Authorization credentials>
```
```markdown title="Sample response"
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
    Content-Type: text/json;charset=UTF-8

    [{
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "id": "43b03340cb6a",
        "displayName": "New Test SCIMv2",
        "meta": {
            "resourceType": "Group"
        }
    }]
```

## Additional references
- [What is SCIM](https://ldapwiki.com/wiki/SCIM)?
- [SCIM 2.0 RFC: Core Schema](https://tools.ietf.org/html/rfc7643)
- [SCIM 2.0 RFC: Protocol](https://tools.ietf.org/html/rfc7644)
- [SCIM 2.0 RFC: Definitions and Use Cases](https://tools.ietf.org/html/rfc7642)

