package tech.poool.rnaccess

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PaywallViewManagerInterface
import com.facebook.react.viewmanagers.PaywallViewManagerDelegate

@ReactModule(name = PaywallViewManager.NAME)
class PaywallViewManager : SimpleViewManager<PaywallView>(),
  PaywallViewManagerInterface<PaywallView> {
  private val mDelegate: ViewManagerDelegate<PaywallView> = PaywallViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<PaywallView> {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): PaywallView {
    return PaywallView(context)
  }

  override fun setAppId(view: PaywallView?, appId: String?) {
    view?.setAppId(appId ?: "")
  }

  override fun setPageType(view: PaywallView?, pageType: String?) {
    view?.setPageType(pageType ?: "")
  }

  override fun setDisplayMode(view: PaywallView?, value: String?) {
    view?.setDisplayMode(value ?: "")
  }

  override fun setConfig(view: PaywallView?, value: ReadableMap?) {
    view?.setConfig(value)
  }

  override fun setStyles(view: PaywallView?, value: ReadableMap?) {
    view?.setStyles(value)
  }

  override fun setVariables(view: PaywallView?, value: ReadableMap?) {
    view?.setVariables(value)
  }

  override fun setTexts(view: PaywallView?, value: ReadableMap?) {
    view?.setTexts(value)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    val events = listOf(
      "onLock", "onRelease", "onPaywallSeen", "onReady", "onRegister", "onSubscribeClick",
      "onAlternativeClick", "onAnswer", "onCustomButtonClick", "onDataPolicyClick",
      "onDiscoveryLinkClick", "onError", "onFormSubmit", "onLoginClick", "onDismissBottomSheet",
      "onResize"
    )

    return events.associateWith {
      mapOf("phasedRegistrationNames" to mapOf("bubbled" to it))
    }
  }

  companion object {
    const val NAME = "PaywallView"
  }
}
