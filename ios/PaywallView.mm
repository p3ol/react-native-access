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
    
    BOOL debug = config[@"debug"];
    
    NSLog(@"config: %@", config);
    NSLog(@"debug: %@", debug);
    
    [Access setDebug:[config[@"debug"] boolValue]];
    
    access = [[Access alloc] initWithKey:appId];
    [access config:config :false];
//    [access styles:styles :false];
//    [access texts:texts :false];
//    [access variables:variables];

    [self initEvents];

    if ([displayMode isEqualToString:@"bottom-sheet"]) {
        [access createPaywallWithPageType:pageType view:nil percent: nil];
    } else {
        [access createReactNativePaywallWithPageType:pageType view:self percent:@100 didSetHeight:^(CGFloat height) {
            PaywallViewEventEmitter::OnResize event = PaywallViewEventEmitter::OnResize { 0, static_cast<int>(height) };
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
    const auto &oldViewProps = *std::static_pointer_cast<PaywallViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<PaywallViewProps const>(props);

    // if (oldViewProps.color != newViewProps.color) {
    //     NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
    //     [_view setBackgroundColor:[self hexStringToColor:colorToConvert]];
    // }

    appId = [[NSString alloc] initWithUTF8String: newViewProps.appId.c_str()];
    pageType = [[NSString alloc] initWithUTF8String: newViewProps.pageType.c_str()];

    displayMode = [[NSString alloc] initWithUTF8String: newViewProps.displayMode.c_str()];
    
    NSData *objData = [NSData dataWithBytes:&newViewProps.config length:sizeof(newViewProps.config)];
    
    NSString *objStr = [[NSString alloc] initWithData:objData encoding: NSISOLatin1StringEncoding];

    NSData *dataUTF8 = [objStr dataUsingEncoding:NSUTF8StringEncoding];
    
    NSLog(@"objStr: %@", objStr);
    
    NSError *error;
    NSDictionary *configYo = [NSJSONSerialization JSONObjectWithData:dataUTF8 options:0 error:&error];
    
    NSLog(@"%@", error);
    
    config = configYo;

    
    [self reinit];


    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> PaywallViewCls(void)
{
  return PaywallView.class;
}

@end
