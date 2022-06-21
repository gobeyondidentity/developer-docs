---
title: "User Recovery Flow"
excerpt: "How to implement a self-service user recovery flow"
sidebar_position: 2
---

This guide provides details on how to implement a self-service recovery flow for passwordless users. 

Recovery is required when the user has lost access to all of their devices with a registered credential or they have accidentally deleted the credential from their only enrolled device.

Before you start this guide you should have the following resources:
* A recovery UI which collects an email address
* A backend component for your app
* A Beyond Identity Tenant with an `API_TOKEN`.

Beyond Identity recommends that a user is recovered via the same method of enrolment so if the user enrolled via a registration link delivered to their verified email account then the same method should be used for recovery. 

Beyond identity establishes trust by only allowing a recovery flow via the users verified email address which was used during registration. Beyond identity will deliver the recovery link to the user via the registered email to generate a new credential on the device. 

To recover a user which exists in the Beyond Identity directory, use the manage users API, by issuing a HTTP POST to https://api.byndid.com/v1/manage/recover-user. See API definition [here](/api/recoveruser).

Beyond identity requires an `API_TOKEN` in order to recover a user so this request must be called from your secure backend. We recommend implementing a self service recovery flow similar to the digram provided below.

![User Recovery flow](/assets/user-recovery-flow.png)

Once the user has been successfully verified as a valid user, an email will be dispatched to the verified email address, containing steps for the user to complete their recovery with Beyond Identity. This email template can be modified by working with your assigned Beyond Identity Solution or Support Engineer. 

Once the user has clicked the link to recover their credential, they can then complete authentication once again. This can be automated after the credential is successfully recovered by redirecting the user immediately into the authentication flow (route).