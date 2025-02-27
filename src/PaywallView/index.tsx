import type { ComponentPropsWithoutRef } from 'react';
import { requireNativeComponent } from 'react-native';

import type { AccessContextValue } from '../contexts';
import type { PaywallProps } from '../Paywall';

export interface PaywallViewProps extends Pick<
  PaywallProps,
  'config' | 'texts' | 'styles' | 'variables'
>, Pick<AccessContextValue, 'appId'>, ComponentPropsWithoutRef<any> {}

// const LINKING_ERROR =
//   `The package '@poool/react-native-access' doesn't seem to be linked. ` +
//   `Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

const PaywallView = requireNativeComponent<PaywallViewProps>('PaywallView');


export default PaywallView;
