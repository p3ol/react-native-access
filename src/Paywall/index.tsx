import { useMemo, useReducer, useRef } from 'react';
import { mockState } from '@junipero/core';

import type {
  AccessConfig,
  DirectEventHandlerWithResult,
  FieldError,
} from '../types';
import { useAccess } from '../hooks';
import PaywallView, {
  type NativeProps,
  type FormEvent,
  type RegisterEvent,
} from '../specs/PaywallViewNativeComponent';
import NativePaywallModule from '../specs/NativePaywallModule';
import type { NativeSyntheticEvent } from 'react-native';

export interface PaywallProps extends Omit<
  NativeProps,
  'appId' | 'config' | 'texts' | 'styles' | 'variables' |
  'onFormSubmit' | 'onRegister'
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

  onFormSubmit?: DirectEventHandlerWithResult<FormEvent, FieldError[]>;
  onRegister?: DirectEventHandlerWithResult<RegisterEvent, FieldError[]>;
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
  onFormSubmit,
  onRegister,
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

  const sendMessage = (
    e: NativeSyntheticEvent<FormEvent | RegisterEvent>,
    type: string,
    data: any,
  ) => {
    const message = JSON.stringify({
      type,
      data,
      _messageId: e.nativeEvent._messageId
    });

    if (factoryConfig?.debug || config?.debug) {
      console.log(
        'Poool/Access/ReactNative:',
        'Sending message to native module ->',
        'poool:rn:event.' + type,
        message
      );
    }

    NativePaywallModule.emit('poool:rn:event.' + type, message);
  };

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
        dispatch({ width: nativeEvent.width, height: nativeEvent.height });
      }}
      onFormSubmit={async e => {
        e.persist();

        try {
          e.nativeEvent.fields = JSON.parse(e.nativeEvent.fields);
          e.nativeEvent.values = JSON.parse(e.nativeEvent.values);
          e.nativeEvent.valid = JSON.parse(e.nativeEvent.valid);
          const result = await onFormSubmit?.(e);
          sendMessage(e, 'onFormSubmit:resolve', result);
        } catch (error) {
          sendMessage(e, 'onFormSubmit:reject', {
            message: (error as Error).message || error,
          });
        }
      }}
      onRegister={async e => {
        e.persist();

        try {
          const result = await onRegister?.(e);
          sendMessage(e, 'onRegister:resolve', result);
        } catch (error) {
          sendMessage(e, 'onRegister:reject', {
            message: (error as Error).message || error,
          });
        }
      }}
    />
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;
