import React, { useEffect, useContext } from 'react';
import { ImageBackground, View } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { setConfig, track } from '@poool/sdk';

import { AppContext } from '../services/contexts';
import Widget from './Widget';
import CopyrightLink from './CopyrightLink';
import Switch from './Switch';
import GiftWidget from './GiftWidget';
import RestrictionWidget from './RestrictionWidget';
import LinkWidget from './LinkWidget';
import FormWidget from './FormWidget';
import QuestionWidget from './QuestionWidget';
import NewsletterWidget from './NewsletterWidget';

import { applyStyles, colors, overrides } from '../styles';

const WIDGETS_WITHOUT_ACTIONS = ['invisible', 'unlock'];

const Paywall = ({
  apiUrl,
}) => {
  const {
    released,
    ready,
    update: updateContext,
    flush,
    fireEvent,
    trackData,
    appId,
    getStyle,
    getConfig,
    action,
    doRelease,
  } = useContext(AppContext);

  useEffect(() => {
    init();

    return flush;
  }, []);

  const setCookie = (name, value) =>
    AsyncStorage.setItem(`@${name}`, value);

  const getCookie = name =>
    AsyncStorage.getItem(`@${name}`);

  const init = async () => {
    fireEvent('onLock');

    setConfig({
      appId,
      apiUrl,
      setCookie,
      getCookie,
    });

    try {
      const pageData = {
        type: 'premium',
        userIsPremium: getConfig('user_is_premium'),
        forcedWidget: getConfig('force_widget'),
        customSegment: getConfig('custom_segment'),
        stylesVersion: parseInt(await getCookie('stylesVersion') ?? -1, 10),
      };
      const result = await track('page-view', pageData);
      updateContext({ trackData: result });

      fireEvent('onIdentityAvailable', {
        user_id: await getCookie('_poool'),
        segment_slug: result.segment,
        journey_name: result.journey,
        widget: result.action,
        widget_name: result.actionName,
      });

      try {
        if (!result.styles) {
          result.styles = JSON
            .parse(await getCookie('customStyles') || '');
        } else {
          await setCookie('stylesVersion', result?.styles?.version || 0);
          await setCookie('customStyles', JSON.stringify(result?.styles));
        }
      } catch (e) {
        // console.error('Could not apply custom styling');
        // console.error(e);
      }

      doAction(result.action, result.originalAction);
    } catch (e) {
      const styles = await getCookie('customStyles');
      updateContext({ trackData: { styles: JSON.parse(styles) } });
      doAction();
      fireEvent('onError', e);
    }
  };

  const doAction = (action_, originalAction_) => {
    action_ = action_ || 'restriction';
    originalAction_ = originalAction_ || 'restriction';

    if (action_ === 'hidden' || getConfig('force_widget') === 'hidden') {
      // Log.trace('Widget hidden in settings, doing nothing');
      fireEvent('onHidden');

      return;
    }

    if (action_ === 'disabled' || getConfig('force_widget') === 'disabled') {
      fireEvent('onDisabled');
      updateContext({ action: 'disabled', ready: true });

      return;
    }

    if (WIDGETS_WITHOUT_ACTIONS.includes(action_)) {
      doRelease();
    } else {
      updateContext({
        ready: true,
        action: getConfig('force_widget') || action_,
        originalAction: originalAction_,
      });
    }

    fireEvent('onReady');
  };

  if (released || !trackData || !ready) {
    return null;
  }

  return (
    <View testID="paywallView">
      <ImageBackground
        source={{
          uri: getStyle('layout') === 'portrait'
            ? 'https://cdn.poool.fr/assets/bones.svg'
            : '',
        }}
        resizeMode="cover"
        style={[
          styles.background,
          applyStyles(getStyle('layout') === 'landscape', [
            styles.background__landscape,
          ]),
        ]}
      >
        <View
          style={[
            styles.paywall,
            applyStyles(getStyle('layout') === 'landscape', [
              styles.paywall__landscape,
            ]),
            applyStyles(!!getStyle('skin_color'), [
              overrides.borderColor(getStyle('skin_color')),
            ]),
          ]}
        >
          <View style={styles.wrapper}>
            <Switch action={action}>
              <Widget name="gift" component={GiftWidget} />
              <Widget name="link" component={LinkWidget} />
              <Widget name="form" component={FormWidget} />
              <Widget name="question" component={QuestionWidget} />
              <Widget name="newsletter" component={NewsletterWidget} />
              <Widget component={RestrictionWidget} />
            </Switch>

            { trackData?.hasLogo !== false && <CopyrightLink /> }
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  background: {
    paddingHorizontal: 20,
  },
  background__landscape: {
    marginTop: -20,
    paddingHorizontal: 0,
  },
  paywall: {
    top: -50,
    borderLeftWidth: 6,
    maxWidth: 540,
    margin: 'auto',
  },
  paywall__landscape: {
    top: 0,
    borderLeftWidth: 0,
  },
  wrapper: {
    backgroundColor: colors.white,
  },
};

Paywall.propTypes = {
  apiUrl: PropTypes.string,
};

Paywall.displayName = 'Paywall';

export default Paywall;
