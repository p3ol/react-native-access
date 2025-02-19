#import <MapKit/MapKit.h> // ??

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PaywallViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(appId, NSString)
RCT_EXPORT_VIEW_PROPERTY(pageType, NSString)
RCT_EXPORT_VIEW_PROPERTY(displayMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(styles, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(texts, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(variables, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onLock, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onReady, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRelease, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPaywallSeen, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRegister, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFormSubmit, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSubscribeClick, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoginClick, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCustomButtonClick, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDataPolicyClick, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAlternativeClick, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAnswer, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDismissBottomSheet, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUpdateHeight, RCTDirectEventBlock)

@end
