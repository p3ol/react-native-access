import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AppContext } from '../services/contexts';
import { Locales } from '../utils/Locales';

import PropTypes from 'prop-types';

const Translate = ({
  textKey,
  children,
  replace = {},
  asString = false,
  tag: Tag = Text,
  ...rest
}) => {

  const {
    trackData,
  } = useContext(AppContext);

  const finalReplacers = {
    ...replace,
    ...(replace.app_name
      ? { app_name: trackData?.config?.app_name }
      : {}
    ),
  };

  var text = trackData?.texts?.[textKey] ||
    (Locales.availableLocales[trackData?.config?.locale?.toLowerCase() || 'fr']
      ?.[textKey] || '') ||
    children;

  Object.entries(finalReplacers).map(([k, v]) => {
    text = text?.replace(`{${k}}`, v);
  });

  return asString
    ? children({ text })
    : Tag instanceof Text
      ? <Tag { ...rest }>{ text }</Tag>
      : <Tag { ...rest }><Text>{ text }</Text></Tag>;
};

Translate.propTypes = {
  textKey: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  children: PropTypes.func,
  replace: PropTypes.object,
  asString: PropTypes.bool,
};

Translate.displayName = 'Translate';

export default Translate;
