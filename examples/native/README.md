# Minimal @poool/react-native-access native example

## Installation

```
yarn install
```

## Usage

```
yarn ios
```

or

```
yarn android
```

## Common issues

### command not found: pod

```
sudo gem install cocoapods
```

Then again:

```
yarn install
```

### EMFILE: too many open files, watch

```
brew update
brew install watchman
```

### iOS: Lots of `unable to open file`

Reinstall pods using `yarn install-pods`

### Android: Task 'installDebug' not found in project ':app'.

- Open project with Android Studio, do a Gradle Sync
- Android SDK 28 is necessary to run this project (Android Studio downloads the latest SDK version by default, being v29 atm), be sure to download and install it
- Try again

### Android: spawnSync adb ENOENT

open `~/.zprofile` and add your android SDK path:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

And update your profile:

```
. ~/.zprofile
```
