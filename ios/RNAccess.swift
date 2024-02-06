import AccessIOS

@objc(RNAccess)
class RNAccess: RCTViewManager {
  var access: Access?

  @objc
  func instanciate(_ appId: String) -> Void {
    self.access = Access(key: appId)
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
        self.access?.createPaywall(pageType: pageType ?? "page", percent: percent?.intValue) {
          resolve(true)
        }
        return
      }

      let view = self.bridge!.uiManager.view(forReactTag: reactTag!)!

      self.access?.createPaywall(pageType: pageType ?? "page", view: view, percent: percent?.intValue) {
        resolve(true)
      }
    }
  }

  @objc
  func config(_ config: [String: Any], readOnly: Bool = false) -> Void {
    self.access?.config(config, readOnly)
  }

  @objc
  func texts(_ texts: [String: String], readOnly: Bool = false) -> Void {
    self.access?.texts(texts, readOnly)
  }

  @objc
  func styles(_ styles: [String: Any], readOnly: Bool = false) -> Void {
    self.access?.styles(styles, readOnly)
  }

  @objc
  func variables(_ variables: [String: String]) -> Void {
    self.access?.variables(variables)
  }

  @objc
  func destroy() -> Void {
    self.access?.destroy()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
