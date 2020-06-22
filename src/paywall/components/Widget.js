import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  register,
  setConfig,
  track,
  unlock,
} from '@poool/sdk';

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

  const releasing = async () => {
    try {
      await unlock(trackData, { body: { cookiesEnabled: true } });
      setActive(false);
    } catch (e) {
      console.error(e);
    }
  };

  const registering = async email => {
    try {
      await register(
        trackData.segment,
        trackData.journey,
        trackData.actionName,
        email,
        trackData.config.newsletter_id,
        trackData.config?.externalListid,
        { body: { cookiesEnabled: true } }
      );
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
          release={releasing}
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
          register={registering}
          release={releasing}
          data={trackData}
        />
      );
    case 'invisible':
      releasing();
      return null;
    case 'unlock':
      releasing();
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
