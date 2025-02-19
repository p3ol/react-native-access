import type { ComponentPropsWithoutRef } from 'react';
import { requireNativeComponent } from 'react-native';

import type { AccessContextValue } from '../contexts';
import type { PaywallProps } from '../Paywall';

export interface PaywallViewProps extends Pick<
  PaywallProps,
  'config' | 'texts' | 'styles' | 'variables'
>, Pick<AccessContextValue, 'appId'>, ComponentPropsWithoutRef<any> {}

const PaywallView = requireNativeComponent<PaywallViewProps>('PaywallView');

export default PaywallView;