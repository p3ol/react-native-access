import React, { useContext } from 'react';
import { View } from 'react-native';

import { AppContext } from '../services/contexts';

const WidgetContent = ({ children }) => {
  const { getStyle } = useContext(AppContext);

  return (
    <View
      testID="WidgetContent"
      style={[
        styles.content,
        getStyle('layout') === 'landscape' && styles.content__landscape,
      ]}
    >
      { children }
    </View>
  );
};

const styles = {
  content: {
    padding: 0,
  },
  content__landscape: {
    padding: 20,
  },
};

WidgetContent.propTypes = {};

WidgetContent.displayName = 'WidgetContent';

export default WidgetContent;
