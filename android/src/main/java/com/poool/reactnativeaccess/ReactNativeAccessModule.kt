package com.poool.reactnativeaccess

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import com.poool.access.Access

@ReactModule(name = ReactNativeAccessModule.NAME)
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
  fun destroy (promise: Promise) {
    access?.destroy()
    promise.resolve(true)
  }

  companion object {
    const val NAME = "ReactNativeAccess"
  }
}
