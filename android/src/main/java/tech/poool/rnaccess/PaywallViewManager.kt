package tech.poool.rnaccess

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PaywallViewManagerInterface
import com.facebook.react.viewmanagers.PaywallViewManagerDelegate
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

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
    val module = context.getNativeModule(NativePaywallModule::class.java)
    return PaywallView(context, module)
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

  override fun setConfig(view: PaywallView?, value: String?) {
    val config: Map<String, Any>? = value?.let { Gson().fromJson(value, ConfigType) }
    view?.setConfig(config ?: mapOf())
  }

  override fun setStyles(view: PaywallView?, value: String?) {
    val styles: Map<String, Any>? = value?.let { Gson().fromJson(value, ConfigType) }
    view?.setStyles(styles ?: mapOf())
  }

  override fun setVariables(view: PaywallView?, value: String?) {
    val variables: Map<String, Any>? = value?.let { Gson().fromJson(value, ConfigType) }
    view?.setVariables(variables ?: mapOf())
  }

  override fun setTexts(view: PaywallView?, value: String?) {
    val texts: Map<String, String>? = value?.let { Gson().fromJson(value, TextsType) }
    view?.setTexts(texts ?: mapOf())
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

    val ConfigType = object: TypeToken<Map<String, Any>>(){}.type
    val TextsType = object: TypeToken<Map<String, String>>(){}.type
  }
}
