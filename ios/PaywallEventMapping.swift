//
//  PaywallEventMapping.swift
//  poool-react-native-access
//
//  Created by Ugo Stephant on 06/08/2024.
//

import Foundation
import AccessIOS

protocol ObjectMapping {}
extension ObjectMapping {
    func toMap() -> [String:Any] {
        var dict = [String:Any]()
        let otherSelf = Mirror(reflecting: self)
        for child in otherSelf.children {
            if let key = child.label {
                dict[key] = child.value
            }
        }
        return dict
    }
}

extension WidgetEvent: ObjectMapping {}
extension UserEvent: ObjectMapping {}
extension RegisterEvent: ObjectMapping {}
extension ClickEvent: ObjectMapping {}
extension AlternativeClickEvent: ObjectMapping {}
extension ErrorEvent: ObjectMapping {}
extension FormEvent: ObjectMapping {}
extension AnswerEvent: ObjectMapping {}
extension CustomButtonClickEvent: ObjectMapping {}
extension CustomButtonLinkEvent: ObjectMapping {}
