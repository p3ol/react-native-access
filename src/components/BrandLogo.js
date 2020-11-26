import React, { useContext } from 'react';
import { Image } from 'react-native';

import { AppContext } from '../services/contexts';

import { applyStyles } from '../styles';

const BrandLogo = () => {
  const { getStyle } = useContext(AppContext);

  return getStyle('brand_logo') && (
    <Image
      testID="brandLogo"
      resizeMode="contain"
      style={[
        styles.logo,
        applyStyles(getStyle('layout') === 'landscape', [
          styles.logo__landscape,
        ]),
      ]}
      source={{ uri: getStyle('brand_logo') }}
    />
  );
};

const styles = {
  logo: {
    width: '100%',
    height: 60,
    marginBottom: 20,
  },
  logo__landscape: {
    marginTop: -25,
  },
};

BrandLogo.propTypes = {};

BrandLogo.displayName = 'BrandLogo';

export default BrandLogo;
