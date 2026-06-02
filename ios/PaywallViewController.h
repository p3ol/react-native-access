#import <UIKit/UIKit.h>
#import <AccessIOS/AccessIOS-Swift.h>


@protocol PaywallViewControllerDelegate <NSObject>

- (void)paywallWillAppear;
- (void)paywallWillDisappear;

@end

@interface PaywallViewController : UIViewController

@property (nonatomic, weak) id<PaywallViewControllerDelegate> delegate;

@end
