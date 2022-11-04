# SCIM Support in V1

The **System for Cross-domain Identity Management (SCIM)** specifications provide an HTTP-based protocol ([RFC7643](https://www.rfc-editor.org/rfc/rfc7643.html)) and schema ([RFC7644](https://www.rfc-editor.org/rfc/rfc7644.html)) that makes managing identities in multi-domain scenarios easier. Since its publication in 2015, SCIM has seen growing adoption.
In short, SCIM makes user data more secure and simplifies the user experience by automating the user identity lifecycle management process.  With SCIM, user identities can be created in external systems, such as OKTA or Active directory.  Since it is a standard, directory data, that is users and groups they belong to, can be stored consistently and communicated via SCIM to different applications.  This allows companies to automate the provisioning process while also maintaining a single “source of truth”.

SCIM is a REST and JSON-based protocol that defines a client and server role. A client is usually an identity provider (IDP), like Okta, that contains a robust directory of user identities. A service provider (SP) like Beyond Identity, that needs a subset of information from those identities. When changes to identities are made in the IdP, including create, update, and delete, they are automatically synced to the SP according to the SCIM protocol. The IdP can also read identities from the SP to add to its directory and to detect incorrect values in the SP that could create security vulnerabilities. For end users, this means that they have seamless access to applications for which they’re assigned, with up-to-date profiles and permissions.

Beyond Identity’s (BI) SCIM server implementation follows the tenant/realm paradigm (todo: add link to tenant realm definition).  That is, an separate SCIM server is available for each realm. These SCIM servers can be accessed via the following URL: https://api.beyondidentity.com/v1/tenants/<tenant_id>/realms/<realm_id>/scim/v2/<scim_resource>

The SCIM user resource is equivalent to BI identity object.  When the SCIM client creates a user, our SCIM service will create an identity.  The SCIM group resource maps to BI’s group.  The BI SCIM configuration can be inspected via standard SCIM discovery endpoints.  

##Setup
The SCIM server is available by default whenever the customer creates a new realm.  However, in order to use any SCIM functionality an access token with `scim:all` scope is required.  For more information on setting up application and obtaining access tokens with specified scope, please see [todo: link]()
We recommend using a dedicated application for SCIM operations.  This way, the customer can differentiate between API and SCIM operations when going through the logs.

##Operations
The following operations are currently supported by BI SCIM servers:

- Create: POST https://{base_url}/{resource}
- Read: GET https://{base_url}/{resource}/{id}
- Replace: PUT https://{base_url}/{resource}/{id}
- Delete: DELETE https://{base_url}/{resource}/{id}
- Search: GET https://{base_url}/{resource}?ﬁlter={attribute}{op}{value}&sortBy={attributeName}&sortOrder={ascending|descending}

Where **{base_url}** is a fully qualified URL: https://api.beyondidentity.com/v1/tenants/<tenant_id>/realms/<realm_id>/scim/v2/<scim_resource>. **resource** can either be `Groups`, `Users`. 
**id** represents the BI's id of the corresponding resource.

###Users

We support the following **Users**`(urn:ietf:params:scim:schemas:core:2.0:User)`attributes:

| User Attribute | Attribute Type| Data Type|Required?|Mutability|Description
| :---:          | :---:         | :---:    | :---:   | :---:    | :---:     
| id             | SVA           | string   |N        |N         | ID is unique attribute that identifies the user within a realm.
| userName       | SVA           | string   |Y        |Y         | The username of the user. The value of this field will be returned as the subject of a OIDC ID Token.
| displayName    | SVA           | string   |Y        |Y         | The name of the User, suitable for display to end-users.  The name SHOULD be the full name of the User being described, if known.
| emails         | CMVA          | n/a      |N        |Y         | Email for the User. Only one email is allowed. Primary must be set to true.
| email.value    | SVA           | string   |Y        |Y         | Address of the user email.
| email.primary  | SVA           | bool     |Y        |N         | Indicates if this email is primary email of the user.  Currently always set to `true`

SVA = single value attribute
CMVA = complex multi value attribute

If unsupported attributes are specified in the request, they will be ignored.

**Create user example**
* Notes:
    - If email is provided, `primary` must be set to `true` and `value` must be a valid email address

Sample request
```
    POST /scim/v2/Users HTTP/1.1
    Authorization: <Authorization credentials>

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
Sample response
```
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

**Read user example**

Sample request
```
    GET /scim/v2/Users/2243c09e9825 HTTP/1.1
    Authorization: <Authorization credentials>
```
Sample response
```
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
**Replace(full update) user example**

Sample request
```
    PUT /scim/v2/Users/2243c09e9825 HTTP/1.1
    Authorization: <Authorization credentials>

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
Sample response
```
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
**Delete user example**

Sample request
```
    DELETE /scim/v2/Users/2243c09e9825 HTTP/1.1
    Authorization: <Authorization credentials>
```
Sample response
```
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
```
**Search users example**
* Limitations:
    - Can only filter by `username`
    - Ony `eq` and `ne` filter operators are supported
    - Can retrieve a maximum of 1000 users at a time
    - `sortBy` and `orderBy` are not yet supported

Sample request
```
    GET /scim/v2/Users?ﬁlter=username eq "test.user@bi.com"&startIndex=1&count=100 HTTP/1.1
    Authorization: <Authorization credentials>
```
Sample response
```
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

###Groups

We support the following **Groups**`(urn:ietf:params:scim:schemas:core:2.0:Group)`attributes:

| Group Attribute | Attribute Type| Data Type|Required?|Mutability|Description
| :---:          | :---:         | :---:    | :---:   | :---:    | :---:     
| id             | SVA           | string   |N        |N         | ID is unique attribute that identifies the user within a realm.
| displayName    | SVA           | string   |N        |Y         | A human-readable name for the Group.
| members        | CMVA          | n/a      |N        |N         | A list of members of the group.
| member.value   | SVA           | string   |N        |N         | Identifier of the member of this Group.

* Notes:
  - members attribute is never returned
  
**Create group example**

Sample request
```
    POST /scim/v2/Groups HTTP/1.1
    Authorization: <Authorization credentials>

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
Sample response
```
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

**Read group example**

Sample request
```
    GET /scim/v2/Groups/43b03340cb6a HTTP/1.1
    Authorization: <Authorization credentials>
```
Sample response
```
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
**Replace(full update) group example**

Sample request
```
    PUT /scim/v2/Groups/43b03340cb6a HTTP/1.1
    Authorization: <Authorization credentials>

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
Sample response
```
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
**Delete group example**

Sample request
```
    DELETE /scim/v2/Groups/43b03340cb6a HTTP/1.1
    Authorization: <Authorization credentials>
```
Sample response
```
    HTTP/1.1 200 OK
    Date: Thu, 3 Nov 2022 05:38:27 GMT
```
**Search groups example**
* Limitations:
  - Can only filter by `displayname`
  - Ony `eq` and `ne` filter operators are supported
  - Can retrieve a maximum of 1000 groups at a time
  - `sortBy` and `orderBy` are not yet supported

Sample request
```
    GET /scim/v2/Groups?ﬁlter=displayname eq "Test SCIMv2"&startIndex=1&count=100 HTTP/1.1
    Authorization: <Authorization credentials>
```
Sample response
```
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
- [What is SCIM](https://www.okta.com/blog/2017/01/what-is-scim/?_ga=2.59801517.1611493996.1667489323-21446930.1628004873)?
- [SCIM 2.0 RFC: Core Schema](https://tools.ietf.org/html/rfc7643)
- [SCIM 2.0 RFC: Protocol](https://tools.ietf.org/html/rfc7644)
- [SCIM 2.0 RFC: Definitions and Use Cases](https://tools.ietf.org/html/rfc7642)