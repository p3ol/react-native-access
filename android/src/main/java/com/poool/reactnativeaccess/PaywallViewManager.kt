package com.poool.reactnativeaccess

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTModernEventEmitter

class PaywallViewManager(
  private val reactContext: ReactApplicationContext
): SimpleViewManager<PaywallView>() {
  private var themedContextRef: ThemedReactContext? = null
  private var module: ReactNativeAccessModule? = null

  override fun getName() = "PaywallView"

  override fun createViewInstance(ctx: ThemedReactContext): PaywallView {
    val view = PaywallView(ctx)

    module = ctx.getNativeModule(ReactNativeAccessModule::class.java)
    themedContextRef = ctx

    return view
  }

  @ReactProp(name = "appId")
  fun setAppId(view: PaywallView, appId: String) {
    view.setAppId(appId)
  }

  @ReactProp(name = "pageType")
  fun setPageType(view: PaywallView, pageType: String) {
    view.setPageType(pageType)
  }

  @ReactProp(name = "config")
  fun setConfig(view: PaywallView, config: ReadableMap) {
    view.setConfig(config)
  }

  @ReactProp(name = "styles")
  fun setStyles(view: PaywallView, styles: ReadableMap) {
    view.setStyles(styles)
  }

  @ReactProp(name = "variables")
  fun setVariables(view: PaywallView, variables: ReadableMap) {
    view.setVariables(variables)
  }

  @ReactProp(name = "texts")
  fun setTexts(view: PaywallView, texts: ReadableMap) {
    view.setTexts(texts)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    val events = listOf(
      "onLock", "onRelease", "onPaywallSeen", "onReady", "onRegister", "onSubscribeClick",
      "onAlternativeClick", "onAnswer", "onCustomButtonClick", "onDataPolicyClick",
      "onDiscoveryLinkClick", "onError", "onFormSubmit", "onLoginClick"
    )

    return events.associateWith {
      mapOf("phasedRegistrationNames" to mapOf("bubbled" to it))
    }
  }
}
