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

    NSMutableDictionary *_formSubmitObservers;
    NSMutableDictionary *_registerObservers;

    Access * access;
  
    BOOL cleaned;
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
      
        self->cleaned = NO;
        self.contentView = _view;
        
        _formSubmitObservers = [[NSMutableDictionary alloc] init];
        _registerObservers = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (void)cleanUp
{
    [access destroy];
    access = nil;
    cleaned = YES;

    CGRect frame = self.contentView.frame;
    frame.size.height = 0.0;
    self.contentView.frame = frame;
    _view.frame = frame;

    [_view layoutSubviews];
    [self.contentView layoutSubviews];
}

- (void)prepareForRecycle
{
    [self cleanUp];
    [super prepareForRecycle];
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask
{
    [super finalizeUpdates:updateMask];
}

- (void)reinit {
    if (appId == nil || config == nil) {
        return;
    }

    if (access != nil) {
        [access destroy];
        access = nil;
    }

    cleaned = NO;
    
    [Access setDebug: [config[@"debug"] boolValue]];

    access = [[Access alloc] initWithKey:appId];
    [access config:config :false];
    [access styles:styles :false];
    [access texts:texts :false];
    [access variables:variables];

    [self initEvents];

    BOOL isBottomSheet = [displayMode isEqualToString:@"bottom-sheet"];

    UIView* target = isBottomSheet ? nil : _view;
    void (^ _Nullable didSetSize)(CGSize size);

    if (!isBottomSheet) {
        didSetSize = ^(CGSize size) {
            PaywallViewEventEmitter::OnResize event = PaywallViewEventEmitter::OnResize { static_cast<int>(size.width), static_cast<int>(size.height) };
            self.eventEmitter.onResize(event);
        };
    }
    [access createHybridPaywallWithPageType: pageType view:target percent:nil didSetSize:didSetSize];
}

- (const PaywallViewEventEmitter &)eventEmitter
{
    return static_cast<const PaywallViewEventEmitter &>(*_eventEmitter);
}

- (void)initEvents {

    [access onIdentityAvailableWithOnce:false :^(UserEvent * _Nullable event) {
        PaywallViewEventEmitter::OnIdentityAvailable rnEvent = PaywallViewEventEmitter::OnIdentityAvailable {
            [event.widget UTF8String],
            [event.actionName UTF8String],
            [event.userId UTF8String],
            [event.contextName UTF8String],
            [event.contextType UTF8String],
            [event.contextValue UTF8String],
            [event.groupSlug UTF8String],
            [event.scenarioName UTF8String]
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
    [access onError:^(ErrorEvent * _Nullable event, void (^ _Nonnull)(void)) {
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

    [access onFormSubmitWithSubmitter:^(FormEvent * _Nonnull event, void (^ _Nonnull method)(NSArray<InvalidForm *> * _Nonnull)) {
        NSString *notifName = @"formSubmitNotification";
        NSNumber *messageId = @(arc4random());

        NSString *fieldsStr = [self arrayToString:event.fields.allKeys];
        NSString *valuesStr = [self arrayToString:event.fields.allValues];
        NSString *validStr = [self arrayToString:event.valid.allValues];

        id observer = [NSNotificationCenter.defaultCenter addObserverForName:notifName
                                            object:nil
                                            queue:[NSOperationQueue mainQueue]
                                            usingBlock:^(NSNotification * _Nonnull notification) {
            [self onFormSubmitNotification:notification messageId:messageId method: method];
        }];
        [self->_formSubmitObservers setObject:observer forKey:messageId];

        PaywallViewEventEmitter::OnFormSubmit rnEvent = PaywallViewEventEmitter::OnFormSubmit {
            [fieldsStr UTF8String],
            [valuesStr UTF8String],
            [validStr UTF8String],
            [messageId doubleValue]
        };

        self.eventEmitter.onFormSubmit(rnEvent);
    }];
    [access onRegister:^(RegisterEvent * _Nonnull event, void (^ _Nonnull method)(NSString * _Nullable)) {
        NSString *notifName = @"registerNotification";
        NSNumber *messageId = @(arc4random());

        NSString *newsletterId = event.newsletterId ? event.newsletterId : @"";
        NSString *passId = event.passId ? event.passId : @"";

        id observer = [NSNotificationCenter.defaultCenter addObserverForName:notifName
                                            object:nil
                                            queue:[NSOperationQueue mainQueue]
                                            usingBlock:^(NSNotification * _Nonnull notification) {
            [self onRegisterNotification:notification messageId:messageId method: method];
        }];
        [self->_registerObservers setObject:observer forKey:messageId];

        PaywallViewEventEmitter::OnRegister rnEvent = PaywallViewEventEmitter::OnRegister {
            [event.email UTF8String],
            [newsletterId UTF8String],
            [passId UTF8String],
            [messageId doubleValue]
        };
        self.eventEmitter.onRegister(rnEvent);
    }];
}

-(void)onFormSubmitNotification:(NSNotification*)notification
                      messageId:(NSNumber*)messageId
                         method:(void (^ _Nonnull)(NSArray<InvalidForm *> * _Nonnull))method
{
    id object = notification.userInfo[@"object"];

    NSDictionary *dict = [self extractDictFromNotifObject:object];

    if (dict[@"_messageId"] == messageId) {
        NSArray *remoteArray = dict[@"data"];
        NSMutableArray *invalidForms = [[NSMutableArray alloc] init];

        for (NSDictionary *form in remoteArray) {
            NSString* key = form[@"fieldKey"];
            NSString* message = form[@"message"];

            InvalidForm *invalid = [[InvalidForm alloc] initWithFieldKey:key message: message];
            [invalidForms addObject:invalid];
        }
        method(invalidForms);

        [NSNotificationCenter.defaultCenter removeObserver:_formSubmitObservers[messageId]];
        [_formSubmitObservers removeObjectForKey:messageId];
    }
}

-(void)onRegisterNotification:(NSNotification*)notification
                    messageId:(NSNumber*)messageId
                       method:(void (^ _Nonnull)(NSString * _Nullable))method
{
    id object = notification.userInfo[@"object"];

    NSDictionary *dict = [self extractDictFromNotifObject:object];

    if (dict[@"_messageId"] == messageId) {
        NSArray *remoteArray = dict[@"data"];

        NSString* message;

        if (dict.count > 0) {
            message = remoteArray[0][@"message"];
        }

        method(message);

        [NSNotificationCenter.defaultCenter removeObserver:_registerObservers[messageId]];
        [_registerObservers removeObjectForKey:messageId];
    }
}

-(NSDictionary*)extractDictFromNotifObject:(id _Nullable)object {
    if (object == nil) { return @{}; }

    if ([object isKindOfClass:[NSString class]]) {
        NSError *error;
        NSData *dataUTF8 = [(NSString*)object dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:dataUTF8 options:0 error:&error];

        if (!error) { return dict; }
    }
    return @{};
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<PaywallViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<PaywallViewProps const>(props);
    
    if (oldViewProps.appId == newViewProps.appId &&
        oldViewProps.pageType == newViewProps.pageType &&
        oldViewProps.displayMode == newViewProps.displayMode &&
        oldViewProps.config == newViewProps.config &&
        oldViewProps.styles == newViewProps.styles &&
        oldViewProps.texts == newViewProps.texts &&
        oldViewProps.released == newViewProps.released &&
        oldViewProps.variables == newViewProps.variables && !cleaned) {
        [super updateProps:props oldProps:oldProps];
        return;
    }
      
    if (newViewProps.released) {
        [super updateProps:props oldProps:oldProps];
        return;
    }

    appId = [[NSString alloc] initWithUTF8String: newViewProps.appId.c_str()];

    pageType = [[NSString alloc] initWithUTF8String: newViewProps.pageType.c_str()];
    displayMode = [[NSString alloc] initWithUTF8String: newViewProps.displayMode.c_str()];

    config = [self cppStringToDict:newViewProps.config.c_str()];
    styles = [self cppStringToDict:newViewProps.styles.c_str()];
    texts = [self cppStringToDict:newViewProps.texts.c_str()];
    variables = [self cppStringToDict:newViewProps.variables.c_str()];

    [self reinit];
    [super updateProps:props oldProps:oldProps];
}

-(NSDictionary*)cppStringToDict:(const char*)charStr
{
    NSString *str = [[NSString alloc] initWithUTF8String: charStr];
    NSData *dataUTF8 = [str dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error;
    NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:dataUTF8 options:0 error:&error];

    return dict;
}

-(NSString*)arrayToString:(NSArray*)array {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:array
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
