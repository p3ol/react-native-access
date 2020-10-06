import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@poool/junipero-native';

import { AppContext } from '../services/contexts';
import Translate from './Translate';

import { applyStyles, overrides } from '../styles';

const MainButton = ({
  text = '',
  onPress = () => {},
}) => {
  const { getStyle } = useContext(AppContext);

  return (
    <Translate textKey={text} asString={true}>
      { ({ text: text_ }) => (
        <Button
          testID="releaseButton"
          theme="primary"
          onPress={onPress}
          customStyle={{
            button: [
              styles.button,
              applyStyles(!!getStyle('button_color'), [
                overrides.backgroundColor(getStyle('button_color')),
              ]),
            ],
          }}
        >
          { text_ }
        </Button>
      ) }
    </Translate>
  );
};

const styles = {
  button: {
    textAlign: 'center',
  },
};

MainButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

MainButton.displayName = 'MainButton';

export default MainButton;
