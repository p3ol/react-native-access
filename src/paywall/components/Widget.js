import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { track, setConfig, unlock } from '@poool/sdk';

import { AppContext } from '../services/contexts';

import RestrictionWidget from './RestrictionWidget';
import GiftWidget from './GiftWidget';
import LinkWidget from './LinkWidget';
import NewsletterWidget from './NewsletterWidget';

const Widget = () => {
  const {
    active,
    setActive,
    alternative,
    config,
    trackData,
    updateContext,
    onReady,
  } = useContext(AppContext);

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
      apiUrl: 'https://api.poool.develop:8443/api/v3',
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

  const release = async () => {
    try {
      await unlock(trackData, { body: { cookiesEnabled: true } });
      setActive(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (!trackData) {
    // TODO: Show loader
    return null;
  }

  switch (alternative
    ? config.alternative_widget
      ? config.alternative_widget
      : trackData?.config.alternative_widget
    : trackData?.action) {
    case 'gift':
      return (
        <GiftWidget
          release={release}
          data={trackData}
        />
      );
    case 'link':
      return (
        <LinkWidget
          data={trackData}
        />
      );
    case 'newsletter':
      return (
        <NewsletterWidget
          release={release}
          data={trackData}
        />
      );
    case 'invisible':
      release();
      setActive(false);
      return null;
    case 'unlock':
      release();
      setActive(false);
      // TODO: Add a "popover" message
      return null;
    default:
      return (
        <RestrictionWidget
          widget='default'
          data={trackData}
        />
      );
  }
};

export default Widget;
