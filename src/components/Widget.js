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
import FormWidget from './FormWidget';
import GiftWidget from './GiftWidget';
import LinkWidget from './LinkWidget';
import NewsletterWidget from './NewsletterWidget';
import QuestionWidget from './QuestionWidget';

const Widget = () => {
  let disableTimeout;
  const {
    setActive,
    alternative,
    config,
    trackData,
    updateContext,
    onDisabled,
    onError,
    onIdentityAvailable,
    onRelease,
    onReady,
  } = useContext(AppContext);

  useEffect(() => {
    init();
    onReady();
    return () => clearTimeout(disableTimeout);
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
      onIdentityAvailable();
      setCookie('_poool:customStyles', JSON.stringify(result?.styles));
    } catch (e) {
      const styles = await getCookie('_poool:customStyles');
      updateContext({ trackData: { styles: JSON.parse(styles) } });
      onError(e);
    }
  };

  const releasing = async () => {
    try {
      await unlock(trackData, { body: { cookiesEnabled: true } });
      setActive(false);
    } catch (e) {
      onError(e);
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
    } catch (e) {
      onError(e);
    }
  };

  const disable = () => {
    disableTimeout = setTimeout(() => setActive(false), 100);
  };

  switch (alternative
    ? config.available_widgets.includes(trackData?.config.alternative_widget)
      ? trackData?.config.alternative_widget
      : config.alternative_widget
    : trackData?.action) {
    case 'disabled':
      onDisabled();
      disable();
      return null;
    case 'form':
      return (
        <FormWidget
          release={releasing}
          data={trackData}
        />
      );
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
      onRelease({
        widget: trackData?.action,
        actionName: trackData?.actionName,
      });
      releasing();
      return null;
    case 'question':
      return (
        <QuestionWidget
          release={releasing}
          data={trackData}
        />
      );
    case 'restriction':
      return (
        <RestrictionWidget
          data={trackData}
        />
      );
    case 'subscription':
      return (
        <RestrictionWidget
          data={trackData}
        />
      );
    case 'unlock':
      onRelease({
        widget: trackData?.action,
        actionName: trackData?.actionName,
      });
      releasing();
      return null;
    default:
      return (
        <RestrictionWidget
          widget="default"
        />
      );
  }
};

export default Widget;
