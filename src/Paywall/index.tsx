import { useMemo, useReducer, useRef } from 'react';
import { mockState } from '@junipero/core';

import { useAccess } from '../hooks';
import PaywallView, {
  type NativeProps,
} from '../specs/PaywallViewNativeComponent';
import type { AccessConfig } from '../types';

export interface PaywallProps extends Omit<
  NativeProps,
  'appId' | 'config' | 'texts' | 'styles' | 'variables'
> {
  /**
   * Optional unique paywall id. When released, the snippet with the same id
   * will be hidden, and the corresponding restricted content will be displayed.
   */
  id?: string;
  config?: AccessConfig;
  texts?: Record<string, string>;
  styles?: Record<string, string>;
  variables?: Record<string, any>;
}

export interface PaywallState {
  width: number;
  height: number;
}

const Paywall = ({
  id,
  style,
  config,
  texts,
  styles,
  variables,
  displayMode = 'default',
  pageType = 'premium',
  onRelease,
  ...rest
}: PaywallProps) => {
  const {
    appId,
    config: factoryConfig,
    texts: factoryTexts,
    styles: factoryStyles,
    variables: factoryVariables,
    releaseContent,
  } = useAccess();

  const [state, dispatch] = useReducer(mockState<PaywallState>, {
    width: 0,
    height: 0,
  });

  const serializedConfig = useMemo(() => (
    JSON.stringify({ ...config || {}, ...factoryConfig || {} })
  ), [config, factoryConfig]);
  const serializedTexts = useMemo(() => (
    JSON.stringify({ ...texts || {}, ...factoryTexts || {} })
  ), [texts, factoryTexts]);
  const serializedStyles = useMemo(() => (
    JSON.stringify({ ...styles || {}, ...factoryStyles || {} })
  ), [styles, factoryStyles]);
  const serializedVariables = useMemo(() => (
    JSON.stringify({ ...variables || {}, ...factoryVariables || {} })
  ), [variables, factoryVariables]);

  const innerRef = useRef(null);

  return (
    <PaywallView
      ref={innerRef}
      { ...rest }
      appId={appId!!}
      pageType={pageType}
      displayMode={displayMode}
      config={serializedConfig}
      texts={serializedTexts}
      styles={serializedStyles}
      variables={serializedVariables}
      style={[style, {
        minWidth: state.width,
        minHeight: state.height,
      }]}
      onRelease={e => {
        if (displayMode === 'default') {
          releaseContent?.(id || true);
        }

        onRelease?.(e);
      }}
      onResize={({ nativeEvent }) => {
        console.log("yoyoy: ", nativeEvent.height)
        dispatch({ width: nativeEvent.width, height: nativeEvent.height });
      }}
    />
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;
