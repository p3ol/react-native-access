package com.poool.reactnativeaccess

import android.util.Log
import android.view.ViewGroup
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.uimanager.UIManagerHelper
import com.poool.access.Access

class ReactNativeAccessModule(private val reactContext: ReactApplicationContext) :
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
  fun createPaywall(pageType: String, reactTag: Int, percent: Int = 80, promise: Promise) {
    reactContext.runOnUiQueueThread {
      try {
        val uiManager = UIManagerHelper.getUIManagerForReactTag(reactContext, reactTag)
        val view = uiManager?.resolveView(reactTag)
        access?.createPaywall(pageType, percent, view as ViewGroup)
      } catch (e: Exception) {
        Log.e("RNAccess", "Error creating paywall", e)
        val rootView = currentActivity?.findViewById<ViewGroup>(android.R.id.content)
        access?.createBottomSheetPaywall(pageType, rootView!!)
      }

      promise.resolve(true)
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
