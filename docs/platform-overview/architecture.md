---
title: Architecture
sidebar_position: 1
---

Beyond Identity relies on two components: The Beyond Identity Cloud, and Beyond Identity SDKs. The Beyond Identity Cloud hosts the administrative console, user directories, OAuth servers, public keys, event logs, and policy rules. Beyond Identity SDKs, embedded in your application, are primarily responsible for handling all cryptographic operations on the device.

## Beyond Identity Cloud

### Tenant
A tenant represents an organization in the Beyond Identity Cloud. A tenant contains all data necessary for that organization to operate.

### Policy
A policy is a collection of rules that determine how to treat any given transaction managed by the Beyond Identity Cloud. Policy rules can be thought of as match action pairs. Where the match could be a complex predicate describing which transactions it governs and the action states how to handle the matching transactions.

### Events
Events are an immutable record of all transactions that occur in the tenant. These events can be exported to a number of SIEM products. 

### Realms
A tenant can have many realms. A realm is a unique administrative domain within a tenant. Most tenants will only need the use of a single realm, in this case a realm and a tenant may seem synonymous. Some common use cases for realms:
 - I am a developer with multiple development environments - staging, QA, production - So I would create a realm for each
 - Larger organizations require an ability to provide separated services based on differing adminstrative domains (holding company delegating realms to its various companies, company delegating realms to its various brands, etc)

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

### Applications
An application in the Beyond Identity Cloud represents your application (e.g. AcmeCorp Android App, Todo-List iOS App, etc) that has embedded a Beyond Identity SDK. A realm can have many applications.

## Beyond Identity Authenticators
Beyond Identity provides two authenticator types: Embedded SDK, and Hosted Web Authenticator. 
### Embedded SDKs
The embedded SDKs are primarily responsible for handling all cryptographic operations that occur on the end users device such as creating passkeys, and logging in with a passkey. Currently Beyond Identity provides SDKs for the following platforms:
 - Web (Javascript)
 - iOS (Swift)
 - Android (Kotlin)

### Hosted Web Authenticator (Early Access)
The hosted web authenticator is a Beyond Identity hosted page that embeds the javascript SDK. Think of this as a wallet, hosted by Beyond Identity Cloud, that can be used to hold an identity's passkeys. The hosted web authenticator is hosted at https://auth-us.beyondidentity.com/authenticator
