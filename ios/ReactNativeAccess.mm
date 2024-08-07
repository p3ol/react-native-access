#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(ReactNativeAccess, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
