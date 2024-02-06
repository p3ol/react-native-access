package com.poool.reactnativeaccess

import android.util.Log
import android.view.ViewGroup
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.uimanager.UIManagerHelper
import com.poool.access.Access

class ReactNativeAccessModule(reactContext: ReactApplicationContext) :
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
    UiThreadUtil.runOnUiThread {
      try {
        if (reactTag != -1) {
          val view = reactApplicationContext?.currentActivity?.findViewById<ViewGroup>(reactTag)
          access?.createPaywall(pageType, percent, view!!)
        } else {
          val rootView = currentActivity?.window?.decorView?.findViewById<ViewGroup>(android.R.id.content)
          access?.createBottomSheetPaywall(pageType, rootView!!)
        }

        promise.resolve(true)
      } catch (e: Exception) {
        Log.e("RNAccess", "Error creating paywall", e)
        promise.reject(e)
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
