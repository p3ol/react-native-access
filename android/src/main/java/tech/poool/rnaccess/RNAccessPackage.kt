package tech.poool.rnaccess

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class RNAccessPackage : BaseReactPackage() {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(PaywallViewManager())
  }

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == NativePaywallModule.NAME) {
      NativePaywallModule(reactContext)
    } else {
      null
    }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      NativePaywallModule.NAME to ReactModuleInfo(
        name = NativePaywallModule.NAME,
        className = NativePaywallModule.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      )
    )
  }
}
