import { useReducer, useRef } from 'react';
import { mockState } from '@junipero/core';

import { useAccess } from '../hooks';
import PaywallView, { type NativeProps } from '../PaywallViewNativeComponent';

export interface PaywallProps extends Omit<NativeProps, 'appId'> {
  /**
   * Optional unique paywall id. When released, the snippet with the same id
   * will be hidden, and the corresponding restricted content will be displayed.
   */
  id?: string;
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

  const innerRef = useRef(null);

  return (
    <PaywallView
      ref={innerRef}
      { ...rest }
      appId={appId!!}
      pageType={pageType}
      displayMode={displayMode}
      config={{ ...config || {}, ...factoryConfig || {} }}
      texts={{ ...texts || {}, ...factoryTexts || {} }}
      styles={{ ...styles || {}, ...factoryStyles || {} }}
      variables={{ ...variables || {}, ...factoryVariables || {} }}
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
        dispatch({ width: nativeEvent.width, height: nativeEvent.height });
      }}
    />
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;
