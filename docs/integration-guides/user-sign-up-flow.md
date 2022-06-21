---
title: "User Sign-Up Flow"
excerpt: "How to implement a self-service user sign-up flow"
sidebar_position: 1
---

This guide provides details on how to implement a self-service sign-up flow for new passwordless users.

Before you start this guide you should have the following resources:
* A custom sign-up UI which collects an email address
* A backend component for your app
* An OIDC or OAuth2.0 plugin/library for your application tech stack
* A Beyond Identity Tenant with an `API_TOKEN`.

To create a user in your Beyond Identity directory, use the manage users API, by issuing a `HTTP POST` to `https://api.byndid.com/v1/manage/users`. See API definition [here](/reference/createuser)

Beyond identity requires an `API_TOKEN` in order to create a user so this request must be called from your secure backend. We recommend implementing a self service sign-up flow similar to the digram provided below.

![User Sign Up flow](/assets/user-signup-flow.png)

Once the user has been successfully created, an email will be dispatched to the address provided in the user creation request, containing steps for the user to complete their enrolment with Beyond Identity. This email template can be modified by working with your assigned Beyond Identity Solution or Support Engineer. 

Once the user has clicked the link to register their credential, they can then complete authentication. This can be automated after the credential is successfully registered by redirecting the user immediately into the authentication flow (route).

:::note A Note about Internal ID and External ID

The concept of having both an internal and external ID can be a source of confusion. The following example is designed to clarify the difference between the two.

Let's say that you have an existing directory, using something like Postgres to store your users. Your users have an email, login name, password, and a UUID field as the primary key for the table. When you create a user using the above user creation call, the UUID in your existing directory is passed as the `external_id`. Inside the Beyond Identity directory, a similar identifier is created and is dubbed `internal_id`, but that identifier is not useful with regards to matching up a user from the Beyond Identity directory to the existing directory, the `external_id` is used there. However, when making calls to the Beyond Identity API to modify the user, the `internal_id` would be used to refer to the user, as that is Beyond Identity's concept of the "ID" of the user.

:::