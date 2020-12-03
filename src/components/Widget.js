simport React, { useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';

import { applyStyles } from '../styles';

const Widget = ({ name: _, component: Tag, ...rest }) => {
  const { getStyle } = useContext(AppContext);

  return (
    <View
      testID="Widget"
      style={[
        styles.widget,
        applyStyles(getStyle('layout') === 'landscape', [
          styles.widget__landscape,
        ]),
      ]}
    >
      <Tag { ...rest } />
    </View>
  );
};

const styles = {
  widget: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  widget__landscape: {
    paddingBottom: 20,
  },
};

Widget.propTypes = {
  name: PropTypes.string,
  component: PropTypes.func,
};

Widget.displayName = 'Widget';

export default Widget;
