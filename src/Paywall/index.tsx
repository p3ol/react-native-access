import type { Poool } from 'poool-access';
import { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { AccessContext, type AccessContextValue } from '../contexts';
import PaywallView from '../PaywallView';

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
}

const Paywall = ({
  // events,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
}: PaywallProps) => {
  const {
    appId,
    config: factoryConfig,
    texts: factoryTexts,
    styles: factoryStyles,
    variables: factoryVariables,
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
    />
  );
};

export default Paywall;

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
