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

    Access.onLock {
      if self.hasListeners == false {
        return
      }

      self.sendEvent(withName: "lock", body: nil)
    }

    Access.onIdentityAvailable { identityEvent in
      if self.hasListeners == false {
        return
      }

      self.sendEvent(withName: "identityAvailable", body: [
        "identityEvent": [
          "userId": identityEvent?.userId,
          "contextName": identityEvent?.contextName,
          "contextType": identityEvent?.contextType,
          "contextValue": identityEvent?.contextValue,
          "groupSlug": identityEvent?.groupSlug,
          "scenarioName": identityEvent?.scenarioName,
          "widget": identityEvent?.widget,
          "actionName": identityEvent?.actionName,
          // "trigger": identityEvent?.trigger,
          // "triggerType": identityEvent?.triggerType,
          // "triggerValue": identityEvent?.triggerValue,
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
    return ["ready", "lock", "identityAvailable"]
  }

  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
