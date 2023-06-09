import AccessIOS

@objc(ReactNativeAccess)
class ReactNativeAccess: NSObject {

  @objc(instanciate:)
  func instanciate(appId: String) -> Void {
    try? Access.instanciate(key: appId)
  }

}
