#import "PaywallView.h"

#import "generated/RNAccessViewSpec/ComponentDescriptors.h"
#import "generated/RNAccessViewSpec/EventEmitters.h"
#import "generated/RNAccessViewSpec/Props.h"
#import "generated/RNAccessViewSpec/RCTComponentViewHelpers.h"

#import "RCTFabricComponentsPlugins.h"

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

  RCTDirectEventBlock * onDismissBottomSheet;

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

  [Access setDebug:[config[@"debug"] boolValue]];
  access = [[Access alloc] initWithKey:appId];
  [access config:config];
  [access styles:styles];
  [access texts:texts];
  [access variables:variables];

  [self initEvents];

  if ([displayMode isEqualToString:@"bottom-sheet"]) {
    [access createPaywallWithPageType:self.pageType percent:0 completion:^(NSDictionary * _Nonnull result) {
      if (onDismissBottomSheet) {
        onDismissBottomSheet(@{});
      }
    }];
  } else {
    UIView *subView = [access createPaywallWithPageType:pageType];
    subView.frame = self.frame;

    if (subView != nil) {
      [self addSubview:subView];
    }
  }
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

    if (oldViewProps.appId != newViewProps.appId) {
      appId = [[NSString alloc] initWithUTF8String: newViewProps.appId.c_str()];
      [self reinit];
    }

    if (oldViewProps.pageType != newViewProps.pageType) {
      pageType = [[NSString alloc] initWithUTF8String: newViewProps.pageType.c_str()];
      [self reinit];
    }

    if (oldViewProps.displayMode != newViewProps.displayMode) {
      displayMode = [[NSString alloc] initWithUTF8String: newViewProps.displayMode.c_str()];
      [self reinit];
    }


    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> PaywallViewCls(void)
{
  return PaywallView.class;
}

@end
