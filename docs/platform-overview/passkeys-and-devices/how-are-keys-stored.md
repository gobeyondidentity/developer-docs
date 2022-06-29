---
title: Passkey storage
sidebar_position: 4
---


Keys are stored in Trusted Execution Environment wherever they're available. Examples of TTE's are: 

- Apple T2 chip
- TPMs on Windows and Linux machines
- In ChromeOS keys are stored in encrypted envelops which are protected by keys stored on the Titan chip. 
- In AWS keys can be stored in the Nitro enclaves on instances that support it. They are not persisted. 

If no TEE is available we fall back to OS specific security APIs for safe storage on hard disk. These are typically protected by a master key the OS generates with a knowledge factor as a salt. 

Keys are immovable. 

[Mike can provide a chart]

