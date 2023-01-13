---
title: SDK Setup
sidebar_position: 0
# Display h2 to h2 headings
toc_min_heading_level: 2
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview

The Embedded SDK is a holistic SDK solution offering the entire experience embedded in your product. Users will not need to download the Beyond Identity Authenticator. A set of functions are provided to you through the `Embedded` namespace. This SDK supports OIDC and OAuth2.

## Sample App

<Tabs groupId="sdks">
<TabItem value="android" label="Android">

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-android/tree/main/app) for the Embedded SDK.
:::

</TabItem>
<TabItem value="ios" label="iOS">

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-swift/tree/main/Example) for the Embedded SDK.
:::

</TabItem>
<TabItem value="javascript" label="JavaScript">

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-js/tree/main/example) for the Embedded SDK.
:::

</TabItem>
<TabItem value="flutter" label="Flutter">

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-flutter/tree/main/example) for the Embedded SDK.
:::

</TabItem>
<TabItem value="reactnative" label="React Native">

:::tip Sample App
Sample apps are available to explore. Check out [Example](https://github.com/gobeyondidentity/bi-sdk-react-native/tree/main/example) for the Embedded SDK.
:::

</TabItem>
</Tabs>

## Installation

<Tabs groupId="sdks">
<TabItem value="android" label="Android">

### Gradle

To enable the retrieval of Cloudsmith hosted packages via Gradle, we need to add the Cloudsmith repository to
the `root/build.gradle` file.

```groovy
repositories {
    maven {
        url "https://packages.beyondidentity.com/public/bi-sdk-android/maven/"
    }
}
```

After the repository is added, we can specify the Beyond Identity dependencies.

```groovy
dependencies {
    implementation 'com.beyondidentity.android.sdk:embedded:[version]'
}
```

</TabItem>
<TabItem value="ios" label="iOS">

### Swift Package Manager

#### From Xcode

1. From the Xcode `File` menu, select `Add Packages` and add the following url:

```
https://github.com/gobeyondidentity/bi-sdk-swift
```

2. Select a version and hit Next.
3. Select a target matching the SDK you wish to use.

#### From Package.swift

1. With [Swift Package Manager](https://swift.org/package-manager),
   add the following `dependency` to your `Package.swift`:

```javascript
dependencies: [
    .package(url: "https://github.com/gobeyondidentity/bi-sdk-swift.git", from: [version])
]
```

2. Run `swift build`

### Cocoapods

Add the pod to your Podfile:

```javascript
pod 'BeyondIdentityEmbedded'
```

And then run:
```javascript
pod install
```

After installing import with
```javascript
import BeyondIdentityEmbedded
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```
yarn add @beyondidentity/bi-sdk-js
```
or
```
npm install @beyondidentity/bi-sdk-js
```

</TabItem>
<TabItem value="flutter" label="Flutter">

### Pub.Dev

Add the Beyond Identity Embedded SDK to your dependencies

```
dependencies:
  bi_sdk_flutter: x.y.z
```

and run an implicit `flutter pub get`.

### Update Android

Please make sure your `android/build.gradle` supports `minSdkVersion` 26 or later.

```
buildscript {
  ext {
    minSdkVersion = 26
  }
}
```

### Update iOS

Please make sure your project supports "minimum deployment target" 13.0 or later.
In your `ios/Podfile` set:

```sh
platform :ios, '13.0'
```

</TabItem>
<TabItem value="reactnative" label="React Native">

```javascript
yarn add @beyondidentity/embedded-react-native
```

or

```javascript
npm i --save @beyondidentity/embedded-react-native
```

:::warning
Note that this library is not compatible with Expo projects. This is because Expo's “managed” workflow does not allow usage of React Native libraries that introduce their own native code beyond the React Native APIs and components that are available in the Expo client app. If you have an Expo app and wish to use this project, you must eject.
:::

</TabItem>
</Tabs>

## Setup

<Tabs groupId="sdks">
<TabItem value="android" label="Android">

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since kt/kotlin is not available and java doesn't highlight at all. -->
```javascript
import com.beyondidentity.embedded.sdk.EmbeddedSdk

EmbeddedSdk.init(
    app: Application,
    keyguardPrompt: (((allow: Boolean, exception: Exception?) -> Unit) -> Unit)?,
    logger: (String) -> Unit,
    biometricAskPrompt: String, /* Optional */
    allowedDomains: List<String>?, /* Optional */
)
```

</TabItem>
<TabItem value="ios" label="iOS">

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since swift doesn't highlight at all. -->
```javascript
import BeyondIdentityEmbedded

Embedded.initialize(
    allowedDomains: [String] = ["beyondidentity.com"],
    biometricAskPrompt: String,
    logger: ((OSLogType, String) -> Void)? = nil,
    callback: @escaping(Result<Void, BISDKError>) -> Void
)
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

First, before calling the Embedded functions, make sure to initialize the SDK.

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-js';

const embedded = await Embedded.initialize();
```

</TabItem>
<TabItem value="flutter" label="Flutter">

First, before calling the Embedded functions, make sure to initialize the SDK.

<!-- javascript is used here since flutter is not available and dart doesn't highlight at all. -->
```javascript
import 'package:bi_sdk_flutter/embeddedsdk.dart';

Embeddedsdk.initialize(
    String biometricPrompt,
    bool enableLogging,
    List<String>? allowedDomains, /* Optional */
)
```

</TabItem>
<TabItem value="reactnative" label="React Native">

First, before calling the Embedded functions, make sure to initialize the SDK. This can be done where you register your root component.

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

Embedded.initialize(
  biometricAskPrompt: string,
  allowedDomains?: string[]
): Promise<Success>;
```

You may also add a listener to log native events with `Embedded.logEventEmitter` after initializing.

#### Usage

```javascript
import { Embedded } from '@beyondidentity/bi-sdk-react-native';

Embedded.initialize("Please verify it's really you").catch(console.error);

Embedded.logEventEmitter.addListener(
  'BeyondIdentityLogger',
  (message: string) => {
    console.log(message);
  }
);
```

</TabItem>
</Tabs>
