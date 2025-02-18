//
//  RNAccess.mm
//  ReactNativeAccess
//
//  Created by Morgan Berger on 10/02/2025.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RNAccess, NSObject)

RCT_EXTERN_METHOD(initialize: (NSString *)key)

RCT_EXTERN_METHOD(setDebug: (BOOL)debug)
RCT_EXTERN_METHOD(config:(NSDictionary *)config readOnly: (BOOL)readOnly)

RCT_EXTERN_METHOD(styles: (NSDictionary *)styles readOnly: (BOOL)readOnly)
RCT_EXTERN_METHOD(texts:(NSDictionary *)texts readOnly: (BOOL)readOnly)
RCT_EXTERN_METHOD(variables: (NSDictionary *)variables)

RCT_EXTERN_METHOD(createPaywallBottomSheet:(NSString *)pageType)

RCT_EXTERN_METHOD(createRNPaywall:(NSString *)pageType
                  viewTag: (nonnull NSNumber *)viewTag
                  percent: (nonnull NSNumber *)percent
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(deleteCookies)

RCT_EXTERN_METHOD(onLock:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onReady:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onRelease:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onPaywallSeen:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onRegister:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onFormSubmit:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onSubscribeClick:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onLoginClick:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onDiscoveryLinkClick:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onCustomButtonClick:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onDataPolicyClick:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onAlternativeClick:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onError:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onAnswer:(RCTResponseSenderBlock?)callback)
RCT_EXTERN_METHOD(onDismissBottomSheet:(RCTResponseSenderBlock?)callback)

@end
