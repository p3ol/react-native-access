
//
//  RNAccess.swift
//  ReactNativeAccess
//
//  Created by Morgan Berger on 10/02/2025.
//

import AccessIOS
import UIKit
import React

@objc(RNAccess)
class RNAccess: NSObject, RCTBridgeModule {

    @objc var bridge: RCTBridge!
    private var access: Access?

    static func moduleName() -> String! {
        return "RNAccess"
    }
  
    @objc func setDebug(_ debug: Bool) {
        print("SETTING DEBUG: \(debug)")
        Access.setDebug(debug)
    }
    
    @objc func config(_ config: [String : Any], readOnly: Bool = false) {
        self.access?.config(config, readOnly)
    }
    
    @objc func initialize(_ key: String) {
        print("access init: " + key)
        access = Access(key: key)
    }

    @objc func styles(_ styles: NSDictionary, readOnly: Bool = false) {
        let swiftStyles = styles as? [String: Any] ?? [:]
        self.access?.styles(swiftStyles, readOnly)
    }

    @objc func texts(_ texts: NSDictionary, readOnly: Bool) {
        if let swiftTexts = texts as? [String: String] {
            self.access?.texts(swiftTexts, readOnly)
        }
    }

    @objc func variables(_ variables: NSDictionary) {
        if let swiftVariables = variables as? [String: Any] {
            self.access?.variables(swiftVariables)
        }
    }

    @objc func deleteCookies() {
        HTTPCookieStorage.shared.cookies?.forEach {
            HTTPCookieStorage.shared.deleteCookie($0)
        }
        UserDefaults.standard.dictionaryRepresentation().forEach { couple in
            UserDefaults.standard.removeObject(forKey: couple.key)
        }
    }

    @objc func createPaywallBottomSheet(_ pageType: String) {
        print("creating paywall bottom sheet")
        DispatchQueue.main.async {
            self.access?.createPaywall(pageType: pageType, view: nil, percent: nil)
        }
    }

    @objc func createRNPaywall(_ pageType: String,
                                viewTag: NSNumber,
                                percent: NSNumber,
                                callback: @escaping RCTResponseSenderBlock) {
        print("creating paywall RN")
        DispatchQueue.main.async {
            guard let view = self.bridge?.uiManager.view(forReactTag: viewTag) else {
                print("ERROR: view not found")
                return
            }
            self.access?.createReactNativePaywall(pageType: pageType, view: view, percent: percent.intValue) { height in
                print("height callback: \(height)")
                callback([height])
            }
        }
    }
    

    @objc func onLock(_ callback: RCTResponseSenderBlock?) {
        access?.onLock { callback?([]) }
    }
    @objc func onReady(_ callback: RCTResponseSenderBlock?) {
        access?.onReady { event in
            callback?([event?.toMap() ?? [:]])
        }
    }
    @objc func onRelease(_ callback: RCTResponseSenderBlock?) {
        access?.onRelease { event in callback?([event?.toMap() ?? [:]]) }
    }

    // @objc func onRegister(_ callback: RCTResponseSenderBlock?) {
    //     access?.onRegister { event in callback?([event?.toMap() ?? [:]]) }
    // }
    
    // @objc func onFormSubmit(_ callback: RCTResponseSenderBlock?) {
    //     access?.onFormSubmit { event in callback?([event?.toMap() ?? [:]]) }
    // }

    @objc func onPaywallSeen(_ callback: RCTResponseSenderBlock?) {
        access?.onPaywallSeen { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onSubscribeClick(_ callback: RCTResponseSenderBlock?) {
        access?.onSubscribeTapped { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onLoginClick(_ callback: RCTResponseSenderBlock?) {
        access?.onLoginTapped { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onDiscoveryLinkClick(_ callback: RCTResponseSenderBlock?) {
        access?.onDiscoveryLinkTapped { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onCustomButtonClick(_ callback: RCTResponseSenderBlock?) {
        access?.onCustomButtonTapped { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onDataPolicyClick(_ callback: RCTResponseSenderBlock?) {
        access?.onDataPolicyTapped { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onAlternativeClick(_ callback: RCTResponseSenderBlock?) {
        access?.onAlternativeTapEvent { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onError(_ callback: RCTResponseSenderBlock?) {
        access?.onError { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onAnswer(_ callback: RCTResponseSenderBlock?) {
        access?.onAnswer { event in callback?([event?.toMap() ?? [:]]) }
    }
    @objc func onDismissBottomSheet(_ callback: RCTResponseSenderBlock?) {
        access?.userDidCloseBottomSheet { callback?([]) }
    }
}
