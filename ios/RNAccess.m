#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

// RNAccess class
@interface RCT_EXTERN_MODULE(RNAccess, NSObject)

RCT_EXTERN_METHOD(instanciate:(NSString *)appId)

RCT_EXTERN_METHOD(
  createPaywall: (NSString *)pageType
  (UIView *)view
  (NSNumber *)percent
  (RCTResponseSenderBlock *)complete
)

@end

// RNAccessContent UI component
@interface RNAccessViewManager : RCTViewManager
@end

@implementation RNAccessViewManager

RCT_EXPORT_MODULE(RNAccessContent)

- (UIView *)view
{
  return [[UIView alloc] init];
}

@end
