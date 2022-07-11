---
title: Architecture
sidebar_position: 1
---

Beyond Identity relies on two main groups of components: The Beyond Identity Cloud, and Beyond Identity Authenticators. The Beyond Identity Cloud hosts user directories, authentication servers, event logs, and policy rules. Beyond Identity Authenticators are endpoint components built with our SDKs that should be embedded in your application. 

Authenticators work with the Cloud components to establish identity (authentication) of your users and authorization of the action (login to a resource, or add a device) that they are attempting to perform according to the policy that you have configured.  

## Tenant
A Beyond Identity tenant represents an organization in the Beyond Identity Cloud. It serves as the root container for all other cloud components in your configuration.  Your tenant has a unique identifier, a modifiable name and act contains one or more Realms that make up the organization.  The first Realm in your tenant is the “Beyond Identity Admin” Realm that serves as the home for your “Beyond Identity Admin Console” Application and “Beyond Identity Management API” Application configurations.

## Realms
A tenant can have many realms. A realm is a unique administrative domain within a tenant. Some tenants will only need the use of a single realm, in this case a realm and a tenant may seem synonymous. Common use cases for realms include:
 - A need for multiple development environments - staging, QA, production - an admin could create a realm for each,
 - The desire to provide separated services based on different administrative domains (holding company delegating realms to its various companies, company delegating realms to its various brands, etc), and
 - The desire to separate Beyond Identity Console and Management API identities, credentials and policies from those for an end-user application.

Each Realm contains a unique set of Directory, Policy, Event, Application, and Branding objects.

### Admin Realm
When your tenant is deployed an initial Realm is specially created and populated for you - the “Beyond Identity Admin” Realm.  It is populated with your initial Admin identity and credential, Console authorization Policy, Console application configuration and Management API configuration.

It is possible that you never need to create another Realm for your use case.

## Console
The Beyond Identity Console creates a UI experience for you to administer your tenant.  The Console utilizes your Beyond Identity tenant (specifically the “Beyond Identity Admin” Realm and Console application configuration) to authenticate and authorize admin logins.  An initial Policy is instantiated in the Beyond Identity Admin Realm on deployment of your tenant.  

The “Admin Console Access” User Group is created and the identity established at sign up is added to that group.

Addition of user’s into the group will allow them to log into the Console as Administrators of your tenant utilizing any credentials established within the Admin Realm.

*Beware!*  This policy and group control access to the Console.  It is possible to lock yourself out of the Console.

The Console Application Configuration, “Beyond Identity Admin -> Applications -> Beyond Identity Admin Console”, is instantiated at tenant deployment and as a managed object it is not editable via the Console.

## Beyond Identity Management API
The “Beyond Identity Management API” Application resides within the “Beyond Identity Admin” Realm.  Admins can utilize the Application to create API Tokens that authorize access to the Beyond Identity APIs.

## Directory
A Directory contains the Identities, associated Credentials and User Groups within a Realm.  Directories are not shared across Realms.

### Identities
An identity is a unique identifier that may be used by an end-user to gain access governed by Beyond Identity. An end-user may have multiple identities. A realm can have many identities.

### Credentials
An identity can have many credentials of different types. 

#### Credential Type: Passkey
A passkey is a public-private key pair that belongs to an identity. The public key is stored in Beyond Identity Cloud. The private key never leaves the device. All cryptographic operations that use the private key are handled by the Beyond Identity SDKs. An identity can have multiple passkeys. An identity with 3 devices would have 3 passkeys, one for each device. 

#### Credential Type: GPG Key (Coming Soon)
A GPG key is cryptographically tied to an identitiy's passkey. Beyond Identity's SDKs act as a gpg signing agent using the private key on the device. 

#### Credential Type: SSH Key (Coming Soon)
A SSH key is cryptographically tied to an identitiy's passkey. This key can be used for accessing SSH servers. 

### Groups
A group is a logical collection of identities. A realm can have many groups. An identity can belong to many groups. Groups are commonly used as a predicate in a policy rule. (e.g. Allow group "Beyond Identity Administrators" to access the "Beyond Identity Admin Console" application)

## Policy
A Realm Policy is a collection of rules that determine how to treat any given transaction managed by the Beyond Identity Cloud. Policy rules can be thought of as match action pairs. Where the match could be a complex predicate describing which transactions it governs and the action states how to handle the matching transactions.

Each registration (credential binding) and authentication operation consults the Realm’s Policy for an Allow or Deny decision before completion.  A Deny decision results in rejection of the operation.

See the pre-instantiated Admin Console access rule for an example of a Policy Rule.

## Events
Events are an immutable record of all transactions that occur in a Realm. Events can be exported to a number of SIEM products or viewed within your Console.

## Applications and Authenticator Configs
An Application in the Beyond Identity Cloud represents an application (e.g. AcmeCorp Android App, Todo-List iOS App, etc) that has embedded a Beyond Identity SDK. A Realm can have many applications.

You will create Applications within a Realm to configure your OAuth or OIDC flows.  The applications created within a Realm utilize its Directory, and Policy to complete those flows.  

Authenticator Configurations specify how an embedded authenticator (SDK) should be launched within your application.

The Hosted Web Authenticator (coming soon) is a special option that does not work with your embedded SDK application.

## Beyond Identity Authenticators
Beyond Identity provides two authenticator types: Embedded SDK, and Hosted Web Authenticator. 

### Embedded SDKs
The embedded SDKs are primarily responsible for handling all cryptographic operations that occur on the end users device such as creating passkeys, and logging in with a passkey. Currently Beyond Identity provides SDKs for the following platforms:
 - Web (Javascript)
 - iOS (Swift)
 - Android (Kotlin)

### Hosted Web Authenticator (Early Access)
The hosted web authenticator is a Beyond Identity hosted page that embeds the javascript SDK. Think of this as a wallet, hosted by Beyond Identity Cloud, that can be used to hold an identity's passkeys. The hosted web authenticator is hosted at https://auth-us.beyondidentity.com/authenticator
