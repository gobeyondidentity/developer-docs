---
title: How are Passkeys stored
last_update: 
   date: 07/12/2022
---

Passkeys are stored in [Trusted Execution Environments](https://en.wikipedia.org/wiki/Trusted_execution_environment) wherever they're available. 

Examples of Trusted Execution Environments supported by Beyond Identity are: 

- In Apple Devices, keys are stored in [Apple T2](https://en.wikipedia.org/wiki/Apple_T2) chips.
- In Windows and Linux workstations, keys are stored on [Trusted Platform Modules (TPM)](https://en.wikipedia.org/wiki/TPM2).
- In ChromeOS, keys are stored in encrypted envelops which are protected by keys stored on the [Titan chip](https://cloud.google.com/blog/products/identity-security/titan-in-depth-security-in-plaintext). 
- In AWS, keys can be stored in the [Nitro enclaves](https://aws.amazon.com/ec2/nitro/) on instances that support it. They are not persisted. 

If no TEE is available our SDKs automatically fall back to OS specific security APIs for safe storage on hard disk. These are typically protected by a master key the OS generates with a knowledge factor as a salt. 
