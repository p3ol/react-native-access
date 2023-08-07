import AccessIOS

@objc(RNAccess)
class RNAccess: RCTViewManager {

  @objc
  func instanciate(_ appId: String) -> Void {
    try? Access.instanciate(key: appId)
  }

  @objc
  func createPaywall(
    _ pageType: String?,
    reactTag: NSNumber?,
    percent: NSNumber?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    DispatchQueue.main.async {
      // No view found, creating bottom sheet paywall
      if reactTag == -1 {
        Access.createPaywall(pageType: pageType ?? "page", percent: percent?.intValue) {
          print("createPaywall")
          resolve(true)
        }
        return
      }

      let view = self.bridge!.uiManager.view(forReactTag: reactTag!)!

      do {
        try Access.createPaywall(pageType: pageType ?? "page", view: view, percent: percent?.intValue) {
          print("createPaywall")
          resolve(true)
        }
      } catch {
        print("createPaywall error")
        reject("createPaywall error", error.localizedDescription, error)
      }
    }
  }

  @objc
  func config(_ config: [String: Any], readOnly: Bool = false) -> Void {
    Access.config(config, readOnly)
  }

  @objc
  func texts(_ texts: [String: String], readOnly: Bool = false) -> Void {
    Access.texts(texts, readOnly)
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
