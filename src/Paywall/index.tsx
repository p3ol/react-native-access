import type { Poool } from 'poool-access';
import { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';

import type { AccessEvents, EventCallbackFunction } from '../types';
import { type AccessContextValue, AccessContext } from '../contexts';
import { fromNativeEvent } from '../utils';
import PaywallView from '../PaywallView';

export interface PaywallProps extends Pick<
  AccessContextValue, 'config' | 'texts' | 'styles' | 'variables'
> {
  /**
   * The current page type
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  pageType?: Parameters<Poool.AccessFactory['createPaywall']>[0]['pageType'];
  /**
   * Optional unique paywall id. When released, the snippet with the same id
   * will be hidden, and the corresponding restricted content will be displayed.
   */
  id?: string;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#lock
   */
  onLock?: Extract<AccessEvents['lock'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#release
   */
  onReady?: Extract<AccessEvents['ready'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#release
   */
  onRelease?: Extract<AccessEvents['release'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#paywallSeen
   */
  onPaywallSeen?: Extract<AccessEvents['paywallSeen'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#identityAvailable
   */
  onRegister?: Extract<AccessEvents['register'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#formSubmit
   */
  onFormSubmit?: Extract<AccessEvents['formSubmit'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#subscribeClick
   */
  onSubscribeClick?: Extract<AccessEvents['subscribeClick'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#loginClick
   */
  onLoginClick?: Extract<AccessEvents['loginClick'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#discoveryLinkClick
   */
  onDiscoveryLinkClick?: Extract<AccessEvents['discoveryLinkClick'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#customButtonClick
   */
  onCustomButtonClick?: Extract<AccessEvents['customButtonClick'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#dataPolicyClick
   */
  onDataPolicyClick?: Extract<AccessEvents['dataPolicyClick'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#alternativeClick
   */
  onAlternativeClick?: Extract<AccessEvents['alternativeClick'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#error
   */
  onError?: Extract<AccessEvents['error'], EventCallbackFunction<any>>;
  /**
   * See https://www.poool.dev/docs/access/javascript/access/events#answer
   */
  onAnswer?: Extract<AccessEvents['answer'], EventCallbackFunction<any>>;
}

const Paywall = ({
  id,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
  onLock,
  onRelease,
  onReady,
  onPaywallSeen,
  onRegister,
  onFormSubmit,
  onSubscribeClick,
  onLoginClick,
  onDiscoveryLinkClick,
  onCustomButtonClick,
  onDataPolicyClick,
  onAlternativeClick,
  onError,
  onAnswer,
}: PaywallProps) => {
  const {
    appId,
    config: factoryConfig,
    texts: factoryTexts,
    styles: factoryStyles,
    variables: factoryVariables,
    releaseContent,
  } = useContext(AccessContext);
  const innerRef = useRef(null);

  return (
    <PaywallView
      ref={innerRef}
      appId={appId}
      pageType={pageType}
      config={{ ...config || {}, ...factoryConfig || {} }}
      texts={{ ...texts || {}, ...factoryTexts || {} }}
      styles={{ ...styles || {}, ...factoryStyles || {} }}
      variables={{ ...variables || {}, ...factoryVariables || {} }}
      style={internalStyles.container}
      onRelease={fromNativeEvent<Extract<AccessEvents['release'], EventCallbackFunction<any>>>((
        e: Parameters<
          Extract<AccessEvents['release'], EventCallbackFunction<any>>
        >[0]
      ) => {
        releaseContent?.(id || true);
        onRelease?.(e);
      })}
      onLock={onLock}
      onReady={onReady}
      onPaywallSeen={onPaywallSeen}
      onRegister={onRegister}
      onFormSubmit={onFormSubmit}
      onSubscribeClick={onSubscribeClick}
      onLoginClick={onLoginClick}
      onDiscoveryLinkClick={onDiscoveryLinkClick}
      onCustomButtonClick={onCustomButtonClick}
      onDataPolicyClick={onDataPolicyClick}
      onAlternativeClick={onAlternativeClick}
      onError={onError}
      onAnswer={onAnswer}
    />
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
