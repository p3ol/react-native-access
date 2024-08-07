import Foundation

@objc(PaywallViewManager)
class PaywallViewManager: RCTViewManager {
    override func view() -> UIView! {
        return PaywallView()
    }
}
