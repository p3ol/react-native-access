import type { Poool } from 'poool-access';
import { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { AccessContext, type AccessContextValue } from '../contexts';
import PaywallView from '../PaywallView';
import type { AccessEvents, EventCallbackFunction } from '../types';

export interface PaywallProps extends Pick<
  AccessContextValue, 'events' | 'config' | 'texts' | 'styles' | 'variables'
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
}

const Paywall = ({
  id,
  config,
  texts,
  styles,
  variables,
  events,
  pageType = 'premium',
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
      events={{
        ...events,
        release: (
          e: Parameters<
            Extract<AccessEvents['release'], EventCallbackFunction<any>>
          >[0]
        ) => {
          releaseContent?.(id || true);
          (events?.release as EventCallbackFunction<{}>)(e);
        }
      }}
    />
  );
};

export default Paywall;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
