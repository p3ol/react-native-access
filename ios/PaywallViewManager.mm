#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(PaywallViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(appId, NSString)
RCT_EXPORT_VIEW_PROPERTY(pageType, NSString)
RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(styles, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(texts, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(variables, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onRelease, RCTDirectEventBlock)
@end
