This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# React Native TypeScript: Scrapay Mobile Application

## Step 1: Install Dependencies
Ensure all dependencies are installed. Run the following command from the root directory:

```
# Using npm
npm install

# OR using Yarn
yarn install
```


## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```
Tip: Let Metro Bundler run in its _own_ terminal.

## Step 3: Start the Application

 Open a _new_ terminal from the _root_ of the React Native project. Run the following command to start the _Android_ app:

### For Android

```bash
# using npm
npm run android

# OR using npx
npx react-native run-android

# OR using Yarn
yarn android
```

## Run the App on an Android Emulator (Optional)
To target a specific Android emulator, run the following command:

```
npx react-native run-android --device emulator-<emulator_id>
```

Replace <emulator_id> with the ID of your desired emulator, which can be listed using the following command:

```
emulator -list-avds

#OR

adb devices
```

Example:
```
npx react-native run-android --device emulator-Pixel_5_API_33
```

If everything is set up _correctly_, you should see the application running on your _Android Emulator_ or _iOS Simulator_ shortly provided the emulator/simulator has been set up correctly.

## Step 4: Clean and Rebuild the Android Project
If you encounter issues or need a fresh build, use the following commands to clean and rebuild the Android project:

````
cd android
````
### Clean the Build
```
./gradlew clean
```

### Rebuild the Project
```
./gradlew build
```

## Step 5: Build a Release APK (Android)
To build a release version of the APK for distribution, run the following command from the `android/` directory:

```
cd android
./gradlew assembleRelease
```

The generated APK will be located in the following directory:
`android/app/build/outputs/apk/release/`


# Android Build Configuration

## Overview
The build configuration files (build.gradle) were updated to support the integration of Auth0 and optimize the React Native project. The changes ensure proper authentication handling, React Native linking, and compatibility with Android build requirements.

## Key Changes

### 1. Plugins Applied
```
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"
apply plugin: "com.facebook.react.rootproject"
```

`com.android.application`: Standard plugin for Android app builds.

`org.jetbrains.kotlin.android`: Adds Kotlin support for Android.

`com.facebook.react` & `com.facebook.react.rootproject`: Ensure React Native's Gradle plugin is enabled, handling React Native autolinking and build tasks.

### 2. React Autolinking Setup
```
react {
    autolinkLibrariesWithApp()
}
```

`autolinkLibrariesWithApp()`: Automatically links React Native libraries, ensuring that dependencies like `react-native-auth0` are properly integrated.


### 3. Manifest Placeholders for Auth0
```
defaultConfig {
    ...
    manifestPlaceholders = [
        appAuthRedirectScheme: "com.scrapaysapp",
        auth0Domain: "dev-mr0rccx8miz375v2.us.auth0.com",
        auth0Scheme: "${applicationId}.auth0"
    ]
}
```

`appAuthRedirectScheme`: Specifies the URI scheme for Auth0 redirection (com.scrapaysapp).

`auth0Domain`: Auth0 domain used for authentication.

`auth0Scheme`: Dynamic URI scheme combining the app’s applicationId with .auth0 to handle callbacks.

### 4. Dependency Management
```
dependencies {
    implementation("com.facebook.react:react-android")
    implementation('com.facebook.soloader:soloader:0.10.5')
    implementation project(':react-native-auth0')
    
    ...
}
```

`react-android`: Core React Native dependency for Android.

`react-native-auth0`: Auth0 library for handling authentication in React Native.

`soloader`: Helps manage native libraries efficiently.

### 5. Build Script (buildscript Section) Updates

```
buildscript {
    ext {
        buildToolsVersion = "35.0.0"
        minSdkVersion = 24
        compileSdkVersion = 35
        targetSdkVersion = 34
        ndkVersion = "26.1.10909125"
        kotlinVersion = "1.9.24"
    }
    ...
}
```

SDK Versions: Updated `compileSdkVersion`, `targetSdkVersion`, and `minSdkVersion` for compatibility with modern Android.

Kotlin and NDK Versions: Ensures compatibility with Kotlin and Native Development Kit (NDK) versions.


# React Native vs. React Web Architecture

This section explains the key architectural differences between React Native and React for the web, focusing on the bridge between JavaScript and native code in React Native, and Android-specific considerations.

## 1. Architectural Differences
### React (Web)
React is a JavaScript library for building user interfaces, primarily for web applications. Its core principle revolves around the Virtual DOM (Document Object Model), which efficiently updates the real DOM in response to changes in application state.

Components: React uses functional or class-based components to create UI.

DOM Manipulation: React manipulates the DOM using the Virtual DOM for optimal rendering performance.

Browser APIs: React directly interacts with the browser APIs to manage elements, events, and rendering.

### React Native
React Native enables the development of mobile applications using JavaScript and React concepts but targets mobile platforms like iOS and Android instead of the web. It does not manipulate a DOM; instead, it renders native UI components.

Components: React Native uses native components like Text, View, Button, and Image instead of web-based div, span, or button.

Native Rendering: React Native bridges JavaScript and the device’s native UI components, rendering components directly to the platform’s UI.

No DOM: Instead of using the DOM, it uses native widgets provided by iOS and Android.


## 2. The React Native Bridge
React Native's architecture centers around a JavaScript-to-Native Bridge that enables the JavaScript code to interact with native code (Java for Android and Objective-C/Swift for iOS).

### How the Bridge Works:

JavaScript Thread: Runs the React application logic.

Bridge: Acts as a communication layer between the JavaScript and native code.

Native Modules: The bridge communicates with native components via asynchronous batched message passing.

### Key Points:
Asynchronous Communication: React Native sends JSON messages over the bridge, avoiding UI blocking and ensuring smooth performance.

Batched Updates: Updates are batched to reduce the number of native-to-JavaScript transitions.

Performance Consideration: Performance-intensive tasks (e.g., animations, heavy computations) may require direct native code for optimization.



## 3. Android-Specific Considerations in React Native Development
Developing for Android using React Native involves various platform-specific details, such as project configuration, UI considerations, and handling device-specific optimizations.

### 3.1 Project Configuration
React Native Android projects rely on the Gradle Build System for build automation, dependency management, and configuring project settings. Here are some essential configurations and tools used in a typical build.gradle file:

### NDK Support: 
Native libraries for performance-sensitive tasks can be implemented using the Native Development Kit (NDK).

### buildToolsVersion
Description: Specifies the version of the Android Build Tools used by Gradle to compile and package the application.

Purpose: Ensures the app is built with the latest tools, providing access to the latest Android features and optimizations.

### minSdkVersion
Description: Defines the minimum Android API level required to run the app.

Purpose: Ensures that the app runs only on devices with an API level equal to or greater than the specified value. It prevents the app from being installed on older, unsupported versions.

### compileSdkVersion
Description: Specifies the Android API level that the app is compiled against.

Purpose: Allows the app to use the latest APIs and features available in the specified SDK version. However, it doesn't affect the devices on which the app can be installed.


### targetSdkVersion
Description: Defines the target Android API level the app is optimized for.

Purpose: Indicates the API level for which the app is designed, signaling compatibility with the latest Android features and behavior changes introduced in that SDK. It does not restrict installation on devices with lower API levels (as long as they meet minSdkVersion).

## 3.2 UI Considerations
Layout Differences: Android uses Flexbox for layout via View components, similar to CSS flex but adapted for mobile.

Native Widgets: React Native’s Button or Picker components behave differently on Android compared to iOS due to underlying native components.

## 3.3 Permissions and Manifests
Android applications require explicit permission declarations in AndroidManifest.xml:
```
<manifest>
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CAMERA"/>
    ...
</manifest>
```

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
