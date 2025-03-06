#import "PaywallView.h"

#import "generated/RNAccessViewSpec/ComponentDescriptors.h"
#import "generated/RNAccessViewSpec/EventEmitters.h"
#import "generated/RNAccessViewSpec/Props.h"
#import "generated/RNAccessViewSpec/RCTComponentViewHelpers.h"

#import "RCTView.h"

#import "RCTFabricComponentsPlugins.h"

#import <AccessIOS/AccessIOS-Swift.h>

using namespace facebook::react;

@interface PaywallView () <RCTPaywallViewViewProtocol>

@end

@implementation PaywallView {
    UIView * _view;
    NSString * appId;
    NSString * pageType;
    NSString * displayMode;
    NSDictionary * config;
    NSDictionary * styles;
    NSDictionary * texts;
    NSDictionary * variables;
    
    Access * access;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<PaywallViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const PaywallViewProps>();
        _props = defaultProps;

        _view = [[UIView alloc] init];

        self.contentView = _view;
    }
    return self;
}

- (void)reinit {
    NSLog(@"reinit");
    
    if (appId == nil || config == nil) {
        return;
    }

    if (access != nil) {
        [access destroy];
        access = nil;
    }
    
    BOOL debug = [config[@"debug"] boolValue];
    
    [Access setDebug: [config[@"debug"] boolValue]];
    
    access = [[Access alloc] initWithKey:appId];
    [access config:config :false];
    [access styles:styles :false];
    [access texts:texts :false];
    [access variables:variables];

    [self initEvents];

    if ([displayMode isEqualToString:@"bottom-sheet"]) {
        [access createPaywallWithPageType:pageType view:nil percent: nil];
    } else {
        [access createReactNativePaywallWithPageType:pageType view:self percent:@100 didSetSize:^(CGSize size) {
            PaywallViewEventEmitter::OnResize event = PaywallViewEventEmitter::OnResize { static_cast<int>(size.width), static_cast<int>(size.height) };
            self.eventEmitter.onResize(event);
        }];
    }
}

// Event emitter convenience method
- (const PaywallViewEventEmitter &)eventEmitter
{
    return static_cast<const PaywallViewEventEmitter &>(*_eventEmitter);
}

- (void)initEvents {
    
    
    
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &newViewProps = *std::static_pointer_cast<PaywallViewProps const>(props);

    appId = [[NSString alloc] initWithUTF8String: newViewProps.appId.c_str()];
    pageType = [[NSString alloc] initWithUTF8String: newViewProps.pageType.c_str()];

    displayMode = [[NSString alloc] initWithUTF8String: newViewProps.displayMode.c_str()];
    
    config = [self stringToDict:newViewProps.config.c_str()];
    styles = [self stringToDict:newViewProps.styles.c_str()];
    texts = [self stringToDict:newViewProps.texts.c_str()];
    variables = [self stringToDict:newViewProps.variables.c_str()];
    
    [self reinit];
    [super updateProps:props oldProps:oldProps];
}

-(NSDictionary*)stringToDict:(const char*)charStr
{
    NSString *str = [[NSString alloc] initWithUTF8String: charStr];
    NSData *dataUTF8 = [str dataUsingEncoding:NSUTF8StringEncoding];
        
    NSError *error;
    NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:dataUTF8 options:0 error:&error];
    
    return dict;
}

Class<RCTComponentViewProtocol> PaywallViewCls(void)
{
  return PaywallView.class;
}

@end
