#import "PaywallView.h"

#import "generated/RNAccessViewSpec/ComponentDescriptors.h"
#import "generated/RNAccessViewSpec/EventEmitters.h"
#import "generated/RNAccessViewSpec/Props.h"
#import "generated/RNAccessViewSpec/RCTComponentViewHelpers.h"

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
  if (appId == nil || pageType == nil || config == nil || styles == nil ||
      texts == nil || variables == nil || displayMode == nil) {
    return;
  }

  if (access != nil) {
    [access destroy];
    access = nil;
  }

  [Access setDebug:[self.config[@"debug"] boolValue]];
  self.access = [[Access alloc] initWithKey:self.appId];
  [self.access config:self.config];
  [self.access styles:self.styles];
  [self.access texts:self.texts];
  [self.access variables:self.variables];

  [self initEvents];

  if ([self.displayMode isEqualToString:@"bottom-sheet"]) {
    [self.access createPaywallWithPageType:self.pageType percent:0 completion:^(NSDictionary * _Nonnull result) {
      if (self.onDismissBottomSheet) {
        self.onDismissBottomSheet(@{});
      }
    }];
  } else {
    UIView *subView = [self.access createPaywallWithPageType:self.pageType];
    subView.frame = self.frame;

    if (subView != nil) {
      [self addSubview:subView];
    }
  }
}

- (void)initEvents {
}

- (void)setAppId:(NSString *)appId {
  _appId = appId;
  [self reinit];
}

- (NSString *)getAppId {
  return _appId;
}

- (void)setPageType:(NSString *)pageType {
  _pageType = pageType;
  [self reinit];
}

- (NSString *)getPageType {
  return _pageType;
}

- (void)setDisplayMode:(NSString *)displayMode {
  _displayMode = displayMode;
  [self reinit];
}

- (NSString *)getDisplayMode {
  return _displayMode;
}

- (void)setConfig:(NSDictionary *)config {
  _config = config;
  [self reinit];
}

- (NSDictionary *)getConfig {
  return _config;
}

- (void)setStyles:(NSDictionary *)styles {
  _styles = styles;
  [self reinit];
}

- (NSDictionary *)getStyles {
  return _styles;
}

- (void)setTexts:(NSDictionary *)texts {
  _texts = texts;
  [self reinit];
}

- (NSDictionary *)getTexts {
  return _texts;
}

- (void)setVariables:(NSDictionary *)variables {
  _variables = variables;
  [self reinit];
}

- (NSDictionary *)getVariables {
  return _variables;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<PaywallViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<PaywallViewProps const>(props);

    // if (oldViewProps.color != newViewProps.color) {
    //     NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
    //     [_view setBackgroundColor:[self hexStringToColor:colorToConvert]];
    // }

    if (oldViewProps.appId != newViewProps.appId) {
      [self setAppId:newViewProps.appId];
    }

    if (oldViewProps.pageType != newViewProps.pageType) {
      [self setPageType:newViewProps.pageType];
    }

    if (oldViewProps.displayMode != newViewProps.displayMode) {
      [self setDisplayMode:newViewProps.displayMode];
    }

    if (oldViewProps.config != newViewProps.config) {
      [self setConfig:newViewProps.config];
    }

    if (oldViewProps.styles != newViewProps.styles) {
      [self setStyles:newViewProps.styles];
    }

    if (oldViewProps.texts != newViewProps.texts) {
      [self setTexts:newViewProps.texts];
    }

    if (oldViewProps.variables != newViewProps.variables) {
      [self setVariables:newViewProps.variables];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> PaywallViewCls(void)
{
  return PaywallView.class;
}

@end
