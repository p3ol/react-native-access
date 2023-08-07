import AccessIOS

@objc(RNAccess)
class RNAccess: NSObject {

  @objc
  func instanciate(_ appId: String) -> Void {
    try? Access.instanciate(key: appId)
  }

  @objc
  func createPaywall(_ pageType: String?) -> Void {
    DispatchQueue.main.async {
      Access.createPaywall(pageType: pageType ?? "page'")
    }
  }

  @objc
  func createPaywall(_ pageType: String?, _ view: UIView?) -> Void {
    DispatchQueue.main.async {
      Access.createPaywall(pageType: pageType ?? "page'", view: view)
    }
  }

  @objc
  func createPaywall(_ pageType: String?, _ view: UIView?, _ percent: NSNumber?) -> Void {
    DispatchQueue.main.async {
      Access.createPaywall(pageType: pageType ?? "page'", view: view, percent: percent?.intValue)
    }
  }

  @objc
  func createPaywall(_ pageType: String?, _ view: UIView?, _ percent: NSNumber?, _ complete: @escaping RCTResponseSenderBlock) -> Void {
    DispatchQueue.main.async {
      Access.createPaywall(pageType: pageType ?? "page'", view: view, percent: percent?.intValue) {
        complete([true])
      }
    }
  }

  @objc
  func config(_ config: [String: Any], _ readOnly: Bool = false) -> Void {
    Access.config(config, readOnly)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
