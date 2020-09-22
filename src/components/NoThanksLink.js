import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';

import Translate from './Translate';
import { texts } from '../styles';

const NoThanksLink = () => {

  const {
    setAlternative,
    trackData,
    onAlternativeClick,
  } = useContext(AppContext);

  const onPress = e => {
    setAlternative(true);
    onAlternativeClick({
      widget: trackData?.widget,
      button: e?.target,
      originalEvent: e,
      alternativeWidget: trackData?.config.alternative_widget,
    });
  };

  return (
    <Translate
      textKey="no_thanks"
      testID="rejectButton"
      style={texts.subaction[trackData?.styles?.layout]}
      onPress={onPress}
    />
  );
};

export default NoThanksLink;
