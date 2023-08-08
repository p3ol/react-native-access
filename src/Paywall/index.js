import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAccess } from '../hooks';

const Paywall = ({
  events,
  contentRef,
  children,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
}) => {
  const { lib, createFactory } = useAccess();

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

    factory?.createPaywall?.(pageType, contentRef?.current, 80);

    return factory;
  };

  return children;
};

Paywall.displayName = 'Paywall';
Paywall.propTypes = {
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  children: PropTypes.element,
  config: PropTypes.object,
  texts: PropTypes.object,
  styles: PropTypes.object,
  events: PropTypes.object,
  variables: PropTypes.object,
  id: PropTypes.string,
  pageType: PropTypes.oneOf([
    'premium', 'free', 'page', 'subscription', 'registration',
  ]),
};

export default Paywall;
