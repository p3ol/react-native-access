import type { Poool } from 'poool-access';
import { useContext, useEffect, useRef } from 'react';
import { RootTagContext, Text, View } from 'react-native';

import type{ PageType } from '../types';
import { useAccess } from '../hooks';

export interface PaywallProps {
  contentRef?: React.RefObject<any>;
  children?: React.ReactElement;
  config?: Poool.AccessConfigOptions;
  texts?: { [key: string]: string };
  styles?: Poool.styles;
  events?: { [key: string]: (...props: any) => any };
  variables?: { [key: string]: any };
  pageType?: PageType;
  bottomSheet?: boolean;
}

const Paywall = ({
  events,
  contentRef,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
  bottomSheet = false,
}: PaywallProps) => {
  const { lib, createFactory } = useAccess();
  const innerRef = useRef<View>();
  const rootTag = useContext(RootTagContext);

  useEffect(() => {
    const factory = createPaywall();

    return () => {
      factory?.destroy?.();
    };
  }, [lib, createFactory]);

  const createPaywall = () => {
    const factory = createFactory?.({
      config,
      texts,
      styles,
      variables,
      events,
    });

    factory?.createPaywall?.(
      pageType,
      bottomSheet ? rootTag : contentRef?.current || innerRef.current,
      80,
      bottomSheet ? 'bottom-sheet' : contentRef?.current ? 'hide' : 'custom');

    return factory;
  };

  return (
    <View ref={innerRef}>
      <Text>Test</Text>
    </View>
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;
