#import "NativePaywallModule.h"
#include <Foundation/Foundation.h>

@interface NativePaywallModule ()
@end

@implementation NativePaywallModule
    RCT_EXPORT_MODULE(PaywallModule);

- (void)emit:(NSString *)event
        data:(NSString *)data {
    
    NSString *notifName = @"registerNotification";
    
    if ([event containsString:@"onFormSubmit"]) {
        notifName = @"formSubmitNotification";
    }
    
    [NSNotificationCenter.defaultCenter postNotificationName:notifName
                                        object:self
                                        userInfo:@{@"object": data}];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params { 
    return std::make_shared<facebook::react::NativePaywallModuleSpecJSI>(params);
}

@end
