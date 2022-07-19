---
title: How to authenticate using Passkeys
sidebar_position: 3
---

Beyond Identity uses industry standard protocol [OIDC](https://openid.net/connect/) to verify the identity of your end users. Your application delegates authentication to Beyond Identity using OIDC and we ask the end user to prove they have posession of a device with a valid passkey and have the ability to unlock that device and passkey. 

Modern devices ship with authentication primitives.
Those are used to unlock the device and also to unlock any keys stored on the devices. 
If a user has the ability to unlock the device, they can prove the device trusts them and thus they can use the digital key to sign a unique challenge which identifies them to Beyond Identity and to your app. 

We take care of all the cryptographic key usage under the hood. 

1. Your app asks us to authenticate the user using standard authentication protocols. 
2. We generate a unique challenge and ask the device to locate a Passkey, request the user to unlock it, and sign the unique challenge with it. 
3. We verify the signature and if a match is found we tell your system which user was authenticated using the same authentication protocol that initiated the flow. 
