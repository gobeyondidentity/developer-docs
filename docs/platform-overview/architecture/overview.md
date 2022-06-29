---
title: Overview
sidebar_position: 1
---

Beyond Identity is comprised of two components: The Beyond Identity Cloud, and Beyond Identity SDKs. The Beyond Identity Cloud hosts user directories, authentication servers, event logs, and the policy engine. The SDKs are embedded in your application and are used to ask Beyond Identity Cloud "Is Identity X allowed to do Action Y given Tenant Policy Z" 

## Beyond Identity Cloud Model

[insert Beyond Identity Cloud Model graphic]

### Tenant
A tenant represents an organization in Beyond Identity. A tenant contains all data necessary for that organization to operate.

### Policy
A policy is a collection of rules that determine how to treat any given transaction managed by the Beyond Identity system. Policy rules can be thought of as match action pairs. Where the match could be a complex predicate describing which transactions it governs and the action states how to treat/handle the matching transactions.

### Events
Events are an immutable record of all transactions that occur in the tenant.

### Realms
A tenant can have many realms. A realm is a unique administrative domain within a tenant. A realm is simply a namespace in the tenant used to isolate identities, auth servers, and applications from each other. Most tenants will only need the use of a single realm, in this case a realm and a tenant may seem synonymous. There are two common use cases for realms:
 - Creating a realm for each development environment (devel, staging, production)
 - Larger organizations require an ability to provide separated services based on differing adminstrative domains (holding company delegating realms to its various companies, company delegating realms to its various brands, etc)

### Identities
 An identity is a unique identifier that may be used by an end-user to gain access governed by Beyond Identity. An end-user may have multiple identities. A realm can have many identities.

### Group
A group is a logical collection of identities. A realm can have many groups. An identity can belong to many groups.

### Credentials
These are known as Passkeys... An identity can have many credentials. 

### Applications
 A realm can have many applications. An application represents the configuration needed to 
 1) Connect your backend application to the Beyond Identity OIDC Server
 2) Connect the Beyond Identity SDK to the Beyond Identity Cloud

