import type { ComponentPropsWithoutRef } from 'react';

import type { AccessContextValue } from '../contexts';
import type { PaywallProps } from '../Paywall';

export interface PaywallViewProps extends Pick<
  PaywallProps,
  'config' | 'texts' | 'styles' | 'variables'
>, Pick<AccessContextValue, 'appId'>, ComponentPropsWithoutRef<any> {}


import { useEffect, useRef, useState } from 'react';
import { View, NativeModules, findNodeHandle } from 'react-native';

const RNAccess = NativeModules.RNAccess;

const PaywallView = ({
    appId,
    config,
    texts,
    styles,
    variables,
    displayMode,
    pageType,
    onLock,
    onRelease,
    onReady,
    // onPaywallSeen,
    // onRegister,
    // onFormSubmit,
    // onSubscribeClick,
    // onLoginClick,
    // onDiscoveryLinkClick,
    // onCustomButtonClick,
    // onDataPolicyClick,
    // onAlternativeClick,
    // onError,
    // onAnswer,
    // onDismissBottomSheet,
    // style,
    ...rest
  }: PaywallViewProps) => {
    const paywallRef = useRef<View>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isPaywallCreated, setIsPaywallCreated] = useState(false);
    const [paywallHeight, setPaywallHeight] = useState(0);

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const initializeSDK = async () => {
            try {
                await RNAccess.deleteCookies();
    
                if (config) {
                    await RNAccess.setDebug(config.debug || false);
                }
                await RNAccess.initialize(appId)
    
                await RNAccess.config(config, false)
                await RNAccess.styles(styles, false)
                await RNAccess.texts(texts, false)
                await RNAccess.variables(variables)
                
                await setupEvents();
    
                // Waiting a tiny bit for the view to show on screen.
                await sleep(200);
    
                setIsInitialized(true);
    
            } catch (error) {
                console.log('Failed to initialize Access SDK:', error);
            }
        };
    
        const setupEvents = async () => {
            try {
    
                await RNAccess.onLock(() => {
                    onLock?.();
                });
                await RNAccess.onReady(() => {
                    onReady?.();
                });
                await RNAccess.onRelease((e: any) => {
                    console.log(e);
                    onRelease?.(e);
                });
    
                // [...]
    
            } catch (error) {
                console.log('Failed to initialize Access SDK:', error);
            }
        };

        if (!isInitialized) {
            initializeSDK();
        }
    });
    

    useEffect(() => {
        const createPaywallView = async () => {
            try {
                if (displayMode === 'bottom-sheet') {
                    await RNAccess.createPaywallBottomSheet(pageType);
                } else {
                    const nodeHandle = findNodeHandle(paywallRef.current);
                
                    if (nodeHandle === null) {
                        throw new Error('Failed to get node handle for view');
                    }
    
                    await RNAccess.createRNPaywall(
                        pageType,
                        nodeHandle,
                        100,
                        (height: number) => {
                            console.log('Paywall height: ' + height);
                            setPaywallHeight(height);
                        }
                    );
                }
                
                setIsPaywallCreated(true);
    
                console.log('Paywall created successfully');
            } catch (error) {
                console.error('Failed to create paywall:', error);
            }
        };
    

        if (!isInitialized || !pageType || !paywallRef.current || isPaywallCreated) {
            return;
        }
        createPaywallView();

    }, [pageType, isInitialized, paywallRef, isPaywallCreated, displayMode]);

    if (!pageType) {
        return null;
    }

    return (
        <View
            ref={paywallRef}
            { ...rest }
            style={{
                zIndex: 99,
                width: '100%',
                minHeight: paywallHeight
            }}
        />
    );    
}

export default PaywallView;