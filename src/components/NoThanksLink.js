import React, { useContext } from 'react';

import { AppContext } from '../services/contexts';
import Translate from './Translate';
import { commons, applyStyles } from '../styles';

const NoThanksLink = () => {
  const {
    action,
    originalAction,
    fireEvent,
    getConfig,
    getStyle,
    setAlternative,
  } = useContext(AppContext);

  const onPress = e => {
    fireEvent('AlternativeClick', {
      widget: getConfig('track_original_action') === true
        ? originalAction
        : action,
      button: 'no_thanks',
      originalEvent: e,
      alternativeWidget: getConfig('alternative_widget'),
    });
    setAlternative();
  };

  return (
    <Translate
      textKey="no_thanks"
      testID="rejectButton"
      style={[
        commons.link,
        styles.link,
        applyStyles(getStyle('layout') === 'landscape', [
          commons.link__landscape,
          styles.link__landscape,
        ]),
      ]}
      onPress={onPress}
    />
  );
};

const styles = {
  link: {},
  link__landscape: {
    flex: 0.5,
  },
};

NoThanksLink.propTypes = {};

NoThanksLink.displayName = 'NoThanksLink';

export default NoThanksLink;
