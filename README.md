This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

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

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
