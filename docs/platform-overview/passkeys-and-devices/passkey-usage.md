---
title: How to authenticate using Passkeys
sidebar_position: 3
---

Your system delegates authentication to Beyond Identity using OIDC [link to how to do that with OIDC in our guide] and we ask they user to prove they have posession of a device with a valid passkey and have the ability to unlock that device and passkey. 

Modern devices ship with authentication primitives.
Those are used to unlock the device and also to unlock any keys stored on the devices. 
If a user has the ability to unlock the device, they can prove the device trusts them and thus they can use the digital key to sign a unique challenge which identifies them to Beyond Identity and to your app. 

We take care of all the cryptographic key usage under the hood. 

[We could use a diagram here to help show this process, how OIDC fits into it, what the user does in the process]

This diagram needs to show; 
1. Your app asks us to authenticate the user using standard authentication protocols. 
2. We generate a unique challenge and ask the device to locate a Passkey, request the user to unlock it, and sign the unique challenge with it. 
3. We verify the signature and if a match is found we tell your system which user was authenticated using the same authentication protocol that initiated the flow. 

## Lifecycle of Passkeys

- Doesn't support a true update, it's just a state change. You can't put fields on the credential, you can revoke. 

We currently don't drive revocation. They don't expire either. 
There's an API endpoint to revoke a credential which is essentially stop trusting the public key. 


## 