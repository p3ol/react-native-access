import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { track, setConfig } from '@poool/sdk';

import { AppContext } from '../services/contexts';

import RestrictionWidget from './RestrictionWidget';
import GiftWidget from './GiftWidget';
import LinkWidget from './LinkWidget';
import NewsletterWidget from './NewsletterWidget';

const Widget = () => {
  const {
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
      console.log(result);
      updateContext({ trackData: result });
      onReady();
    } catch (e) {
      console.error(e);
    }

  };

  const onRelease = async () => {
    try {
      // TODO add premium read call
      //await track('premium-read', { type: 'premium' });
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
      : trackData.config.alternative_widget
    : trackData.action) {
    case 'gift':
      return (
        <GiftWidget
          onRelease={onRelease}
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
          onRelease={onRelease}
          data={trackData}
        />
      );
    case 'invisible':
      onRelease();
      setActive(false);
      return null;
    case 'unlock':
      onRelease();
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
