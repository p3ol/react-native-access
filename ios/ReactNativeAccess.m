#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactNativeAccess, NSObject)

RCT_EXTERN_METHOD(instanciate:(NSString *)appId)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
