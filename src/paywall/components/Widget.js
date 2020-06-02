import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { track, setConfig } from '@poool/sdk';

import SubscriptionWidget from './SubscriptionWidget';
import FormWidget from './FormWidget';
import QuestionWidget from './QuestionWidget';
import GiftWidget from './GiftWidget';

const Widget = () => {

  const [widget, setWidget] = useState(null); // initiate with a loader

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

    const trackData = await track('page-view', { type: 'premium' });
    console.log(trackData);
    widgetSelector(trackData);

  };

  const widgetSelector = (trackData) => {
    switch (trackData.action) {
      case 'question':
        setWidget(
          <QuestionWidget
            data={trackData}
          />
        );
        break;
      case 'form':
        setWidget(
          <FormWidget
            data={trackData}
          />
        );
        break;
      case 'restriction':
        setWidget(
          <SubscriptionWidget
            data={trackData}
          />
        );
        break;
      case 'gift':
        setWidget(
          <GiftWidget
            data={trackData}
          />
        );
        break;
      case 'subscription':
        setWidget(
          <SubscriptionWidget
            data={trackData}
          />
        );
        break;
      default:
        setWidget(
          <SubscriptionWidget
            data={trackData}
          />
        );

    }
  };

  return (widget);
};

export default Widget;
