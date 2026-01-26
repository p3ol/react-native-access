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
  type ClickEvent,
} from '../specs/PaywallViewNativeComponent';
import NativePaywallModule from '../specs/NativePaywallModule';
import type { NativeSyntheticEvent } from 'react-native';

export interface PaywallProps extends Omit<
  NativeProps,
  'appId' | 'config' | 'texts' | 'styles' | 'variables' |
  'onFormSubmit' | 'onRegister' | 
  'onSubscribeClick' | 'onLoginClick' | 'onDiscoveryLinkClick' | 'onDataPolicyClick'
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

  onSubscribeClick?: (event: NativeSyntheticEvent<ClickEvent>, prevent: () => void) => void;
  onLoginClick?: (event: NativeSyntheticEvent<ClickEvent>, prevent: () => void) => void;
  onDiscoveryLinkClick?: (event: NativeSyntheticEvent<ClickEvent>, prevent: () => void) => void;
  onDataPolicyClick?: (event: NativeSyntheticEvent<ClickEvent>, prevent: () => void) => void;
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
  onSubscribeClick,
  onLoginClick,
  onDiscoveryLinkClick,
  onDataPolicyClick,
  ...rest
}: PaywallProps) => {
  const {
    appId,
    config: factoryConfig,
    texts: factoryTexts,
    styles: factoryStyles,
    variables: factoryVariables,
    releaseContent,
    released,
  } = useAccess();

  const [state, dispatch] = useReducer(mockState<PaywallState>, {
    width: 0,
    height: 0,
  });

  const rawConfig = useMemo(() => ({
    ...factoryConfig,
    ...config,
  }), [config, factoryConfig]);
  
  const serializedConfig = useMemo(() => (
    JSON.stringify({
      ...rawConfig,
      context: ([] as string[]).concat(rawConfig?.context || []),
    })
  ), [rawConfig]);

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
    e: NativeSyntheticEvent<FormEvent | RegisterEvent | ClickEvent>,
    type: string,
    data: any,
  ) => {
    const message = JSON.stringify({
      type,
      data,
      prevented: (e.nativeEvent as any).prevented,
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

  const sendClickEvent = async (
    event: NativeSyntheticEvent<ClickEvent>,
    eventName: string,
    onClick: ((e: NativeSyntheticEvent<ClickEvent>, prevent: () => void) => void) | undefined,
  ) => {
    event.persist();

    try {
      event.nativeEvent.prevented = false;
      await onClick?.(event, () => {
        event.nativeEvent.prevented = true;
      });
      sendMessage(event, eventName + ':resolve', {});
    } catch (error) {
      sendMessage(event, eventName + ':reject', {
        message: (error as Error).message || error,
      });
    }
  }

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
      released={(!id && released?.includes(true)) || released?.includes(id || 'unknown')}
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
      onSubscribeClick={ async (e) => {
        await sendClickEvent(e, 'onSubscribeClick', onSubscribeClick);
      }}
      onLoginClick={ async (e) => {
        await sendClickEvent(e, 'onLoginClick', onLoginClick);
      }}
      onDataPolicyClick={ async (e) => {
        await sendClickEvent(e, 'onDataPolicyClick', onDataPolicyClick);
      }}
      onDiscoveryLinkClick={ async (e) => {
        await sendClickEvent(e, 'onDiscoveryLinkClick', onDiscoveryLinkClick);
      }}
    />
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;
