//
//  PaywallView.swift
//  poool-react-native-access
//
//  Created by Ugo Stephant on 05/08/2024.
//

import UIKit
import AccessIOS

class PaywallView: UIView {
    private var access: Access!

    @objc var onLock: RCTDirectEventBlock?
    @objc var onReady: RCTDirectEventBlock?
    @objc var onRelease: RCTDirectEventBlock?
    @objc var onPaywallSeen: RCTDirectEventBlock?
    @objc var onRegister: RCTDirectEventBlock?
    @objc var onFormSubmit: RCTDirectEventBlock?
    @objc var onSubscribeClick: RCTDirectEventBlock?
    @objc var onLoginClick: RCTDirectEventBlock?
    @objc var onDiscoveryLinkClick: RCTDirectEventBlock?
    @objc var onCustomButtonClick: RCTDirectEventBlock?
    @objc var onDataPolicyClick: RCTDirectEventBlock?
    @objc var onAlternativeClick: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    @objc var onAnswer: RCTDirectEventBlock?
    @objc var onDismissBottomSheet: RCTDirectEventBlock?

    func reinit () {
        guard let appId = appId,
              let pageType = pageType,
              let config = config,
              let styles = styles,
              let texts = texts,
              let variables = variables,
              let displayMode = displayMode else { return }

        if (access != nil) {
            access.destroy()
            access = nil
        }

        Access.setDebug(config["debug"] as? Bool ?? false)
        access = Access(key: appId)
        access.config(config)
        access.styles(styles)
        access.texts(texts)
        access.variables(variables)

        initEvents()

        switch displayMode {
            case "bottom-sheet":
            access.createPaywall(pageType: pageType, view: nil)
            default:
                let subView: UIView? = access.createPaywall(pageType: pageType)
                subView?.frame = self.frame
                
                if (subView != nil) {
                    self.addSubview(subView!)
                }
        }
    }

    private func initEvents () {
        access.onLock { self.onLock?([:]) }
        access.onReady { readyEvent in self.onReady?(readyEvent?.toMap()) }
        access.onRelease { releaseEvent in self.onRelease?(releaseEvent?.toMap()) }
        access.onPaywallSeen { seenEvent in self.onPaywallSeen?(seenEvent?.toMap()) }
        
        access.onRegister { (registerEvent, result) in
            self.onRegister?(registerEvent.toMap())
            result(nil)
        }
        access.onFormSubmit { (submitEvent, result) in
            self.onFormSubmit?(submitEvent.toMap())
            result([])
        }
        access.onSubscribeTapped { tapEvent in self.onSubscribeClick?(tapEvent?.toMap()) }
        access.onLoginTapped { tapEvent in self.onLoginClick?(tapEvent?.toMap()) }
        access.onDiscoveryLinkTapped { tapEvent in self.onDiscoveryLinkClick?(tapEvent?.toMap()) }
        access.onCustomButtonTapped { tapEvent in self.onCustomButtonClick?(tapEvent?.toMap()) }
        access.onDataPolicyTapped { tapEvent in self.onDataPolicyClick?(tapEvent?.toMap()) }
        access.onAlternativeTapEvent { tapEvent in self.onAlternativeClick?(tapEvent?.toMap()) }
        access.onError { error in self.onError?(error?.toMap()) }
        access.onAnswer { answerEvent in self.onAnswer?(answerEvent?.toMap()) }
        
        access.userDidCloseBottomSheet { self.onDismissBottomSheet?([:]) }
        
    }

    @objc var appId: String? = nil {
        didSet {
            reinit()
        }
    }

    @objc var pageType: String? = nil {
        didSet {
            reinit()
        }
    }
    
    @objc var displayMode: String? = nil {
        didSet {
            reinit()
        }
    }

    @objc var config: [String: Any]? = nil {
        didSet {
            reinit()
        }
    }

    @objc var styles: [String: Any]? = nil {
        didSet {
            reinit()
        }
    }

    @objc var texts: [String: String]? = nil {
        didSet {
            reinit()
        }
    }

    @objc var variables: [String: Any]? = nil {
        didSet {
            reinit()
        }
    }
}
