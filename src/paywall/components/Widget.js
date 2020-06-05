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
            widget={trackData.action}
            data={trackData}
          />
        );
        break;
      case 'form':
        setWidget(
          <FormWidget
            widget={trackData.action}
            data={trackData}
          />
        );
        break;
      case 'restriction':
        setWidget(
          <SubscriptionWidget
            widget={trackData.action}
            data={trackData}
          />
        );
        break;
      case 'gift':
        setWidget(
          <GiftWidget
            widget={trackData.action}
            data={trackData}
          />
        );
        break;
      case 'subscription':
        setWidget(
          <SubscriptionWidget
            widget={trackData.action}
            data={trackData}
          />
        );
        break;
      default:
        setWidget(
          <SubscriptionWidget
            widget='default'
            data={trackData}
          />
        );

    }
  };

  return (widget);
};

export default Widget;
