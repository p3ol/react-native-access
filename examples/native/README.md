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

### Lots of `unable to open file` when trying to run on iOS

Reinstall pods using `yarn install-pods`
