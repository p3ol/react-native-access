package com.poool.reactnativeaccess

import android.util.Log
import android.widget.LinearLayout
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.views.view.ReactViewGroup
import com.poool.access.Access

class ReactNativeAccessModule(private val reactContext: ReactApplicationContext):
  ReactContextBaseJavaModule(reactContext) {
  private var access: Access? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun instanciate(appId: String, promise: Promise) {
    access = Access(appId)
    promise.resolve(true)
  }

  @ReactMethod
  fun createPaywall(pageType: String, reactTag: Int, percent: Int = 80, mode: String = "hide", promise: Promise) {
    Log.d("RNAccess", "mode: $mode, viewId: $reactTag, pageType: $pageType")
    reactContext.runOnUiQueueThread {
      try {
        //val rootLayout = currentActivity?.findViewById<ViewGroup>(R.id.content);
        val uiManager = UIManagerHelper.getUIManagerForReactTag(reactContext, reactTag)

        when (mode) {
          "bottom-sheet" -> {
            val container = uiManager?.resolveView(reactTag) as ReactRootView
            access?.createBottomSheetPaywall(pageType, container) {
              println("Paywall dismissed")
            }
          }
          "custom" -> {
            val container = uiManager?.resolveView(reactTag) as LinearLayout
            val subView = access?.returnPaywallView(pageType, reactContext)
            container.addView(subView)
          }
          else -> {
            val container = uiManager?.resolveView(reactTag) as ReactViewGroup
            access?.createPaywall(pageType, percent, container)
          }
        }

        promise.resolve(true)
      } catch (e: Exception) {
        Log.e("RNAccess", "Error creating paywall", e)
        promise.reject("Error creating paywall", e)
      }
    }
  }

  @ReactMethod
  fun config(config: ReadableMap, readOnly: Boolean? = null) {
    access?.config(config.toHashMap(), readOnly)
  }

  @ReactMethod
  fun texts(texts: ReadableMap, readOnly: Boolean? = null) {
    access?.texts(texts.toHashMap() as Map<String, String>, readOnly)
  }

  @ReactMethod
  fun styles(styles: ReadableMap, readOnly: Boolean? = null) {
    access?.styles(styles.toHashMap(), readOnly)
  }

  @ReactMethod
  fun variables(variables: ReadableMap) {
    access?.variables(variables.toHashMap())
  }

  @ReactMethod
  fun destroy() {
  }

  companion object {
    const val NAME = "RNAccess"
  }
}
