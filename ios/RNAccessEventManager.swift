import AccessIOS

@objc(RNAccessEventManager)
class RNAccessEventManager: RCTEventEmitter {
  var hasListeners = true

  override init () {
    super.init()

    Access.onReady { widgetEvent in
      if self.hasListeners == false {
        return
      }

      self.sendEvent(withName: "ready", body: [
        "widgetEvent": [
          "widget": widgetEvent?.widget,
          "actionName": widgetEvent?.actionName,
        ]
      ])
    }
  }

  @objc
  override func startObserving() {
    self.hasListeners = true
  }

  @objc
  override func stopObserving() {
    self.hasListeners = false
  }

  @objc
  override func supportedEvents() -> [String]! {
    return ["ready"]
  }

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
