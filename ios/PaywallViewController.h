#import <UIKit/UIKit.h>
#import <AccessIOS/AccessIOS-Swift.h>


@protocol PaywallViewControllerDelegate <NSObject>

- (void)paywallWillAppear;

@end

@interface PaywallViewController : UIViewController

@property (nonatomic, copy) NSString *index;
@property (nonatomic, weak) id<PaywallViewControllerDelegate> delegate;

@end
