import React, { useContext } from 'react';
import { Image } from 'react-native';

import { AppContext } from '../services/contexts';

const BrandLogo = () => {
  const { getStyle } = useContext(AppContext);

  return getStyle('brand_logo') && (
    <Image
      resizeMode="contain"
      style={[
        styles.logo,
        getStyle('layout') === 'landscape' && styles.logo__landscape,
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

BrandLogo.displayName = 'BrandLogo';
BrandLogo.propTypes = {};

export default BrandLogo;
