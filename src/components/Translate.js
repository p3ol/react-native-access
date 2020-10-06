import React, { useContext } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import { AVAILABLE_LOCALES } from '../services/translations';

const Translate = ({
  textKey,
  children,
  replace = {},
  asString = false,
  tag: Tag = Text,
  ...rest
}) => {
  const { getText, trackData, getConfig } = useContext(AppContext);

  const finalReplacers = {
    ...replace,
    ...(replace.app_name
      ? { app_name: getConfig('app_name') }
      : {}
    ),
    ...(replace.count
      ? { count: trackData?.remaining || 0 }
      : {}
    ),
  };

  let text = getText(textKey) ||
    (AVAILABLE_LOCALES[getConfig('locale', 'fr').toLowerCase()]
      ?.[textKey] || '') || children;

  Object.entries(finalReplacers).map(([k, v]) => {
    text = text?.replace(`{${k}}`, v);
  });

  return asString
    ? children({ text })
    : Tag?.displayName === 'Text'
      ? <Tag { ...rest }>{ text }</Tag>
      : <Tag { ...rest }><Text>{ text }</Text></Tag>;
};

Translate.propTypes = {
  textKey: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]),
  replace: PropTypes.object,
  asString: PropTypes.bool,
};

Translate.displayName = 'Translate';

export default Translate;
