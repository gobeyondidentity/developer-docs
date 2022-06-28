---
title: How to create Passkeys
sidebar_position: 2
---

### Adding a passkey to a user's device

[Bounce diagram with credential binding process]

We create passkeys on devices using a construct called a Credential Binding Job (may want to change name)
This tracks the process of creating a passkey on a device and tracking the status of that. 


#### We offer three passkey creation flows

1. Deliver a passkey creation link via our email provider. You make an api call and we send it. 
2. Developer can Grab the link from our API and deliver it to the user however you want to. 
3. Invisible enrollment: 
	- Smoothest user experience
	- Pass the credential binding link to the SDK and the SDK will automatically apply it. 


#### How is trust in a Passkey proven? 

#### How do credential binding jobs work?

Credential Binding Jobs are created via the REST API. To create a new job you need to provie the ID's for all the entities related to it. 

Parameters include a delivery method (e.g ask for credential binding to be delivered directly on the API response or email). 
Specify a redirect URI which is where the caller will be redirected once the binding is completed. 

We set an expiration on the link. The expiration defaults to 7 days. 

A credential binding job is essentially a state machine. We track different states: 
Link opened, link sent, request delivered, and complete. This state can be seen in the console. 

[Diagram of the state machine maybe]

There's also a REST API to see the state of a credential binding job. Those can be found here [provide link]. 
We don't currently support stopping a credential binding job. Credential binding jobs expire naturally after 7 days. 


## Which mechanisms can be used to bind credentials [Jeff Chapman]: 

JWT and WebAuthn signing requests. 

## You can't create a credential directly on the endpoint. You have to go via the binding jobs. 
We don't support this because we wanted to be able to keep track of whats on every credential for now. 

[Confirm if there's a signature associated with our credential]