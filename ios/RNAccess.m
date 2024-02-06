#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>

// RNAccess class
@interface RCT_EXTERN_MODULE(RNAccess, RCTViewManager)

RCT_EXTERN_METHOD(instanciate:(NSString *)appId)

RCT_EXTERN_METHOD(
  createPaywall: (NSString)pageType
  reactTag: (nonnull NSNumber)reactTag
  percent: (nonnull NSNumber)percent
  resolve:(RCTPromiseResolveBlock)resolve
  reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  config: (NSDictionary *)config
  readOnly: (BOOL *)readOnly
)

RCT_EXTERN_METHOD(
  texts: (NSDictionary *)texts
  readOnly: (BOOL *)readOnly
)

RCT_EXTERN_METHOD(
  styles: (NSDictionary *)styles
  readOnly: (BOOL *)readOnly
)

RCT_EXTERN_METHOD(
  variables: (NSDictionary *)variables
)

RCT_EXTERN_METHOD(destroy)

@end
