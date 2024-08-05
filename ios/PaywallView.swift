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
    @objc var onRelease: RCTDirectEventBlock?

    func reinit () {
        if (
            appId == nil || pageType == nil || config == nil || styles == nil ||
            texts == nil || variables == nil
        ) {
            return
        }

        if (access != nil) {
            access.destroy()
            access = nil
        }

        Access.setDebug(config?["debug"] as? Bool ?? false)
        access = Access(key: appId!)
        access.config(config!)
        access.styles(styles!)
        access.texts(texts!)
        access.variables(variables!)

        var subView: UIView? = access.createPaywall(pageType: pageType!)
        subView?.frame = self.frame

        if (subView != nil) {
            self.addSubview(subView!)
        }
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

    @objc var events: [String: RCTDirectEventBlock]? = nil {
        didSet {
            reinit()
        }
    }
}
