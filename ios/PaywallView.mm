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
    
    [access onIdentityAvailableWithOnce:false :^(UserEvent * _Nullable event) {
        PaywallViewEventEmitter::OnIdentityAvailable rnEvent = PaywallViewEventEmitter::OnIdentityAvailable {
            [event.userId UTF8String],
            [event.contextName UTF8String],
            [event.contextType UTF8String],
            [event.contextValue UTF8String],
            [event.groupSlug UTF8String],
            [event.scenarioName UTF8String],
            [event.widget UTF8String],
            [event.actionName UTF8String]
        };
        self.eventEmitter.onIdentityAvailable(rnEvent);
    }];
    
    [access onReadyWithOnce:false :^(WidgetEvent * _Nullable event) {
        PaywallViewEventEmitter::OnReady rnEvent = PaywallViewEventEmitter::OnReady {
            [event.widget UTF8String],
            [event.actionName UTF8String]
        };
        self.eventEmitter.onReady(rnEvent);
    }];
    [access onReleaseWithOnce:false :^(WidgetEvent * _Nullable event) {
        PaywallViewEventEmitter::OnRelease rnEvent = PaywallViewEventEmitter::OnRelease {
            [event.widget UTF8String],
            [event.actionName UTF8String]
        };
        self.eventEmitter.onRelease(rnEvent);
    }];
    [access onPaywallSeenWithOnce:false :^(WidgetEvent * _Nullable event) {
        PaywallViewEventEmitter::OnPaywallSeen rnEvent = PaywallViewEventEmitter::OnPaywallSeen {
            [event.widget UTF8String],
            [event.actionName UTF8String]
        };
        self.eventEmitter.onPaywallSeen(rnEvent);
    }];
    
    [access onSubscribeTappedWithOnce:false :^(ClickEvent * _Nullable event) {
        PaywallViewEventEmitter::OnSubscribeClick rnEvent = PaywallViewEventEmitter::OnSubscribeClick {
            [event.widget UTF8String],
            [event.actionName UTF8String],
            [event.button UTF8String],
            [event.url UTF8String],
        };
        self.eventEmitter.onSubscribeClick(rnEvent);
    }];
    
    [access onLoginTappedWithOnce:false :^(ClickEvent * _Nullable event) {
        PaywallViewEventEmitter::OnLoginClick rnEvent = PaywallViewEventEmitter::OnLoginClick {
            [event.widget UTF8String],
            [event.actionName UTF8String],
            [event.button UTF8String],
            [event.url UTF8String],
        };
        self.eventEmitter.onLoginClick(rnEvent);
    }];
    
    [access onDiscoveryLinkTappedWithOnce:false :^(ClickEvent * _Nullable event) {
        PaywallViewEventEmitter::OnDiscoveryLinkClick rnEvent = PaywallViewEventEmitter::OnDiscoveryLinkClick {
            [event.widget UTF8String],
            [event.actionName UTF8String],
            [event.button UTF8String],
            [event.url UTF8String],
        };
        self.eventEmitter.onDiscoveryLinkClick(rnEvent);
    }];
    
    [access onDataPolicyTappedWithOnce:false :^(ClickEvent * _Nullable event) {
        PaywallViewEventEmitter::OnDataPolicyClick rnEvent = PaywallViewEventEmitter::OnDataPolicyClick {
            [event.widget UTF8String],
            [event.actionName UTF8String],
            [event.button UTF8String],
            [event.url UTF8String],
        };
        self.eventEmitter.onDataPolicyClick(rnEvent);
    }];
    
    [access onAlternativeTapEventWithOnce:false :^(AlternativeClickEvent * _Nullable event) {
        PaywallViewEventEmitter::OnAlternativeClick rnEvent = PaywallViewEventEmitter::OnAlternativeClick {
            [event.widget UTF8String],
            [event.actionName UTF8String],
            [event.button UTF8String]
        };
        self.eventEmitter.onAlternativeClick(rnEvent);
    }];
    [access onErrorWithOnce:false :^(ErrorEvent * _Nullable event) {
        PaywallViewEventEmitter::OnError rnEvent = PaywallViewEventEmitter::OnError {
            [event.error UTF8String]
        };
        self.eventEmitter.onError(rnEvent);
    }];


    [access onAnswerWithOnce:false :^(AnswerEvent * _Nullable event) {
        PaywallViewEventEmitter::OnAnswer rnEvent = PaywallViewEventEmitter::OnAnswer {
            [event.questionId UTF8String],
            [event.answer UTF8String]
        };
        self.eventEmitter.onAnswer(rnEvent);
    }];
    [access onCustomButtonTappedWithOnce:false :^(CustomButtonClickEvent * _Nullable event) {
        PaywallViewEventEmitter::OnCustomButtonClick rnEvent = PaywallViewEventEmitter::OnCustomButtonClick {
            [event.name UTF8String],
            [event.buttonId UTF8String]
        };
        self.eventEmitter.onCustomButtonClick(rnEvent);
    }];
    
    [access userDidCloseBottomSheet:^{
        PaywallViewEventEmitter::OnDismissBottomSheet rnEvent = PaywallViewEventEmitter::OnDismissBottomSheet {};
        self.eventEmitter.onDismissBottomSheet(rnEvent);
    }];
    
    
    [access onFormSubmitWithSubmitter:^(FormEvent * _Nonnull event, void (^ _Nonnull)(NSArray<InvalidForm *> * _Nonnull)) {
        NSString *fieldsStr = [self dictToString:event.fields];
        NSString *validStr = [self dictToString:event.valid];
        
        PaywallViewEventEmitter::OnFormSubmit rnEvent = PaywallViewEventEmitter::OnFormSubmit {
            [event.name UTF8String],
            [fieldsStr UTF8String],
            [validStr UTF8String]
        };
        self.eventEmitter.onFormSubmit(rnEvent);
    }];
    [access onRegister:^(RegisterEvent * _Nonnull event, void (^ _Nonnull)(NSString * _Nullable)) {
        PaywallViewEventEmitter::OnRegister rnEvent = PaywallViewEventEmitter::OnRegister {
            [event.email UTF8String],
            [event.newsletterId UTF8String],
            [event.passId UTF8String]
        };
        self.eventEmitter.onRegister(rnEvent);
    }];
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

-(NSString*)dictToString:(NSDictionary*)dict {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict
                                            options:NSJSONWritingPrettyPrinted
                                            error:&error];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    return jsonString;
}

Class<RCTComponentViewProtocol> PaywallViewCls(void)
{
  return PaywallView.class;
}

@end
