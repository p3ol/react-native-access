import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { track, setConfig } from '@poool/sdk';

import { AppContext } from '../services/contexts';
import SubscriptionWidget from './SubscriptionWidget';
import GiftWidget from './GiftWidget';

const Widget = () => {
  const { trackData, updateContext, onReady } = useContext(AppContext);

  useEffect(() => {
    init();
  }, []);

  const setCookie = (name, value) =>
    AsyncStorage.setItem(`@${name}`, value);

  const getCookie = name =>
    AsyncStorage.getItem(`@${name}`);

  const init = async () => {
    setConfig({
      appId: 'ZRGA3EYZ4GRBTSHREG345HGGZRTHZEGEH',
      apiUrl: 'https://api.poool.local:8443/api/v3',
      setCookie,
      getCookie,
    });

    try {
      const result = await track('page-view', { type: 'premium' });
      updateContext({ trackData: result });
      onReady();
    } catch (e) {
      console.error(e);
    }
  };

  if (!trackData) {
    // TODO: Show loader
    return null;
  }

  switch (trackData.action) {
    case 'gift':
      return (
        <GiftWidget
          data={trackData}
        />
      );
    default:
      return (
        <SubscriptionWidget
          widget='default'
          data={trackData}
        />
      );
  }
};

export default Widget;
