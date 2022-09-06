---
title: How to create Passkeys
sidebar_position: 2
---

### High Level Flow

The high level flow for creating a passkey is:
 1. A passkey creation link is created using the Beyond Identity APIs
 2. The passkey creation link is delivered to the Beyond Identity SDK that is running on the user's device. Beyond Identity Provides two methods for delivering a passkey creation link to the SDK:
	- A developer can use the Beyond Identity API to generate a passkey creation link. The developer can then deliver that link to the end user however they want (in-line, sms, email, etc). 
	- A developer can use the Beyond Identity API to send a passkey creation email to the end user. 
3. The passkey creation link is passed to the Beyond Identity SDK bindCredential() function. Upon success a private key will be generated, stored in the device's hardware trust module, and the public key will be stored in the Beyond Identity cloud. 

### Method 1 - Create a passkey via in-line delivery
A developer can use the Beyond Identity API to generate a passkey creation link, and deliver the link to the end user however they see fit. This is the suggested method if you want the end user to create a passkey without having to leave your application. 

#### Step 1) Create a passkey creation link for the identity
**Request**
``` bash
curl -X POST https://{api}.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/identities/{identity_id}/credential-binding-jobs
	-H 'Content-Type: application/json' \
	-H 'Authorization: Bearer {your-api-token}' \
	-d '{
			"job": {
				"authenticator_config_id": "67bb0acf12e5c899",
				"delivery_method": "RETURN"
			}
		}'
```
:::note
Replace {api} with correct endpoint for your tenant location e.g. api-us or api-eu
:::
**Response**
``` bash
HTTP/1.1 200 OK
{
	"credential_binding_link": "http://api-us.beyondidentity.com/v1/tenants/c4fc2d753ca22b14/realms/cdf4862dc4d49791/identities/87fabad6956c6d4b/credential-binding-jobs/c4fc2d753ca22b14:invokeAuthenticator?token=1St9IKIIrYdZcRm",
	"credential_binding_job": {
		"id": "c4fc2d753ca22b14",
		"realm_id": "cdf4862dc4d49791",
		"tenant_id": "000183a77dd50fa9",
		"identity_id": "87fabad6956c6d4b",
		"delivery_method": "RETURN",
		"state": "LINK_SENT",
		"authenticator_config_id": "67bb0acf12e5c899",
		"expire_time": "2022-03-21T03:42:52.905Z",
		"create_time": "2022-03-14T03:42:52.905Z",
		"update_time": "2022-03-15T05:55:23.823Z"
	},
}
```

#### Step 2) Deliver the passkey creation link to your application
This can be accomplished in any number of ways. The most common is to have your frontend application retrieve this link from your backend application.

#### Step 3) Pass the passkey creation link to the Beyond Identity SDK
``` javascript
embeddedSdk
    .bindCredential(credential_binding_link)
    .then((passkey) => {
    	this.log(`Successfully created passkey ${passkey}`);
        this.user.passkeyID = passkey.id;
    })
    .catch((reason) => {
    	this.log(`failed to create passkey because ${reason}`);
    });
```

Upon success a private key will have been created in the device's hardware trust module, and public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device. 


### Method 2 - Create a passkey via Beyond Identity Email Provider
A developer can use the Beyond Identity API to send a passkey creation email to the end user. A high level flow for creating a passkey with this method looks like:
1. The developer makes a request to the Beyond Identity API
2. Beyond Identity Cloud sends an e-mail to the target end user. The email contains a passkey creation link in the email.
3. Upon clicking the link the user will be redirected to your application.
4. Your application should be coded to pass the credential binding link to the Beyond Identity SDK

#### Step 1) Create a passkey creation link, specifying delivery_method:EMAIL
Specify the delivery_method to be "EMAIL". This request will send an email to the primary_email_address of the identity. 
**Request**
``` bash
curl -X POST https://{api}.beyondidentity.com/v1/tenants/{tenant_id}/realms/{realm_id}/identities/{identity_id}/credential-binding-jobs
	-H 'Content-Type: application/json' \
	-H 'Authorization: Bearer {your-api-token}' \
	-d '{
			"job": {
				"authenticator_config_id": "67bb0acf12e5c899",
				"delivery_method": "EMAIL"
			}
		}'
```
:::note
Replace {api} with correct endpoint for your tenant location e.g. api-us or api-eu
:::

 

**Response**
``` bash
HTTP/1.1 200 OK
{
	"credential_binding_job": {
    	"id": "c4fc2d753ca22b14",
    	"realm_id": "cdf4862dc4d49791",
    	"tenant_id": "000183a77dd50fa9",
    	"identity_id": "87fabad6956c6d4b",
    	"delivery_method": "EMAIL",
    	"state": "LINK_SENT",
    	"authenticator_config_id": "67bb0acf12e5c899",
    	"expire_time": "2022-03-21T03:42:52.905Z",
    	"create_time": "2022-03-14T03:42:52.905Z",
    	"update_time": "2022-03-15T05:55:23.823Z"
  },
}
```

#### Step 2) User clicks link in email
The end user will receive the email and click the passkey creation link. Clicking the link will redirect the end user to Beyond Identity Cloud. Beyond Identity Cloud will look up the authenticator_config that is associated with that passkey creation link, and redirect the end user to the `authenticator_config.invoke_url`. The `invoke_url` should be a http request handler in your application. 

#### Step 3) Application Handler
The handler in your application should invoke the Beyond Identity Embedded SDK. 
``` javascript
embeddedSdk
    .bindCredential(credential_binding_link)
    .then((passkey) => {
    	this.log(`Successfully created passkey ${passkey}`);
        this.user.passkeyID = passkey.id;
    })
    .catch((reason) => {
    	this.log(`failed to create passkey because ${reason}`);
    });
``` 
Upon success a private key will have been created in the device's hardware trust module, and public key will have been sent to the Beyond Identity Cloud. At this point the user has a passkey enrolled on this device. 
