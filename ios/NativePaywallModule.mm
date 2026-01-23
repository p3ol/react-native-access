#import "NativePaywallModule.h"
#include <Foundation/Foundation.h>

@interface NativePaywallModule ()
@end

@implementation NativePaywallModule
    RCT_EXPORT_MODULE(PaywallModule);

- (void)emit:(NSString *)event
        data:(NSString *)data {
    
    NSString *extractedEventName = @"";
    NSRange eventPrefixRange = [event rangeOfString:@"event."];
    NSRange resolveSuffixRange = [event rangeOfString:@":resolve" options:NSBackwardsSearch];
    
    if (eventPrefixRange.location != NSNotFound && resolveSuffixRange.location != NSNotFound &&
        eventPrefixRange.location + eventPrefixRange.length < resolveSuffixRange.location) {
        
        NSRange nameRange = NSMakeRange(eventPrefixRange.location + eventPrefixRange.length,
                                        resolveSuffixRange.location - (eventPrefixRange.location + eventPrefixRange.length));
        extractedEventName = [event substringWithRange:nameRange];
    }
    
    NSString *notifName = [[NSString alloc] initWithFormat:@"%@Notification", extractedEventName];
    
    NSLog(@"Firing %@", notifName);
    
    [NSNotificationCenter.defaultCenter postNotificationName:notifName
                                        object:self
                                        userInfo:@{@"object": data}];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params { 
    return std::make_shared<facebook::react::NativePaywallModuleSpecJSI>(params);
}

@end
