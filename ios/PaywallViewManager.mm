#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface AccessViewManager : RCTViewManager
@end

@implementation AccessViewManager

RCT_EXPORT_MODULE(AccessView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
