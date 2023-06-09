import AccessIOS

@objc(ReactNativeAccess)
class ReactNativeAccess: NSObject {

  @objc(instanciate:)
  func instanciate(appId: String) -> Void {
    try? Access.instanciate(key: appId)
  }

  @objc
  func createPaywall() -> Void {
    DispatchQueue.main.async {
      Access.createPaywall(pageType: "free") {
        print("complete")
      }
    }
  }

}
