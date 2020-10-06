import React, { useContext } from 'react';
import { Image } from 'react-native';

import { AppContext } from '../services/contexts';

const BrandCover = () => {
  const { getStyle } = useContext(AppContext);

  return getStyle('layout') !== 'portrait' && getStyle('brand_cover') && (
    <Image
      style={styles.cover}
      source={{ uri: getStyle('brand_cover') }}
    />
  );
};

const styles = {
  cover: {
    height: 90,
  },
};

BrandCover.propTypes = {};

BrandCover.displayName = 'BrandCover';

export default BrandCover;
